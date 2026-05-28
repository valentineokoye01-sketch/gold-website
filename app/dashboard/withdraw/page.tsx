import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { db, getInvestmentStats } from '@/lib/db';
import WithdrawForm from '@/components/dashboard/WithdrawForm';
import { CheckCircle, Clock, XCircle, Hourglass, AlertCircle, ArrowDownLeft } from 'lucide-react';

export const metadata: Metadata = { title: 'Withdraw Funds' };

const fmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const statusConfig = {
  pending:    { label: 'Pending',    color: 'bg-amber-500/20 text-amber-400',   icon: Hourglass  },
  processing: { label: 'Processing', color: 'bg-blue-500/20 text-blue-400',     icon: Clock      },
  completed:  { label: 'Completed',  color: 'bg-emerald-500/20 text-emerald-400', icon: CheckCircle },
  rejected:   { label: 'Rejected',   color: 'bg-red-500/20 text-red-400',       icon: XCircle    },
};

export default async function WithdrawPage() {
  const session = await getSessionUser();
  if (!session) redirect('/auth/login');

  const user = db.users.findById(session.userId)!;
  const investments = db.investments.findByUser(session.userId);
  const withdrawals = db.withdrawals.findByUser(session.userId);

  // Eligible = completed investments with profit available
  const eligible = investments.filter(i => i.status === 'completed' || i.status === 'active');

  // Total available to withdraw (matured + accrued profit)
  let totalAvailable = 0;
  eligible.forEach(inv => {
    const s = getInvestmentStats(inv);
    if (inv.status === 'completed') totalAvailable += s.totalReturn;
    else totalAvailable += s.totalProfit; // partial profit on active
  });

  const totalWithdrawn = withdrawals.filter(w => w.status === 'completed').reduce((s, w) => s + w.amount, 0);

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-playfair), serif' }}>
          Withdraw Funds
        </h1>
        <p className="text-white/40 text-sm mt-1">Request a withdrawal from your completed or active investments.</p>
      </div>

      {/* KYC Warning */}
      {user.kycStatus === 'pending' && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl px-5 py-4 flex items-start gap-3 mb-6">
          <AlertCircle size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-300 font-semibold text-sm">KYC Verification Required</p>
            <p className="text-amber-400/60 text-xs mt-0.5">
              Withdrawals are locked until your identity is verified. Please check your email for KYC steps.
            </p>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Available', value: `$${fmt(totalAvailable)}`, sub: 'Across all investments', color: 'text-[#c9a84c]' },
          { label: 'Total Withdrawn', value: `$${fmt(totalWithdrawn)}`, sub: 'Successfully processed', color: 'text-emerald-400' },
          { label: 'Pending Requests', value: withdrawals.filter(w => w.status === 'pending' || w.status === 'processing').length.toString(), sub: 'Awaiting processing', color: 'text-blue-400' },
        ].map(({ label, value, sub, color }) => (
          <div key={label} className="bg-[#162336] border border-[#c9a84c]/10 rounded-2xl p-5">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-2">{label}</p>
            <p className={`text-2xl font-bold ${color}`} style={{ fontFamily: 'var(--font-playfair), serif' }}>{value}</p>
            <p className="text-white/25 text-xs mt-1">{sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Withdraw Form */}
        <div className="lg:col-span-3">
          <div className="bg-[#162336] border border-[#c9a84c]/20 rounded-2xl p-6">
            <h2 className="text-white font-bold text-lg mb-1" style={{ fontFamily: 'var(--font-playfair), serif' }}>New Withdrawal Request</h2>
            <p className="text-white/30 text-sm mb-6">Processing takes 1–3 business days.</p>
            {user.kycStatus === 'verified' ? (
              <WithdrawForm investments={eligible} />
            ) : (
              <div className="text-center py-10">
                <AlertCircle size={40} className="text-amber-400/30 mx-auto mb-3" />
                <p className="text-white/40 text-sm">Complete KYC verification to unlock withdrawals.</p>
              </div>
            )}
          </div>
        </div>

        {/* Info Panel */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#162336] border border-[#c9a84c]/10 rounded-2xl p-5">
            <h3 className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">Withdrawal Info</h3>
            <div className="space-y-3 text-sm">
              {[
                { label: 'Processing Time', value: '1–3 business days' },
                { label: 'Min Withdrawal', value: '$100' },
                { label: 'Methods', value: 'Bank / Crypto' },
                { label: 'Fees', value: 'None' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between">
                  <span className="text-white/40">{label}</span>
                  <span className="text-white font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0d1b2a] border border-[#c9a84c]/10 rounded-2xl p-5">
            <p className="text-white/30 text-xs leading-relaxed">
              Withdrawals from <strong className="text-white/50">active investments</strong> apply only to accrued profit. Principal is released upon plan maturity.
            </p>
          </div>
        </div>
      </div>

      {/* Withdrawal History */}
      <div className="mt-8">
        <h2 className="text-white font-bold text-lg mb-4" style={{ fontFamily: 'var(--font-playfair), serif' }}>
          Withdrawal History
        </h2>

        {withdrawals.length === 0 ? (
          <div className="bg-[#162336] border border-[#c9a84c]/10 rounded-2xl p-10 text-center">
            <ArrowDownLeft size={36} className="text-[#c9a84c]/20 mx-auto mb-3" />
            <p className="text-white/40 text-sm">No withdrawals yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {withdrawals.map(w => {
              const cfg = statusConfig[w.status] || statusConfig.pending;
              const Icon = cfg.icon;
              return (
                <div key={w.id} className="bg-[#162336] border border-[#c9a84c]/10 rounded-2xl px-6 py-4 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center flex-shrink-0">
                      <ArrowDownLeft size={18} className="text-[#c9a84c]" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{w.method === 'bank' ? 'Bank Transfer' : 'Gold Delivery'}</p>
                      <p className="text-white/30 text-xs mt-0.5">{w.details}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-white font-bold">${fmt(w.amount)}</p>
                      <p className="text-white/30 text-xs">
                        {new Date(w.requestedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-semibold ${cfg.color}`}>
                      <Icon size={11} /> {cfg.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
