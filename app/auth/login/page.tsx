import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { Gem } from 'lucide-react';
import LoginForm from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your AurimGold Investments account.',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0d1b2a] flex flex-col">
      {/* Header */}
      <div className="p-6">
        <Link href="/" className="inline-flex items-center gap-2 text-white hover:opacity-80 transition-opacity">
          <Gem className="text-[#c9a84c]" size={24} />
          <span className="font-bold text-lg" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            AurimGold <span className="text-[#c9a84c]">Investments</span>
          </span>
        </Link>
      </div>

      {/* Main */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-[#162336] rounded-2xl border border-[#c9a84c]/20 p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h1
                className="text-3xl font-bold text-white mb-2"
                style={{ fontFamily: 'var(--font-playfair), serif' }}
              >
                Welcome back
              </h1>
              <p className="text-white/50 text-sm">Sign in to your investment account</p>
            </div>

            <Suspense fallback={<div className="h-40 animate-pulse bg-white/5 rounded-xl" />}>
              <LoginForm />
            </Suspense>

            <p className="text-center text-sm text-white/40 mt-6">
              Don&apos;t have an account?{' '}
              <Link href="/auth/signup" className="text-[#c9a84c] hover:underline font-medium">
                Create one free
              </Link>
            </p>
          </div>

          {/* Demo hint */}
          <div className="mt-4 text-center">
            <p className="text-white/30 text-xs">
              Demo account: <span className="text-[#c9a84c]/60">demo@aurimgold.com</span> / <span className="text-[#c9a84c]/60">demo123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
