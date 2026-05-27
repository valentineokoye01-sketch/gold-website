'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { plans } from '@/lib/plans';
import { GOLD_REFERENCE_PRICE, TROY_OZ_TO_GRAMS } from '@/lib/constants';
import { TrendingUp, Package, CreditCard } from 'lucide-react';

type WithdrawalMethod = 'gold' | 'bank';

export default function ROICalculator() {
  const [amount, setAmount] = useState<string>('5000');
  const [planSlug, setPlanSlug] = useState<string>('growth');
  const [method, setMethod] = useState<WithdrawalMethod>('bank');

  const plan = plans.find((p) => p.slug === planSlug) ?? plans[1];

  const calc = useMemo(() => {
    const principal = parseFloat(amount) || 0;
    // Simple daily interest: profit = principal × (dailyReturn / 100) × days
    const dailyRate = plan.dailyReturn / 100;
    const dailyEarning = principal * dailyRate;
    const totalProfit = dailyEarning * plan.days;
    const totalPayout = principal + totalProfit;

    const fee =
      method === 'gold'
        ? 25 + totalPayout * 0.005
        : totalPayout * 0.015;

    const netPayout = totalPayout - fee;
    const goldOz = netPayout / GOLD_REFERENCE_PRICE;
    const goldGrams = goldOz * TROY_OZ_TO_GRAMS;

    return {
      principal,
      dailyEarning,
      totalProfit,
      totalPayout,
      fee,
      netPayout,
      goldOz,
      goldGrams,
    };
  }, [amount, plan, method]);

  const fmt = (n: number) =>
    n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const inputValid = !isNaN(parseFloat(amount)) && parseFloat(amount) >= 500;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Input Panel */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#f0ece3]">
        <h3
          className="font-playfair text-2xl font-bold text-[#0d1b2a] mb-6"
          style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
        >
          Your Investment
        </h3>

        {/* Amount */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-[#0d1b2a] mb-2">
            Investment Amount (USD)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2e3d52] font-bold text-lg">
              $
            </span>
            <input
              type="number"
              min={500}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-8 pr-4 py-3.5 border-2 border-[#f0ece3] rounded-xl text-[#0d1b2a] font-semibold text-lg focus:outline-none focus:border-[#c9a84c] transition-colors"
              placeholder="5000"
            />
          </div>
          {parseFloat(amount) < 500 && amount !== '' && (
            <p className="text-red-500 text-xs mt-1">Minimum investment is $500</p>
          )}
        </div>

        {/* Plan */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-[#0d1b2a] mb-2">
            Investment Plan
          </label>
          <div className="grid grid-cols-3 gap-3">
            {plans.map((p) => (
              <button
                key={p.slug}
                onClick={() => setPlanSlug(p.slug)}
                className={`relative py-3 px-2 rounded-xl border-2 font-semibold text-sm text-center transition-all duration-200 ${
                  planSlug === p.slug
                    ? 'border-[#c9a84c] bg-[#c9a84c]/10 text-[#0d1b2a]'
                    : 'border-[#f0ece3] text-[#2e3d52] hover:border-[#c9a84c]/50'
                }`}
              >
                {p.badge && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] bg-[#c9a84c] text-[#0d1b2a] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wide whitespace-nowrap">
                    {p.badge}
                  </span>
                )}
                <span className="block font-bold">{p.name}</span>
                <span className="block text-xs opacity-70">{p.dailyReturn}%/day</span>
                <span className="block text-xs opacity-50">{p.period}mo</span>
              </button>
            ))}
          </div>
        </div>

        {/* Withdrawal Method */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-[#0d1b2a] mb-2">
            Withdrawal Method
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setMethod('gold')}
              className={`flex items-center gap-2 py-3 px-4 rounded-xl border-2 font-semibold text-sm transition-all duration-200 ${
                method === 'gold'
                  ? 'border-[#c9a84c] bg-[#c9a84c]/10 text-[#0d1b2a]'
                  : 'border-[#f0ece3] text-[#2e3d52] hover:border-[#c9a84c]/50'
              }`}
            >
              <Package size={16} className="text-[#c9a84c]" /> Gold Shipment
            </button>
            <button
              onClick={() => setMethod('bank')}
              className={`flex items-center gap-2 py-3 px-4 rounded-xl border-2 font-semibold text-sm transition-all duration-200 ${
                method === 'bank'
                  ? 'border-[#c9a84c] bg-[#c9a84c]/10 text-[#0d1b2a]'
                  : 'border-[#f0ece3] text-[#2e3d52] hover:border-[#c9a84c]/50'
              }`}
            >
              <CreditCard size={16} className="text-[#c9a84c]" /> Bank Transfer
            </button>
          </div>
        </div>

        {/* Rate summary */}
        {inputValid && (
          <div className="rounded-xl bg-[#faf8f4] border border-[#f0ece3] px-4 py-3 text-sm text-[#2e3d52]">
            <span className="font-semibold text-[#0d1b2a]">{plan.dailyReturn}% daily</span> ×{' '}
            {plan.days} days ({plan.period} months) = simple interest
          </div>
        )}
      </div>

      {/* Output Panel */}
      <div className="bg-[#0d1b2a] rounded-2xl p-8 border border-[#c9a84c]/20">
        <h3
          className="font-playfair text-2xl font-bold text-[#c9a84c] mb-6 flex items-center gap-2"
          style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
        >
          <TrendingUp size={22} /> Your Returns
        </h3>

        {!inputValid ? (
          <p className="text-white/40 text-sm">Enter a valid amount ($500 minimum) to see your projected returns.</p>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {[
                { label: 'Daily Earning', value: `$${fmt(calc.dailyEarning)}`, highlight: false },
                { label: `Total Profit (${plan.days} days)`, value: `$${fmt(calc.totalProfit)}`, highlight: true },
                { label: 'Total Withdrawal Amount', value: `$${fmt(calc.totalPayout)}`, highlight: false },
                {
                  label: 'Estimated Gold Weight',
                  value: `${calc.goldGrams.toFixed(1)}g / ${calc.goldOz.toFixed(3)} oz`,
                  highlight: false,
                  sub: `at $${GOLD_REFERENCE_PRICE}/oz reference price`,
                },
                {
                  label: `Withdrawal Fee (${method === 'gold' ? '$25 + 0.5% insurance' : '1.5%'})`,
                  value: `$${fmt(calc.fee)}`,
                  highlight: false,
                  negative: true,
                },
              ].map(({ label, value, highlight, negative, sub }) => (
                <div
                  key={label}
                  className={`flex items-start justify-between py-3 border-b border-[#c9a84c]/10 ${
                    highlight ? 'rounded-xl bg-[#c9a84c]/10 px-3 -mx-3' : ''
                  }`}
                >
                  <div>
                    <span className="text-white/60 text-sm">{label}</span>
                    {sub && <p className="text-white/30 text-xs mt-0.5">{sub}</p>}
                  </div>
                  <span
                    className={`font-bold text-base ${
                      highlight
                        ? 'text-[#c9a84c] text-lg'
                        : negative
                        ? 'text-red-400'
                        : 'text-white'
                    }`}
                  >
                    {value}
                  </span>
                </div>
              ))}

              {/* Net Payout */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-white font-bold text-lg">Net Payout</span>
                <span
                  className="font-bold text-2xl text-[#c9a84c]"
                  style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
                >
                  ${fmt(calc.netPayout)}
                </span>
              </div>
            </div>

            <Link
              href="/plans"
              className="block w-full text-center py-4 bg-[#c9a84c] hover:bg-[#a8852e] text-[#0d1b2a] font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              Start This Investment →
            </Link>
          </>
        )}

        <p className="text-white/20 text-xs mt-4 leading-relaxed">
          * Return projections are based on current daily plan rates and are illustrative. Gold
          investment carries market risk. Returns are not guaranteed.
        </p>
      </div>
    </div>
  );
}
