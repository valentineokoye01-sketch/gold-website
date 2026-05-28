'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Loader2, Check } from 'lucide-react';
import { COUNTRIES } from '@/lib/constants';

export default function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planHint = searchParams.get('plan');

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    country: '',
    phone: '',
  });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }

      setSuccess(true);
      setTimeout(() => {
        router.push(planHint ? `/dashboard?newPlan=${planHint}` : '/dashboard');
        router.refresh();
      }, 1200);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-[#c9a84c]/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check size={32} className="text-[#c9a84c]" />
        </div>
        <p className="text-white font-semibold text-lg">Account Created!</p>
        <p className="text-white/40 text-sm mt-1">Redirecting to your dashboard…</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {planHint && (
        <div className="bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-xl px-4 py-3 text-[#c9a84c] text-sm">
          ✦ You selected the <strong className="capitalize">{planHint}</strong> plan — it will be ready to activate after registration.
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-white/70 mb-1.5">Full Name</label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="John Smith"
            className="w-full bg-[#0d1b2a] border border-[#c9a84c]/20 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#c9a84c]/60 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-1.5">Email Address</label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full bg-[#0d1b2a] border border-[#c9a84c]/20 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#c9a84c]/60 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-1.5">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+1 234 567 8900"
            className="w-full bg-[#0d1b2a] border border-[#c9a84c]/20 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#c9a84c]/60 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-1.5">Country</label>
          <select
            name="country"
            required
            value={form.country}
            onChange={handleChange}
            className="w-full bg-[#0d1b2a] border border-[#c9a84c]/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#c9a84c]/60 transition-colors"
          >
            <option value="">Select your country</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-1.5">Password</label>
          <div className="relative">
            <input
              type={showPw ? 'text' : 'password'}
              name="password"
              required
              minLength={8}
              value={form.password}
              onChange={handleChange}
              placeholder="Min. 8 characters"
              className="w-full bg-[#0d1b2a] border border-[#c9a84c]/20 rounded-xl px-4 py-3 pr-11 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#c9a84c]/60 transition-colors"
            />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#c9a84c] hover:bg-[#a8852e] disabled:opacity-50 text-[#0d1b2a] font-bold py-3.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 btn-shimmer mt-2"
      >
        {loading ? <><Loader2 size={18} className="animate-spin" /> Creating account…</> : 'Create Free Account'}
      </button>

      <p className="text-white/25 text-xs text-center leading-relaxed">
        By creating an account you agree to our Terms of Service and Privacy Policy. All investments carry risk.
      </p>
    </form>
  );
}
