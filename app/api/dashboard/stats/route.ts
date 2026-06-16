import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getInvestmentStats, mapInvestment, mapWithdrawal, type InvestmentRow, type WithdrawalRow } from '@/lib/db';

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const [{ data: investmentRows }, { data: withdrawalRows }, { data: profile }] = await Promise.all([
    supabase.from('investments').select('*').eq('user_id', user.id).order('start_date', { ascending: false }),
    supabase.from('withdrawals').select('*').eq('user_id', user.id).order('requested_at', { ascending: false }),
    supabase.from('profiles').select('name, email, kyc_status, referral_code, created_at').eq('id', user.id).single(),
  ]);

  const userInvestments = (investmentRows as InvestmentRow[] | null ?? []).map(mapInvestment);
  const userWithdrawals = (withdrawalRows as WithdrawalRow[] | null ?? []).map(mapWithdrawal);

  const active = userInvestments.filter((i) => i.status === 'active');
  const completed = userInvestments.filter((i) => i.status === 'completed');

  const totalInvested = userInvestments.reduce((s, i) => s + i.amount, 0);
  const activeInvested = active.reduce((s, i) => s + i.amount, 0);

  let currentPortfolioValue = 0;
  let totalProfit = 0;
  let dailyEarnings = 0;

  active.forEach((inv) => {
    const stats = getInvestmentStats(inv);
    currentPortfolioValue += stats.currentValue;
    totalProfit += stats.totalProfit;
    dailyEarnings += stats.dailyProfit;
  });

  completed.forEach((inv) => {
    const stats = getInvestmentStats(inv);
    currentPortfolioValue += stats.totalReturn;
    totalProfit += stats.maxProfit;
  });

  const totalWithdrawn = userWithdrawals
    .filter((w) => w.status === 'completed')
    .reduce((s, w) => s + w.amount, 0);

  return NextResponse.json({
    user: {
      name: profile?.name,
      email: profile?.email,
      kycStatus: profile?.kyc_status,
      referralCode: profile?.referral_code,
      memberSince: profile?.created_at,
    },
    stats: {
      totalInvested,
      activeInvested,
      currentPortfolioValue: currentPortfolioValue + totalWithdrawn,
      totalProfit,
      dailyEarnings,
      totalWithdrawn,
      activeInvestments: active.length,
      completedInvestments: completed.length,
    },
    recentInvestments: userInvestments.slice(0, 3).map((inv) => ({
      ...inv,
      stats: getInvestmentStats(inv),
    })),
  });
}
