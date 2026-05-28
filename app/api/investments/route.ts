import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { db, getInvestmentStats } from '@/lib/db';
import { plans } from '@/lib/plans';

export async function GET() {
  const session = await getSessionUser();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const userInvestments = db.investments.findByUser(session.userId);
  const enriched = userInvestments.map((inv) => ({
    ...inv,
    stats: getInvestmentStats(inv),
  }));

  return NextResponse.json(enriched);
}

export async function POST(req: NextRequest) {
  const session = await getSessionUser();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

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

    const investment = db.investments.create({
      userId: session.userId,
      planSlug: plan.slug as 'starter' | 'growth' | 'premium',
      planName: plan.name,
      amount,
      dailyReturn: plan.dailyReturn,
      totalDays: plan.days,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      status: 'active',
      paymentMethod,
    });

    return NextResponse.json({ success: true, investment });
  } catch {
    return NextResponse.json({ error: 'Failed to create investment.' }, { status: 500 });
  }
}
