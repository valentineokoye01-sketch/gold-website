import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { db, getInvestmentStats } from '@/lib/db';

export async function GET() {
  const session = await getSessionUser();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const userInvestments = db.investments.findByUser(session.userId);
  const userWithdrawals = db.withdrawals.findByUser(session.userId);
  const user = db.users.findById(session.userId);

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
      name: user?.name,
      email: user?.email,
      kycStatus: user?.kycStatus,
      referralCode: user?.referralCode,
      memberSince: user?.createdAt,
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
