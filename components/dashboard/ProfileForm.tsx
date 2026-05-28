'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Loader2 } from 'lucide-react';

const COUNTRIES = [
  'United Kingdom','United States','Canada','Australia','Germany','France','Netherlands',
  'South Africa','Nigeria','Kenya','Ghana','UAE','Singapore','India','Other',
];

interface Props {
  initialName: string;
  initialPhone: string;
  initialCountry: string;
}

export default function ProfileForm({ initialName, initialPhone, initialCountry }: Props) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);
  const [country, setCountry] = useState(initialCountry);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!name.trim()) { setError('Name is required.'); return; }

    setLoading(true);
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, country }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Update failed');
      setSaved(true);
      setTimeout(() => { setSaved(false); router.refresh(); }, 2500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div className="sm:col-span-2">
          <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full bg-[#0d1b2a] border border-[#c9a84c]/20 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/60 transition-colors placeholder:text-white/20"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full bg-[#0d1b2a] border border-[#c9a84c]/20 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/60 transition-colors placeholder:text-white/20"
          />
        </div>

        {/* Country */}
        <div>
          <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">Country</label>
          <select
            value={country}
            onChange={e => setCountry(e.target.value)}
            className="w-full bg-[#0d1b2a] border border-[#c9a84c]/20 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/60 transition-colors"
          >
            <option value="">Select country</option>
            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {error && (
        <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>
      )}
      {saved && (
        <div className="flex items-center gap-2 text-emerald-400 text-sm bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
          <CheckCircle size={15} /> Profile updated successfully.
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-[#c9a84c] hover:bg-[#a8852e] disabled:opacity-60 text-[#0d1b2a] font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2 text-sm"
      >
        {loading ? <><Loader2 size={15} className="animate-spin" /> Saving…</> : 'Save Changes'}
      </button>
    </form>
  );
}
