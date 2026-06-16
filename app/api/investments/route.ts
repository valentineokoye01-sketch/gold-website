import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getInvestmentStats, mapInvestment, type InvestmentRow } from '@/lib/db';
import { plans } from '@/lib/plans';

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data, error } = await supabase
    .from('investments')
    .select('*')
    .eq('user_id', user.id)
    .order('start_date', { ascending: false });

  if (error) return NextResponse.json({ error: 'Failed to load investments.' }, { status: 500 });

  const enriched = (data as InvestmentRow[]).map(mapInvestment).map((inv) => ({
    ...inv,
    stats: getInvestmentStats(inv),
  }));

  return NextResponse.json(enriched);
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { planSlug, amount, paymentMethod } = await req.json();

    const plan = plans.find((p) => p.slug === planSlug);
    if (!plan) return NextResponse.json({ error: 'Invalid plan.' }, { status: 400 });

    if (!amount || amount < plan.minInvestment) {
      return NextResponse.json(
        { error: `Minimum investment for ${plan.name} is $${plan.minInvestment.toLocaleString()}.` },
        { status: 400 }
      );
    }

    if (plan.maxInvestment && amount > plan.maxInvestment) {
      return NextResponse.json(
        { error: `Maximum investment for ${plan.name} is $${plan.maxInvestment.toLocaleString()}.` },
        { status: 400 }
      );
    }

    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + plan.days * 24 * 60 * 60 * 1000);

    const { data, error } = await supabase
      .from('investments')
      .insert({
        user_id: user.id,
        plan_slug: plan.slug,
        plan_name: plan.name,
        amount,
        daily_return: plan.dailyReturn,
        total_days: plan.days,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        status: 'active',
        payment_method: paymentMethod,
      })
      .select()
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Failed to create investment.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, investment: mapInvestment(data as InvestmentRow) });
  } catch {
    return NextResponse.json({ error: 'Failed to create investment.' }, { status: 500 });
  }
}
