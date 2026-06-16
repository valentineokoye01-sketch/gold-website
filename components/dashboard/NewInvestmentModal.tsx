'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Copy, Check, Loader2 } from 'lucide-react';
import { plans } from '@/lib/plans';

const WALLETS = {
  crypto_eth:  { label: 'Ethereum (ETH)', address: '0x14b6Acb47E2171924de76406Bbc4200A26Dd670a' },
  crypto_btc:  { label: 'Bitcoin (BTC)', address: 'bc1q4mk45630j32ngl0hxw89gjnqmw47dhlgg7n2f4' },
  crypto_usdt: { label: 'USDT (TRC-20)', address: 'TXmboJbByLEGbL2PmXNKd41SeHETLuFfQd' },
};

interface Props { onClose: () => void; defaultPlan?: string; }

export default function NewInvestmentModal({ onClose, defaultPlan }: Props) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [planSlug, setPlanSlug] = useState(defaultPlan || 'growth');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'crypto_btc' | 'crypto_eth' | 'crypto_usdt' | 'bank'>('crypto_usdt');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const selectedPlan = plans.find(p => p.slug === planSlug) ?? plans[1];
  const roi = parseFloat(amount) * (selectedPlan.dailyReturn / 100) * selectedPlan.days;

  const copyAddress = (addr: string) => {
    navigator.clipboard.writeText(addr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirm = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/investments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planSlug, amount: parseFloat(amount), paymentMethod }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      setStep(3);
      setTimeout(() => { router.refresh(); onClose(); }, 3000);
    } catch {
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#162336] border border-[#c9a84c]/30 rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#c9a84c]/10">
          <h2 className="text-white font-bold text-xl" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            {step === 1 ? 'New Investment' : step === 2 ? 'Make Payment' : 'Investment Confirmed'}
          </h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors"><X size={20} /></button>
        </div>

        <div className="p-6">
          {/* Step 1: Plan + Amount */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">Select Plan</label>
                <div className="grid grid-cols-3 gap-2">
                  {plans.map(p => (
                    <button
                      key={p.slug}
                      onClick={() => setPlanSlug(p.slug)}
                      className={`relative p-3 rounded-xl border-2 text-center transition-all ${planSlug === p.slug ? 'border-[#c9a84c] bg-[#c9a84c]/10' : 'border-[#c9a84c]/10 hover:border-[#c9a84c]/30'}`}
                    >
                      <p className={`font-bold text-sm ${planSlug === p.slug ? 'text-[#c9a84c]' : 'text-white'}`}>{p.name}</p>
                      <p className="text-white/40 text-xs">{p.dailyReturn}%/day</p>
                      <p className="text-white/30 text-xs">{p.period}mo</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">
                  Amount (min ${selectedPlan.minInvestment.toLocaleString()})
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 font-bold">$</span>
                  <input
                    type="number"
                    min={selectedPlan.minInvestment}
                    value={amount}
                    onChange={e => { setAmount(e.target.value); setError(''); }}
                    placeholder={selectedPlan.minInvestment.toString()}
                    className="w-full bg-[#0d1b2a] border border-[#c9a84c]/20 rounded-xl pl-8 pr-4 py-3 text-white text-sm focus:outline-none focus:border-[#c9a84c]/60 transition-colors"
                  />
                </div>
              </div>

              {parseFloat(amount) >= selectedPlan.minInvestment && (
                <div className="bg-[#0d1b2a] rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Daily Earning</span>
                    <span className="text-white font-medium">${(parseFloat(amount) * selectedPlan.dailyReturn / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Total Profit ({selectedPlan.days} days)</span>
                    <span className="text-[#c9a84c] font-bold">+${roi.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-white/10 pt-2">
                    <span className="text-white font-semibold">Total Return</span>
                    <span className="text-white font-bold">${(parseFloat(amount) + roi).toFixed(2)}</span>
                  </div>
                </div>
              )}

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button
                onClick={() => {
                  if (!amount || parseFloat(amount) < selectedPlan.minInvestment) {
                    setError(`Minimum is $${selectedPlan.minInvestment.toLocaleString()}`);
                    return;
                  }
                  setStep(2);
                }}
                className="w-full bg-[#c9a84c] hover:bg-[#a8852e] text-[#0d1b2a] font-bold py-3.5 rounded-xl transition-all btn-shimmer"
              >
                Continue to Payment
              </button>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">Payment Method</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(WALLETS).map(([key, val]) => (
                    <button
                      key={key}
                      onClick={() => setPaymentMethod(key as typeof paymentMethod)}
                      className={`p-3 rounded-xl border-2 text-left transition-all ${paymentMethod === key ? 'border-[#c9a84c] bg-[#c9a84c]/10' : 'border-[#c9a84c]/10 hover:border-[#c9a84c]/30'}`}
                    >
                      <p className={`text-xs font-bold ${paymentMethod === key ? 'text-[#c9a84c]' : 'text-white/60'}`}>{val.label}</p>
                    </button>
                  ))}
                  <button
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${paymentMethod === 'bank' ? 'border-[#c9a84c] bg-[#c9a84c]/10' : 'border-[#c9a84c]/10 hover:border-[#c9a84c]/30'}`}
                  >
                    <p className={`text-xs font-bold ${paymentMethod === 'bank' ? 'text-[#c9a84c]' : 'text-white/60'}`}>Bank Transfer</p>
                  </button>
                </div>
              </div>

              {paymentMethod !== 'bank' && (
                <div className="bg-[#0d1b2a] rounded-xl p-4">
                  <p className="text-white/40 text-xs mb-2">Send exactly <strong className="text-white">${parseFloat(amount).toLocaleString()}</strong> to:</p>
                  <div className="flex items-center gap-2">
                    <code className="text-[#c9a84c] text-xs break-all flex-1">{WALLETS[paymentMethod as keyof typeof WALLETS].address}</code>
                    <button
                      onClick={() => copyAddress(WALLETS[paymentMethod as keyof typeof WALLETS].address)}
                      className="flex-shrink-0 p-1.5 rounded-lg bg-[#c9a84c]/10 hover:bg-[#c9a84c]/20 text-[#c9a84c] transition-colors"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
              )}

              {paymentMethod === 'bank' && (
                <div className="bg-[#0d1b2a] rounded-xl p-4 space-y-1 text-xs text-white/50">
                  <p><span className="text-white/70 font-medium">Bank:</span> Bank of America</p>
                  <p><span className="text-white/70 font-medium">Account Name:</span> Ricky Richardson</p>
                  <p><span className="text-white/70 font-medium">Account Number:</span> <span className="text-[#c9a84c] font-mono">488082660530</span></p>
                  <p><span className="text-white/70 font-medium">Reference:</span> <span className="text-[#c9a84c]">Your email address</span></p>
                </div>
              )}

              <div className="bg-[#c9a84c]/5 border border-[#c9a84c]/20 rounded-xl p-3 text-xs text-white/50">
                After sending payment, click confirm below. Your investment activates upon payment verification (usually within 1 hour).
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setStep(1)} className="py-3.5 rounded-xl border border-[#c9a84c]/20 text-white/60 font-medium text-sm hover:border-[#c9a84c]/40 transition-colors">
                  Back
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={loading}
                  className="bg-[#c9a84c] hover:bg-[#a8852e] text-[#0d1b2a] font-bold py-3.5 rounded-xl transition-all btn-shimmer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? <><Loader2 size={16} className="animate-spin" /> Processing…</> : "I've Paid — Confirm"}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-[#c9a84c]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-[#c9a84c]" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2" style={{ fontFamily: 'var(--font-playfair), serif' }}>Investment Submitted!</h3>
              <p className="text-white/40 text-sm mb-1">Your <strong className="text-white capitalize">{selectedPlan.name}</strong> plan for <strong className="text-[#c9a84c]">${parseFloat(amount).toLocaleString()}</strong> is pending verification.</p>
              <p className="text-white/30 text-xs">Daily earnings begin once payment is confirmed.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
