import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getInvestmentStats, mapInvestment, mapWithdrawal, type InvestmentRow, type WithdrawalRow } from '@/lib/db';

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data, error } = await supabase
    .from('withdrawals')
    .select('*')
    .eq('user_id', user.id)
    .order('requested_at', { ascending: false });

  if (error) return NextResponse.json({ error: 'Failed to load withdrawals.' }, { status: 500 });

  return NextResponse.json((data as WithdrawalRow[]).map(mapWithdrawal));
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { investmentId, method, details } = await req.json();

    if (!investmentId || !method || !details) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const { data: investmentRow } = await supabase
      .from('investments')
      .select('*')
      .eq('id', investmentId)
      .eq('user_id', user.id)
      .single();

    if (!investmentRow) {
      return NextResponse.json({ error: 'Investment not found.' }, { status: 404 });
    }

    const investment = mapInvestment(investmentRow as InvestmentRow);
    const stats = getInvestmentStats(investment);
    const amount = stats.totalReturn; // full principal + profit

    // Check if already withdrawn for this investment
    const { data: existing } = await supabase
      .from('withdrawals')
      .select('id')
      .eq('user_id', user.id)
      .eq('investment_id', investmentId)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ error: 'Withdrawal already requested for this investment.' }, { status: 409 });
    }

    const { data: withdrawalRow, error } = await supabase
      .from('withdrawals')
      .insert({
        user_id: user.id,
        investment_id: investmentId,
        amount,
        method,
        status: 'pending',
        details,
      })
      .select()
      .single();

    if (error || !withdrawalRow) {
      return NextResponse.json({ error: 'Failed to submit withdrawal.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, withdrawal: mapWithdrawal(withdrawalRow as WithdrawalRow) });
  } catch {
    return NextResponse.json({ error: 'Failed to submit withdrawal.' }, { status: 500 });
  }
}
