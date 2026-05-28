import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { db, getInvestmentStats } from '@/lib/db';

export async function GET() {
  const session = await getSessionUser();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const userWithdrawals = db.withdrawals.findByUser(session.userId);
  return NextResponse.json(userWithdrawals);
}

export async function POST(req: NextRequest) {
  const session = await getSessionUser();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { investmentId, method, details } = await req.json();

    if (!investmentId || !method || !details) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const investment = db.investments.findById(investmentId);
    if (!investment || investment.userId !== session.userId) {
      return NextResponse.json({ error: 'Investment not found.' }, { status: 404 });
    }

    const stats = getInvestmentStats(investment);
    const amount = stats.totalReturn; // full principal + profit

    // Check if already withdrawn
    const existing = db.withdrawals.findByUser(session.userId);
    const alreadyRequested = existing.find((w) => w.investmentId === investmentId);
    if (alreadyRequested) {
      return NextResponse.json({ error: 'Withdrawal already requested for this investment.' }, { status: 409 });
    }

    const withdrawal = db.withdrawals.create({
      userId: session.userId,
      investmentId,
      amount,
      method,
      status: 'pending',
      requestedAt: new Date().toISOString(),
      details,
    });

    return NextResponse.json({ success: true, withdrawal });
  } catch {
    return NextResponse.json({ error: 'Failed to submit withdrawal.' }, { status: 500 });
  }
}
