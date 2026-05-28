'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Loader2 } from 'lucide-react';
import type { Investment } from '@/lib/db';

interface Props { investments: Investment[]; }

const fmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function WithdrawForm({ investments }: Props) {
  const router = useRouter();
  const [investmentId, setInvestmentId] = useState('');
  const [method, setMethod] = useState<'bank' | 'gold'>('bank');
  const [amount, setAmount] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!investmentId) { setError('Please select an investment.'); return; }
    if (!amount || Number(amount) < 100) { setError('Minimum withdrawal is $100.'); return; }
    if (!details.trim()) { setError('Please provide withdrawal details.'); return; }

    setLoading(true);
    try {
      const res = await fetch('/api/withdrawals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ investmentId, amount: Number(amount), method, details }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit request');
      setDone(true);
      setTimeout(() => { router.refresh(); }, 2000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-emerald-400" />
        </div>
        <p className="text-white font-bold text-lg mb-1">Request Submitted!</p>
        <p className="text-white/40 text-sm">Your withdrawal is being processed. We'll notify you within 1–3 business days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Investment Select */}
      <div>
        <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">Select Investment</label>
        <select
          value={investmentId}
          onChange={e => setInvestmentId(e.target.value)}
          className="w-full bg-[#0d1b2a] border border-[#c9a84c]/20 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/60 transition-colors"
        >
          <option value="">— Choose an investment —</option>
          {investments.map(inv => {
            const dailyProfit = inv.amount * (inv.dailyReturn / 100);
            return (
              <option key={inv.id} value={inv.id}>
                {inv.planName} Plan · ${inv.amount.toLocaleString()} · {inv.status === 'completed' ? 'Matured' : `+$${fmt(dailyProfit)}/day`}
              </option>
            );
          })}
        </select>
      </div>

      {/* Amount */}
      <div>
        <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">Amount (USD)</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-sm">$</span>
          <input
            type="number"
            min="100"
            step="0.01"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full bg-[#0d1b2a] border border-[#c9a84c]/20 text-white rounded-xl pl-8 pr-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/60 transition-colors placeholder:text-white/20"
          />
        </div>
      </div>

      {/* Method */}
      <div>
        <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">Withdrawal Method</label>
        <div className="grid grid-cols-2 gap-3">
          {(['bank', 'gold'] as const).map(m => (
            <button
              key={m}
              type="button"
              onClick={() => setMethod(m)}
              className={`py-3 rounded-xl text-sm font-semibold border transition-all ${
                method === m
                  ? 'bg-[#c9a84c]/20 border-[#c9a84c] text-[#c9a84c]'
                  : 'bg-[#0d1b2a] border-[#c9a84c]/10 text-white/50 hover:border-[#c9a84c]/30'
              }`}
            >
              {m === 'bank' ? '🏦 Bank Transfer' : '🥇 Gold Delivery'}
            </button>
          ))}
        </div>
      </div>

      {/* Details */}
      <div>
        <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">
          {method === 'bank' ? 'Bank Account Details' : 'Delivery Address'}
        </label>
        <textarea
          value={details}
          onChange={e => setDetails(e.target.value)}
          placeholder={method === 'bank' ? 'Bank name, account number, sort code…' : 'Full delivery address including postcode…'}
          rows={3}
          className="w-full bg-[#0d1b2a] border border-[#c9a84c]/20 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/60 transition-colors placeholder:text-white/20 resize-none"
        />
      </div>

      {error && (
        <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#c9a84c] hover:bg-[#a8852e] disabled:opacity-60 text-[#0d1b2a] font-bold py-3.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm"
      >
        {loading ? <><Loader2 size={16} className="animate-spin" /> Submitting…</> : 'Submit Withdrawal Request'}
      </button>
    </form>
  );
}
