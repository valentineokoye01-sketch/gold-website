import bcrypt from 'bcryptjs';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // bcrypt hash
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

// ─── In-Memory Store ─────────────────────────────────────────────────────────
// NOTE: Replace with a real database (PostgreSQL, MongoDB, etc.) in production.
// This store resets on server restart.

const users = new Map<string, User>();
const investments = new Map<string, Investment>();
const withdrawals = new Map<string, Withdrawal>();

function uid(): string {
  return crypto.randomUUID();
}

// Seed demo account
async function seedDemo() {
  const demoEmail = 'demo@aurimgold.com';
  if (users.has('demo-user-001')) return;

  const hash = await bcrypt.hash('demo123', 10);
  const demoUser: User = {
    id: 'demo-user-001',
    name: 'Alex Johnson',
    email: demoEmail,
    password: hash,
    country: 'United Kingdom',
    phone: '+44 7700 900123',
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    kycStatus: 'verified',
    referralCode: 'DEMO2026',
  };
  users.set(demoUser.id, demoUser);

  // Active Growth investment (started 60 days ago)
  const growthStart = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
  const growthEnd = new Date(growthStart.getTime() + 180 * 24 * 60 * 60 * 1000);
  const inv1: Investment = {
    id: 'demo-inv-001',
    userId: demoUser.id,
    planSlug: 'growth',
    planName: 'Growth',
    amount: 5000,
    dailyReturn: 3,
    totalDays: 180,
    startDate: growthStart.toISOString(),
    endDate: growthEnd.toISOString(),
    status: 'active',
    paymentMethod: 'crypto_usdt',
  };
  investments.set(inv1.id, inv1);

  // Active Starter investment (started 30 days ago)
  const starterStart = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const starterEnd = new Date(starterStart.getTime() + 90 * 24 * 60 * 60 * 1000);
  const inv2: Investment = {
    id: 'demo-inv-002',
    userId: demoUser.id,
    planSlug: 'starter',
    planName: 'Starter',
    amount: 1000,
    dailyReturn: 2,
    totalDays: 90,
    startDate: starterStart.toISOString(),
    endDate: starterEnd.toISOString(),
    status: 'active',
    paymentMethod: 'bank',
  };
  investments.set(inv2.id, inv2);

  // Completed Growth investment
  const completedStart = new Date(Date.now() - 200 * 24 * 60 * 60 * 1000);
  const completedEnd = new Date(completedStart.getTime() + 180 * 24 * 60 * 60 * 1000);
  const inv3: Investment = {
    id: 'demo-inv-003',
    userId: demoUser.id,
    planSlug: 'growth',
    planName: 'Growth',
    amount: 3000,
    dailyReturn: 3,
    totalDays: 180,
    startDate: completedStart.toISOString(),
    endDate: completedEnd.toISOString(),
    status: 'completed',
    paymentMethod: 'crypto_btc',
  };
  investments.set(inv3.id, inv3);

  // Completed withdrawal
  const w1: Withdrawal = {
    id: 'demo-wd-001',
    userId: demoUser.id,
    investmentId: inv3.id,
    amount: 18200,
    method: 'bank',
    status: 'completed',
    requestedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    details: 'Bank transfer — Barclays ****4521',
  };
  withdrawals.set(w1.id, w1);
}

// Initialize seed
seedDemo().catch(console.error);

// ─── DB API ──────────────────────────────────────────────────────────────────

export const db = {
  users: {
    findByEmail: (email: string) =>
      Array.from(users.values()).find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      ) ?? null,
    findById: (id: string) => users.get(id) ?? null,
    create: async (data: Omit<User, 'id' | 'createdAt' | 'kycStatus' | 'referralCode'>): Promise<User> => {
      const hash = await bcrypt.hash(data.password, 10);
      const user: User = {
        ...data,
        id: uid(),
        password: hash,
        createdAt: new Date().toISOString(),
        kycStatus: 'pending',
        referralCode: Math.random().toString(36).substring(2, 10).toUpperCase(),
      };
      users.set(user.id, user);
      return user;
    },
    verifyPassword: async (plain: string, hash: string) =>
      bcrypt.compare(plain, hash),
    update: (id: string, data: Partial<User>): User | null => {
      const user = users.get(id);
      if (!user) return null;
      const updated = { ...user, ...data };
      users.set(id, updated);
      return updated;
    },
  },

  investments: {
    findByUser: (userId: string) =>
      Array.from(investments.values())
        .filter((i) => i.userId === userId)
        .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()),
    findById: (id: string) => investments.get(id) ?? null,
    create: (data: Omit<Investment, 'id'>): Investment => {
      const inv: Investment = { ...data, id: uid() };
      investments.set(inv.id, inv);
      return inv;
    },
    updateStatus: (id: string, status: Investment['status']) => {
      const inv = investments.get(id);
      if (!inv) return null;
      const updated = { ...inv, status };
      investments.set(id, updated);
      return updated;
    },
  },

  withdrawals: {
    findByUser: (userId: string) =>
      Array.from(withdrawals.values())
        .filter((w) => w.userId === userId)
        .sort((a, b) => new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime()),
    create: (data: Omit<Withdrawal, 'id'>): Withdrawal => {
      const w: Withdrawal = { ...data, id: uid() };
      withdrawals.set(w.id, w);
      return w;
    },
  },
};
