import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getInvestmentStats, mapInvestment, type InvestmentRow } from '@/lib/db';
import { TrendingUp, Clock, CheckCircle, Hourglass } from 'lucide-react';
import DashboardInvestButton from '@/components/dashboard/DashboardInvestButton';

export const metadata: Metadata = { title: 'My Investments' };

const fmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const statusConfig = {
  active: { label: 'Active', color: 'bg-emerald-500/20 text-emerald-400', icon: TrendingUp },
  completed: { label: 'Completed', color: 'bg-blue-500/20 text-blue-400', icon: CheckCircle },
  pending_payment: { label: 'Pending Payment', color: 'bg-amber-500/20 text-amber-400', icon: Hourglass },
};

export default async function InvestmentsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth/login');

  const { data: investmentRows } = await supabase
    .from('investments')
    .select('*')
    .eq('user_id', user.id)
    .order('start_date', { ascending: false });

  const investments = (investmentRows as InvestmentRow[] | null ?? []).map(mapInvestment);

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            My Investments
          </h1>
          <p className="text-white/40 text-sm mt-1">{investments.length} total investment{investments.length !== 1 ? 's' : ''}</p>
        </div>
        <DashboardInvestButton />
      </div>

      {investments.length === 0 ? (
        <div className="bg-[#162336] border border-[#c9a84c]/10 rounded-2xl p-12 text-center">
          <TrendingUp size={48} className="text-[#c9a84c]/20 mx-auto mb-4" />
          <p className="text-white font-semibold text-lg mb-2">No investments yet</p>
          <p className="text-white/40 text-sm mb-6">Start your first gold investment and watch your wealth grow daily.</p>
          <DashboardInvestButton label="Make Your First Investment" className="mx-auto" />
        </div>
      ) : (
        <div className="space-y-5">
          {investments.map(inv => {
            const s = getInvestmentStats(inv);
            const cfg = statusConfig[inv.status] || statusConfig.active;
            const Icon = cfg.icon;
            const planColors: Record<string, string> = { starter: 'border-blue-500/40', growth: 'border-[#c9a84c]/40', premium: 'border-purple-500/40' };

            return (
              <div key={inv.id} className={`bg-[#162336] border ${planColors[inv.planSlug] || 'border-[#c9a84c]/10'} rounded-2xl p-6`}>
                {/* Top row */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-white font-bold text-xl capitalize" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                        {inv.planName} Plan
                      </h3>
                      <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-semibold ${cfg.color}`}>
                        <Icon size={11} /> {cfg.label}
                      </span>
                    </div>
                    <p className="text-white/40 text-sm">
                      Started {new Date(inv.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} ·
                      Matures {new Date(inv.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold text-2xl" style={{ fontFamily: 'var(--font-playfair), serif' }}>${fmt(s.currentValue)}</p>
                    <p className={`text-sm font-semibold ${s.totalProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {s.totalProfit >= 0 ? '+' : ''}${fmt(s.totalProfit)} profit
                    </p>
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
                  {[
                    { label: 'Principal', value: `$${inv.amount.toLocaleString()}` },
                    { label: 'Daily Rate', value: `${inv.dailyReturn}%/day` },
                    { label: 'Daily Earning', value: `$${fmt(s.dailyProfit)}` },
                    { label: 'Total Days', value: `${inv.totalDays} days` },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-[#0d1b2a] rounded-xl p-3 text-center">
                      <p className="text-white/30 text-xs mb-1">{label}</p>
                      <p className="text-white font-semibold text-sm">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Progress */}
                {inv.status === 'active' && (
                  <div>
                    <div className="flex justify-between text-xs text-white/30 mb-1.5">
                      <span className="flex items-center gap-1"><Clock size={11} /> Day {s.daysElapsed} of {inv.totalDays}</span>
                      <span>{s.daysRemaining} days remaining · {s.progressPercent.toFixed(1)}% complete</span>
                    </div>
                    <div className="w-full bg-[#0d1b2a] rounded-full h-2.5">
                      <div
                        className="h-2.5 rounded-full bg-gradient-to-r from-[#c9a84c] to-[#d4b96a] transition-all"
                        style={{ width: `${s.progressPercent}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-white/20 mt-1">
                      <span>$0</span>
                      <span>Max profit: +${fmt(s.maxProfit)}</span>
                    </div>
                  </div>
                )}

                {inv.status === 'completed' && (
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-3 flex items-center gap-2">
                    <CheckCircle size={16} className="text-blue-400" />
                    <span className="text-blue-300 text-sm font-medium">This investment has matured. Total return: <strong>${fmt(s.totalReturn)}</strong></span>
                  </div>
                )}

                {/* Payment method */}
                <p className="text-white/20 text-xs mt-3">
                  Payment: {inv.paymentMethod.replace('_', ' ').toUpperCase()} · ID: {inv.id.slice(0, 8).toUpperCase()}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
