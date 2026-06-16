import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { getInvestmentStats, mapInvestment, mapWithdrawal, type InvestmentRow, type WithdrawalRow } from '@/lib/db';
import { TrendingUp, DollarSign, BarChart3, Clock, ArrowUpRight, PlusCircle, Shield, AlertCircle } from 'lucide-react';
import DashboardInvestButton from '@/components/dashboard/DashboardInvestButton';

export const metadata: Metadata = { title: 'Dashboard' };

const fmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtK = (n: number) => n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${fmt(n)}`;

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user: authUser } } = await supabase.auth.getUser();
  if (!authUser) redirect('/auth/login');

  const [{ data: profile }, { data: investmentRows }, { data: withdrawalRows }] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', authUser.id).single(),
    supabase.from('investments').select('*').eq('user_id', authUser.id).order('start_date', { ascending: false }),
    supabase.from('withdrawals').select('*').eq('user_id', authUser.id).order('requested_at', { ascending: false }),
  ]);

  const user = { ...profile!, createdAt: profile!.created_at, kycStatus: profile!.kyc_status, referralCode: profile!.referral_code };
  const investments = (investmentRows as InvestmentRow[] | null ?? []).map(mapInvestment);
  const withdrawals = (withdrawalRows as WithdrawalRow[] | null ?? []).map(mapWithdrawal);

  const active = investments.filter(i => i.status === 'active');
  const completed = investments.filter(i => i.status === 'completed');

  let totalInvested = 0, portfolioValue = 0, totalProfit = 0, dailyEarnings = 0;
  active.forEach(inv => {
    const s = getInvestmentStats(inv);
    totalInvested += inv.amount;
    portfolioValue += s.currentValue;
    totalProfit += s.totalProfit;
    dailyEarnings += s.dailyProfit;
  });
  completed.forEach(inv => {
    const s = getInvestmentStats(inv);
    totalInvested += inv.amount;
    portfolioValue += s.totalReturn;
    totalProfit += s.maxProfit;
  });

  const totalWithdrawn = withdrawals.filter(w => w.status === 'completed').reduce((s, w) => s + w.amount, 0);
  const memberDays = Math.floor((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24));

  const stats = [
    { label: 'Total Invested', value: `$${fmt(totalInvested)}`, icon: DollarSign, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Portfolio Value', value: `$${fmt(portfolioValue)}`, icon: BarChart3, color: 'text-[#c9a84c]', bg: 'bg-[#c9a84c]/10' },
    { label: 'Total Profit', value: `+$${fmt(totalProfit)}`, icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Daily Earnings', value: `$${fmt(dailyEarnings)}`, icon: Clock, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            Welcome back, <span className="text-[#c9a84c]">{user.name.split(' ')[0]}</span> 👋
          </h1>
          <p className="text-white/40 text-sm mt-1">Member for {memberDays} days · {user.kycStatus === 'verified' ? '✓ KYC Verified' : '⚠ KYC Pending'}</p>
        </div>
        <DashboardInvestButton />
      </div>

      {/* KYC Notice */}
      {user.kycStatus === 'pending' && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl px-5 py-4 flex items-start gap-3 mb-6">
          <AlertCircle size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-300 font-semibold text-sm">Identity Verification Pending</p>
            <p className="text-amber-400/60 text-xs mt-0.5">Complete KYC to unlock withdrawals. Check your email for verification steps.</p>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-[#162336] border border-[#c9a84c]/10 rounded-2xl p-5">
            <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
              <Icon size={20} className={color} />
            </div>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-1">{label}</p>
            <p className="text-white font-bold text-xl" style={{ fontFamily: 'var(--font-playfair), serif' }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Active Investments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-bold text-lg" style={{ fontFamily: 'var(--font-playfair), serif' }}>Active Investments</h2>
            <Link href="/dashboard/investments" className="text-[#c9a84c] text-sm hover:underline flex items-center gap-1">View all <ArrowUpRight size={14} /></Link>
          </div>

          {active.length === 0 ? (
            <div className="bg-[#162336] border border-[#c9a84c]/10 rounded-2xl p-8 text-center">
              <PlusCircle size={36} className="text-[#c9a84c]/30 mx-auto mb-3" />
              <p className="text-white/40 text-sm">No active investments yet.</p>
              <DashboardInvestButton label="Start Your First Investment" className="mt-4 mx-auto" />
            </div>
          ) : (
            <div className="space-y-4">
              {active.map(inv => {
                const s = getInvestmentStats(inv);
                const planColors: Record<string, string> = { starter: 'bg-blue-500', growth: 'bg-[#c9a84c]', premium: 'bg-purple-500' };
                return (
                  <div key={inv.id} className="bg-[#162336] border border-[#c9a84c]/10 rounded-2xl p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`w-2 h-2 rounded-full ${planColors[inv.planSlug] || 'bg-[#c9a84c]'}`} />
                          <span className="text-white font-semibold">{inv.planName} Plan</span>
                          <span className="text-[#c9a84c] text-xs bg-[#c9a84c]/10 px-2 py-0.5 rounded-full">{inv.dailyReturn}%/day</span>
                        </div>
                        <p className="text-white/40 text-xs">Invested: <span className="text-white">${inv.amount.toLocaleString()}</span> · Daily: <span className="text-emerald-400">+${fmt(s.dailyProfit)}</span></p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold text-lg" style={{ fontFamily: 'var(--font-playfair), serif' }}>${fmt(s.currentValue)}</p>
                        <p className="text-emerald-400 text-xs">+${fmt(s.totalProfit)} profit</p>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="mb-2">
                      <div className="flex justify-between text-xs text-white/30 mb-1">
                        <span>Day {s.daysElapsed} of {inv.totalDays}</span>
                        <span>{s.daysRemaining} days left</span>
                      </div>
                      <div className="w-full bg-[#0d1b2a] rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${planColors[inv.planSlug] || 'bg-[#c9a84c]'}`}
                          style={{ width: `${s.progressPercent}%` }}
                        />
                      </div>
                    </div>
                    <p className="text-white/25 text-xs">Matures: {new Date(inv.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Side Panel */}
        <div className="space-y-4">
          {/* Summary */}
          <div className="bg-[#162336] border border-[#c9a84c]/10 rounded-2xl p-5">
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-widest text-white/40">Account Summary</h3>
            <div className="space-y-3">
              {[
                { label: 'Active Plans', value: active.length },
                { label: 'Completed Plans', value: completed.length },
                { label: 'Total Withdrawn', value: `$${fmt(totalWithdrawn)}` },
                { label: 'Referral Code', value: user.referralCode },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between">
                  <span className="text-white/40 text-sm">{label}</span>
                  <span className="text-white font-semibold text-sm">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="bg-[#162336] border border-[#c9a84c]/10 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Shield size={16} className="text-[#c9a84c]" />
              <h3 className="text-white font-semibold text-sm">Security Status</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-white/50">Email verified</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className={`w-2 h-2 rounded-full ${user.kycStatus === 'verified' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                <span className="text-white/50">KYC: {user.kycStatus === 'verified' ? 'Verified' : 'Pending review'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-white/50">Gold vault insured</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-[#162336] border border-[#c9a84c]/10 rounded-2xl p-5">
            <h3 className="text-white/40 font-bold mb-3 text-xs uppercase tracking-widest">Quick Actions</h3>
            <div className="space-y-2">
              <Link href="/dashboard/withdraw" className="flex items-center justify-between text-sm text-white/60 hover:text-white py-2 border-b border-white/5 transition-colors">
                Request Withdrawal <ArrowUpRight size={14} />
              </Link>
              <Link href="/dashboard/invest" className="flex items-center justify-between text-sm text-white/60 hover:text-white py-2 border-b border-white/5 transition-colors">
                New Investment <ArrowUpRight size={14} />
              </Link>
              <Link href="/dashboard/profile" className="flex items-center justify-between text-sm text-white/60 hover:text-white py-2 transition-colors">
                Edit Profile <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
