import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { db } from '@/lib/db';
import ProfileForm from '@/components/dashboard/ProfileForm';
import PasswordFormClient from '@/components/dashboard/PasswordFormClient';
import { Shield, CheckCircle, AlertCircle, Copy, User, Calendar, Globe } from 'lucide-react';

export const metadata: Metadata = { title: 'My Profile' };

export default async function ProfilePage() {
  const session = await getSessionUser();
  if (!session) redirect('/auth/login');

  const user = db.users.findById(session.userId)!;
  const memberDays = Math.floor((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-playfair), serif' }}>
          My Profile
        </h1>
        <p className="text-white/40 text-sm mt-1">Manage your personal information and account settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Avatar & Stats */}
        <div className="space-y-4">
          {/* Avatar Card */}
          <div className="bg-[#162336] border border-[#c9a84c]/10 rounded-2xl p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#a8852e] flex items-center justify-center mx-auto mb-4">
              <span className="text-[#0d1b2a] font-bold text-2xl" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <h2 className="text-white font-bold text-lg" style={{ fontFamily: 'var(--font-playfair), serif' }}>{user.name}</h2>
            <p className="text-white/40 text-sm mt-0.5">{user.email}</p>

            {/* KYC badge */}
            <div className={`inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-full text-xs font-semibold ${
              user.kycStatus === 'verified'
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-amber-500/20 text-amber-400'
            }`}>
              {user.kycStatus === 'verified'
                ? <><CheckCircle size={11} /> KYC Verified</>
                : <><AlertCircle size={11} /> KYC Pending</>
              }
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-[#162336] border border-[#c9a84c]/10 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-3">
              <Calendar size={15} className="text-[#c9a84c]/60" />
              <div>
                <p className="text-white/30 text-xs">Member since</p>
                <p className="text-white text-sm font-semibold">
                  {new Date(user.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <User size={15} className="text-[#c9a84c]/60" />
              <div>
                <p className="text-white/30 text-xs">Account age</p>
                <p className="text-white text-sm font-semibold">{memberDays} days</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Globe size={15} className="text-[#c9a84c]/60" />
              <div>
                <p className="text-white/30 text-xs">Country</p>
                <p className="text-white text-sm font-semibold">{user.country || '—'}</p>
              </div>
            </div>
          </div>

          {/* Referral Code */}
          <div className="bg-[#162336] border border-[#c9a84c]/20 rounded-2xl p-5">
            <p className="text-[#c9a84c] text-xs font-bold uppercase tracking-widest mb-3">Your Referral Code</p>
            <div className="flex items-center justify-between bg-[#0d1b2a] rounded-xl px-4 py-3">
              <span className="text-white font-bold tracking-widest text-sm">{user.referralCode}</span>
              <Copy size={14} className="text-white/30" />
            </div>
            <p className="text-white/25 text-xs mt-2">Share this code to earn referral bonuses.</p>
          </div>

          {/* Security Status */}
          <div className="bg-[#162336] border border-[#c9a84c]/10 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Shield size={15} className="text-[#c9a84c]" />
              <p className="text-white font-semibold text-sm">Security Status</p>
            </div>
            <div className="space-y-2.5">
              {[
                { label: 'Email verified', ok: true },
                { label: `KYC: ${user.kycStatus === 'verified' ? 'Verified' : 'Pending review'}`, ok: user.kycStatus === 'verified' },
                { label: 'Gold vault insured', ok: true },
                { label: '2FA', ok: false },
              ].map(({ label, ok }) => (
                <div key={label} className="flex items-center gap-2 text-xs">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${ok ? 'bg-emerald-400' : 'bg-white/20'}`} />
                  <span className={ok ? 'text-white/50' : 'text-white/25'}>{label}</span>
                  {!ok && <span className="text-white/20 ml-auto">Coming soon</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Edit Forms */}
        <div className="lg:col-span-2 space-y-4">
          {/* Personal Info */}
          <div className="bg-[#162336] border border-[#c9a84c]/10 rounded-2xl p-6">
            <h2 className="text-white font-bold text-lg mb-1" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              Personal Information
            </h2>
            <p className="text-white/30 text-sm mb-6">Update your name, phone, and country.</p>
            <ProfileForm
              initialName={user.name}
              initialPhone={user.phone}
              initialCountry={user.country}
            />
          </div>

          {/* Password Change */}
          <div className="bg-[#162336] border border-[#c9a84c]/10 rounded-2xl p-6">
            <h2 className="text-white font-bold text-lg mb-1" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              Change Password
            </h2>
            <p className="text-white/30 text-sm mb-6">For your security, use a strong, unique password.</p>
            <PasswordFormClient />
          </div>
        </div>
      </div>
    </div>
  );
}
