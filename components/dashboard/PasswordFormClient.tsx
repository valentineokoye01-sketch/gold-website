'use client';

import { useState } from 'react';
import { CheckCircle, Loader2, Eye, EyeOff } from 'lucide-react';

export default function PasswordFormClient() {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!current) { setError('Enter your current password.'); return; }
    if (next.length < 6) { setError('New password must be at least 6 characters.'); return; }
    if (next !== confirm) { setError('Passwords do not match.'); return; }

    setLoading(true);
    try {
      const res = await fetch('/api/user/password', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: current, newPassword: next }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Password change failed');
      setSaved(true);
      setCurrent(''); setNext(''); setConfirm('');
      setTimeout(() => setSaved(false), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">Current Password</label>
        <div className="relative">
          <input
            type={showCurrent ? 'text' : 'password'}
            value={current}
            onChange={e => setCurrent(e.target.value)}
            className="w-full bg-[#0d1b2a] border border-[#c9a84c]/20 text-white rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:border-[#c9a84c]/60 transition-colors"
          />
          <button type="button" onClick={() => setShowCurrent(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
            {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">New Password</label>
          <div className="relative">
            <input
              type={showNext ? 'text' : 'password'}
              value={next}
              onChange={e => setNext(e.target.value)}
              className="w-full bg-[#0d1b2a] border border-[#c9a84c]/20 text-white rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:border-[#c9a84c]/60 transition-colors"
            />
            <button type="button" onClick={() => setShowNext(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
              {showNext ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">Confirm New Password</label>
          <input
            type="password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            className="w-full bg-[#0d1b2a] border border-[#c9a84c]/20 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/60 transition-colors"
          />
        </div>
      </div>

      {error && (
        <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>
      )}
      {saved && (
        <div className="flex items-center gap-2 text-emerald-400 text-sm bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
          <CheckCircle size={15} /> Password changed successfully.
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-[#c9a84c] hover:bg-[#a8852e] disabled:opacity-60 text-[#0d1b2a] font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2 text-sm"
      >
        {loading ? <><Loader2 size={15} className="animate-spin" /> Updating…</> : 'Update Password'}
      </button>
    </form>
  );
}
