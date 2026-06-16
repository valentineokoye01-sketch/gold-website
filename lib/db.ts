// ─── Types ────────────────────────────────────────────────────────────────────
// These mirror the public.profiles / public.investments / public.withdrawals
// tables in Supabase (see lib/supabase/server.ts for the client).

export interface User {
  id: string;
  name: string;
  email: string;
  country: string;
  phone: string;
  createdAt: string;
  kycStatus: 'pending' | 'verified';
  referralCode: string;
}

export interface Investment {
  id: string;
  userId: string;
  planSlug: 'starter' | 'growth' | 'premium';
  planName: string;
  amount: number;
  dailyReturn: number; // % per day
  totalDays: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'pending_payment';
  paymentMethod: 'crypto_btc' | 'crypto_eth' | 'crypto_usdt' | 'bank';
  txHash?: string;
}

export interface Withdrawal {
  id: string;
  userId: string;
  investmentId: string;
  amount: number;
  method: 'gold' | 'bank';
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  requestedAt: string;
  completedAt?: string;
  details: string; // address for gold, bank details for bank
}

// ─── Row mappers ─────────────────────────────────────────────────────────────
// Supabase returns snake_case columns; the app works in camelCase.

export interface InvestmentRow {
  id: string;
  user_id: string;
  plan_slug: string;
  plan_name: string;
  amount: number;
  daily_return: number;
  total_days: number;
  start_date: string;
  end_date: string;
  status: string;
  payment_method: string;
  tx_hash: string | null;
}

export function mapInvestment(row: InvestmentRow): Investment {
  return {
    id: row.id,
    userId: row.user_id,
    planSlug: row.plan_slug as Investment['planSlug'],
    planName: row.plan_name,
    amount: Number(row.amount),
    dailyReturn: Number(row.daily_return),
    totalDays: row.total_days,
    startDate: row.start_date,
    endDate: row.end_date,
    status: row.status as Investment['status'],
    paymentMethod: row.payment_method as Investment['paymentMethod'],
    txHash: row.tx_hash ?? undefined,
  };
}

export interface WithdrawalRow {
  id: string;
  user_id: string;
  investment_id: string;
  amount: number;
  method: string;
  status: string;
  requested_at: string;
  completed_at: string | null;
  details: string;
}

export function mapWithdrawal(row: WithdrawalRow): Withdrawal {
  return {
    id: row.id,
    userId: row.user_id,
    investmentId: row.investment_id,
    amount: Number(row.amount),
    method: row.method as Withdrawal['method'],
    status: row.status as Withdrawal['status'],
    requestedAt: row.requested_at,
    completedAt: row.completed_at ?? undefined,
    details: row.details,
  };
}

// ─── Computed helpers ────────────────────────────────────────────────────────

export function getInvestmentStats(inv: Investment) {
  const now = new Date();
  const start = new Date(inv.startDate);
  const totalMs = inv.totalDays * 24 * 60 * 60 * 1000;
  const elapsedMs = Math.min(now.getTime() - start.getTime(), totalMs);
  const daysElapsed = Math.max(0, Math.floor(elapsedMs / (24 * 60 * 60 * 1000)));
  const daysRemaining = Math.max(0, inv.totalDays - daysElapsed);
  const dailyProfit = inv.amount * (inv.dailyReturn / 100);
  const totalProfit = dailyProfit * daysElapsed;
  const currentValue = inv.amount + totalProfit;
  const maxProfit = dailyProfit * inv.totalDays;
  const totalReturn = inv.amount + maxProfit;
  const progressPercent = Math.min(100, (daysElapsed / inv.totalDays) * 100);

  return { daysElapsed, daysRemaining, dailyProfit, totalProfit, currentValue, maxProfit, totalReturn, progressPercent };
}
