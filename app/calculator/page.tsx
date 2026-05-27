import type { Metadata } from 'next';
import SectionHeading from '@/components/ui/SectionHeading';
import FadeIn from '@/components/ui/FadeIn';
import ROICalculator from '@/components/calculator/ROICalculator';

export const metadata: Metadata = {
  title: 'ROI Calculator',
  description:
    'Calculate your projected gold investment returns with AuraGold\'s ROI calculator. Enter your amount, choose a plan, and see your estimated payout instantly.',
  alternates: { canonical: '/calculator' },
  openGraph: {
    title: 'Gold Returns Calculator — AuraGold Investments',
    description: 'Calculate your projected 2–4% monthly returns on physical gold investment.',
  },
};

const examples = [
  {
    name: 'Sarah K.',
    flag: '🇬🇧',
    country: 'United Kingdom',
    plan: 'Growth Plan',
    invested: '$2,000',
    profit: '$360',
    period: '6 months',
    desc: 'Sarah invested $2,000 in the Growth plan. At 3% monthly over 6 months, her total profit was $360 — a total payout of $2,360.',
  },
  {
    name: 'Marcus T.',
    flag: '🇦🇪',
    country: 'United Arab Emirates',
    plan: 'Growth Plan',
    invested: '$10,000',
    profit: '$1,800',
    period: '6 months',
    desc: 'Marcus invested $10,000 in the Growth plan. His 3% monthly return over 6 months generated $1,800 profit — total payout of $11,800.',
  },
  {
    name: 'Lin W.',
    flag: '🇸🇬',
    country: 'Singapore',
    plan: 'Premium Plan',
    invested: '$25,000',
    profit: '$12,000',
    period: '12 months',
    desc: 'Lin invested $25,000 in the Premium plan. At 4% monthly over 12 months, her total profit was $12,000 — total payout of $37,000.',
  },
];

export default function CalculatorPage() {
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
              Calculate Your{' '}
              <span className="text-[#c9a84c]">Gold Returns</span>
            </h1>
            <p className="text-white/60 text-xl">
              Enter your investment amount, select a plan, and see your projected payout instantly.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Calculator */}
      <section className="bg-[#faf8f4] py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <ROICalculator />
          </FadeIn>
        </div>
      </section>

      {/* Example Cards */}
      <section className="bg-[#0d1b2a] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading
              title="Real Investor Examples"
              subtitle="Illustrative projections based on confirmed plan rates."
              centered
              light
              className="mb-12"
            />
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {examples.map((ex, i) => (
              <FadeIn key={ex.name} delay={i * 100}>
                <div className="bg-[#162336] rounded-2xl p-7 border border-[#c9a84c]/15 hover:border-[#c9a84c]/30 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-3xl">{ex.flag}</span>
                    <div>
                      <p className="text-white font-bold">{ex.name}</p>
                      <p className="text-white/40 text-xs">{ex.country}</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    {[
                      ['Plan', ex.plan],
                      ['Invested', ex.invested],
                      ['Period', ex.period],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between text-sm py-1.5 border-b border-[#c9a84c]/10">
                        <span className="text-white/40">{k}</span>
                        <span className="text-white font-semibold">{v}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-[#c9a84c]/10 rounded-xl px-4 py-3 text-center">
                    <p className="text-white/50 text-xs mb-0.5">Total Profit</p>
                    <p
                      className="font-playfair text-2xl font-bold text-[#c9a84c]"
                      style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
                    >
                      {ex.profit}
                    </p>
                  </div>
                  <p className="text-white/40 text-xs mt-4 leading-relaxed">{ex.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-[#faf8f4] py-10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-[#2e3d52]/50 text-sm leading-relaxed">
            Return projections are based on current plan rates and are illustrative only. Gold
            investment carries market risk. Returns are subject to market conditions and are not
            guaranteed. Past performance does not guarantee future results. Please review our Risk
            Disclosure before making any investment decision.
          </p>
        </div>
      </section>
    </>
  );
}
