import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, X } from 'lucide-react';
import { plans } from '@/lib/plans';
import SectionHeading from '@/components/ui/SectionHeading';
import Badge from '@/components/ui/Badge';
import FadeIn from '@/components/ui/FadeIn';

export const metadata: Metadata = {
  title: 'Investment Plans',
  description:
    'Choose from AurimGold\'s Starter, Growth, or Premium gold investment plans. Earn 2–4% daily returns from $500. Compare features and start today.',
  alternates: { canonical: '/plans' },
  openGraph: {
    title: 'AurimGold Investment Plans — Starter, Growth & Premium',
    description: 'Compare gold investment plans and earn 2–4% daily returns from $500.',
  },
};

const tableRows = [
  { feature: 'Minimum Investment', starter: '$500', growth: '$5,000', premium: '$25,000' },
  { feature: 'Daily Return', starter: '2%/day', growth: '3%/day', premium: '4%/day' },
  { feature: 'Investment Period', starter: '3 months (90 days)', growth: '6 months (180 days)', premium: '12 months (360 days)' },
  { feature: 'Payment Methods', starter: 'Crypto, Bank', growth: 'Crypto, Bank', premium: 'Crypto, Bank' },
  { feature: 'Withdrawal Options', starter: 'Gold / Cash', growth: 'Gold / Cash', premium: 'Gold / Cash' },
  { feature: 'Support', starter: 'Email', growth: 'Priority', premium: 'Dedicated Manager' },
  { feature: 'Gold Shipment Insurance', starter: 'Standard', growth: 'Standard', premium: 'Premium' },
  { feature: 'Early Withdrawal', starter: false, growth: false, premium: true },
];

// ROI scenarios using simple daily interest: profit = principal × (rate/100) × days
const roiScenarios = [
  { principal: 1000,  rate: 2, days: 90,  period: '3 months',  plan: 'Starter'  },
  { principal: 5000,  rate: 3, days: 180, period: '6 months',  plan: 'Growth'   },
  { principal: 25000, rate: 4, days: 360, period: '12 months', plan: 'Premium'  },
];

export default function PlansPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0d1b2a] pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1
              className="font-playfair text-4xl md:text-6xl font-bold text-white mb-6"
              style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
            >
              Choose the Plan That{' '}
              <span className="text-[#c9a84c]">Works for You</span>
            </h1>
            <p className="text-white/60 text-xl">
              Three gold investment tiers. One goal: grow your wealth with physical gold.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Plan Cards */}
      <section className="bg-[#faf8f4] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {plans.map((plan) => (
              <FadeIn key={plan.slug}>
                <div
                  className={`relative rounded-2xl p-8 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                    plan.highlighted
                      ? 'bg-[#0d1b2a] text-white shadow-[0_12px_50px_rgba(201,168,76,0.25)] border-2 border-[#c9a84c] scale-[1.02]'
                      : 'bg-white shadow-md border border-[#f0ece3] hover:shadow-xl'
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge variant="gold">{plan.badge}</Badge>
                    </div>
                  )}
                  <div className="mb-6">
                    <h2
                      className={`font-playfair text-3xl font-bold mb-1 ${
                        plan.highlighted ? 'text-[#c9a84c]' : 'text-[#0d1b2a]'
                      }`}
                      style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
                    >
                      {plan.name}
                    </h2>
                    <p className={`text-sm ${plan.highlighted ? 'text-white/50' : 'text-[#2e3d52]'}`}>
                      From ${plan.minInvestment.toLocaleString()}
                      {plan.maxInvestment ? ` to $${plan.maxInvestment.toLocaleString()}` : ' and above'}
                    </p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-end gap-1">
                      <span
                        className={`font-playfair text-6xl font-bold ${
                          plan.highlighted ? 'text-[#c9a84c]' : 'text-[#0d1b2a]'
                        }`}
                        style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
                      >
                        {plan.dailyReturn}%
                      </span>
                      <span className={`text-sm mb-3 ${plan.highlighted ? 'text-white/50' : 'text-[#2e3d52]'}`}>
                        /day*
                      </span>
                    </div>
                    <p className={`text-sm ${plan.highlighted ? 'text-[#c9a84c]/60' : 'text-[#2e3d52]/60'}`}>
                      Over {plan.period} months ({plan.days} days)
                    </p>
                  </div>

                  <ul className="flex-1 space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <Check size={16} className="flex-shrink-0 text-[#c9a84c] mt-0.5" />
                        <span className={`text-sm ${plan.highlighted ? 'text-white/70' : 'text-[#2e3d52]'}`}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/auth/signup?plan=${plan.slug}`}
                    className={`block w-full text-center py-4 rounded-xl font-bold text-base transition-all duration-300 hover:-translate-y-0.5 ${
                      plan.highlighted
                        ? 'bg-[#c9a84c] hover:bg-[#a8852e] text-[#0d1b2a]'
                        : 'border-2 border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#0d1b2a]'
                    }`}
                  >
                    Start {plan.name} Plan
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
          <p className="text-center text-xs text-[#2e3d52]/50">
            * Subject to market conditions. Returns are not guaranteed. Please review our Risk Disclosure before investing.
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-[#0d1b2a] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading
              title="Plan Comparison"
              centered
              light
              className="mb-12"
            />
          </FadeIn>
          <FadeIn delay={100}>
            <div className="overflow-x-auto rounded-2xl border border-[#c9a84c]/20">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="bg-[#162336]">
                    <th className="text-left px-6 py-4 text-white/50 text-sm font-semibold uppercase tracking-widest">
                      Feature
                    </th>
                    {plans.map((p) => (
                      <th key={p.slug} className="px-6 py-4 text-center">
                        <span
                          className={`font-playfair text-lg font-bold ${
                            p.highlighted ? 'text-[#c9a84c]' : 'text-white'
                          }`}
                          style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
                        >
                          {p.name}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={`border-t border-[#c9a84c]/10 ${
                        i % 2 === 0 ? 'bg-[#0d1b2a]' : 'bg-[#162336]/40'
                      }`}
                    >
                      <td className="px-6 py-4 text-white/50 text-sm">{row.feature}</td>
                      {(['starter', 'growth', 'premium'] as const).map((slug) => {
                        const val = row[slug];
                        return (
                          <td key={slug} className="px-6 py-4 text-center">
                            {typeof val === 'boolean' ? (
                              val ? (
                                <Check size={18} className="text-emerald-400 mx-auto" />
                              ) : (
                                <X size={18} className="text-red-400/60 mx-auto" />
                              )
                            ) : (
                              <span
                                className={`text-sm font-semibold ${
                                  slug === 'growth' ? 'text-[#c9a84c]' : 'text-white'
                                }`}
                              >
                                {val}
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ROI Scenarios */}
      <section className="bg-[#faf8f4] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading
              title="Return Scenarios"
              subtitle="Illustrative projections based on current daily plan rates, subject to market conditions."
              centered
              className="mb-12"
            />
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {roiScenarios.map(({ principal, rate, days, period, plan }, i) => {
              const profit = principal * (rate / 100) * days;
              const total = principal + profit;
              return (
                <FadeIn key={plan} delay={i * 100}>
                  <div className="bg-white rounded-2xl p-7 shadow-md border border-[#f0ece3] text-center">
                    <p className="text-[#c9a84c] text-xs uppercase tracking-widest font-bold mb-3">
                      {plan} Plan
                    </p>
                    <p className="text-[#2e3d52] text-sm mb-4">
                      ${principal.toLocaleString()} · {rate}%/day · {period} ({days} days)
                    </p>
                    <div className="my-4 py-4 border-y border-[#f0ece3]">
                      <p className="text-[#2e3d52]/60 text-xs mb-1">Total Profit</p>
                      <p
                        className="font-playfair text-3xl font-bold text-[#c9a84c]"
                        style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
                      >
                        +${profit.toLocaleString()}
                      </p>
                    </div>
                    <p className="text-[#0d1b2a] font-bold text-lg">
                      ${total.toLocaleString()} total
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
          <FadeIn delay={300}>
            <div className="text-center">
              <Link
                href="/calculator"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#0d1b2a] hover:bg-[#162336] text-[#c9a84c] font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5 border border-[#c9a84c]/30"
              >
                Use the Full Calculator →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0d1b2a] py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-white/60 text-lg mb-3">Not sure which plan is right for you?</p>
          <h3
            className="font-playfair text-3xl font-bold text-white mb-6"
            style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
          >
            Talk to Our Investment Advisors
          </h3>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#c9a84c] hover:bg-[#a8852e] text-[#0d1b2a] font-bold text-lg rounded-xl transition-all duration-300 hover:-translate-y-0.5 btn-shimmer"
          >
            Contact an Advisor
          </Link>
        </div>
      </section>
    </>
  );
}
