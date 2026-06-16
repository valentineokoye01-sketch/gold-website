import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import DashboardInvestButton from '@/components/dashboard/DashboardInvestButton';
import { plans } from '@/lib/plans';
import { Check } from 'lucide-react';

export const metadata: Metadata = { title: 'Invest More' };

export default async function InvestPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth/login');

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-playfair), serif' }}>
          Invest More
        </h1>
        <p className="text-white/40 text-sm mt-1">Choose a plan and grow your gold portfolio.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {plans.map(plan => (
          <div key={plan.slug} className={`relative rounded-2xl p-6 border-2 flex flex-col ${plan.highlighted ? 'bg-[#0d1b2a] border-[#c9a84c] shadow-[0_8px_40px_rgba(201,168,76,0.2)]' : 'bg-[#162336] border-[#c9a84c]/20'}`}>
            {plan.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c9a84c] text-[#0d1b2a] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                {plan.badge}
              </span>
            )}
            <h3 className={`font-bold text-xl mb-1 ${plan.highlighted ? 'text-[#c9a84c]' : 'text-white'}`} style={{ fontFamily: 'var(--font-playfair), serif' }}>
              {plan.name}
            </h3>
            <p className="text-white/40 text-sm mb-4">
              ${plan.minInvestment.toLocaleString()}{plan.maxInvestment ? ` – $${plan.maxInvestment.toLocaleString()}` : '+'}
            </p>
            <div className="mb-1">
              <span className="text-5xl font-bold text-[#c9a84c]" style={{ fontFamily: 'var(--font-playfair), serif' }}>{plan.dailyReturn}%</span>
              <span className="text-white/40 text-sm ml-1">/day</span>
            </div>
            <p className="text-white/30 text-xs mb-5">{plan.period} months · {plan.days} days</p>
            <ul className="space-y-2 mb-6 flex-1">
              {plan.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Check size={14} className="text-[#c9a84c] flex-shrink-0" />
                  <span className={plan.highlighted ? 'text-white/70' : 'text-white/50'}>{f}</span>
                </li>
              ))}
            </ul>
            <DashboardInvestButton label={`Start ${plan.name}`} defaultPlan={plan.slug} className="w-full justify-center" />
          </div>
        ))}
      </div>

      <p className="text-white/20 text-xs text-center">
        * Daily returns are based on simple interest. Subject to market conditions. Returns are not guaranteed.
      </p>
    </div>
  );
}
