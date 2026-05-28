import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { plans } from '@/lib/plans';
import Badge from '@/components/ui/Badge';

export default function PlansPreview() {
  return (
    <section className="bg-[#faf8f4] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2
            className="font-playfair text-3xl md:text-4xl font-bold text-[#0d1b2a] mb-4"
            style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
          >
            Investment Plans
          </h2>
          <p className="text-[#2e3d52] text-lg max-w-xl mx-auto">
            Choose the plan that fits your investment horizon and goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.slug}
              className={`relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${
                plan.highlighted
                  ? 'bg-[#0d1b2a] text-white shadow-[0_8px_40px_rgba(201,168,76,0.2)] border-2 border-[#c9a84c]'
                  : 'bg-white shadow-md border border-[#f0ece3] hover:shadow-xl'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge variant="gold">{plan.badge}</Badge>
                </div>
              )}

              <h3
                className={`font-playfair text-2xl font-bold mb-1 ${
                  plan.highlighted ? 'text-[#c9a84c]' : 'text-[#0d1b2a]'
                }`}
                style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
              >
                {plan.name}
              </h3>
              <p
                className={`text-sm mb-6 ${
                  plan.highlighted ? 'text-white/50' : 'text-[#2e3d52]'
                }`}
              >
                From ${plan.minInvestment.toLocaleString()}
                {plan.maxInvestment
                  ? ` – $${plan.maxInvestment.toLocaleString()}`
                  : '+'}
              </p>

              <div className="flex items-end gap-1 mb-1">
                <span
                  className={`font-playfair text-5xl font-bold ${
                    plan.highlighted ? 'text-[#c9a84c]' : 'text-[#0d1b2a]'
                  }`}
                  style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
                >
                  {plan.dailyReturn}%
                </span>
              </div>
              <p
                className={`text-sm mb-2 ${
                  plan.highlighted ? 'text-white/50' : 'text-[#2e3d52]'
                }`}
              >
                daily return*
              </p>
              <p
                className={`text-xs mb-8 ${
                  plan.highlighted ? 'text-[#c9a84c]/60' : 'text-[#2e3d52]/60'
                }`}
              >
                {plan.period}-month investment period ({plan.days} days)
              </p>

              <ul className="space-y-2.5 mb-8">
                {plan.features.slice(0, 4).map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <Check
                      size={15}
                      className="flex-shrink-0 text-[#c9a84c]"
                    />
                    <span className={plan.highlighted ? 'text-white/70' : 'text-[#2e3d52]'}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/auth/signup?plan=${plan.slug}`}
                className={`block w-full text-center py-3.5 rounded-xl font-bold transition-all duration-300 hover:-translate-y-0.5 ${
                  plan.highlighted
                    ? 'bg-[#c9a84c] hover:bg-[#a8852e] text-[#0d1b2a]'
                    : 'border-2 border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#0d1b2a]'
                }`}
              >
                Choose {plan.name}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-[#2e3d52]/50 mb-8">
          * Subject to market conditions. Past performance does not guarantee future results.
        </p>

        <div className="text-center">
          <Link
            href="/plans"
            className="inline-flex items-center gap-2 text-[#0d1b2a] font-semibold hover:text-[#c9a84c] hover:gap-3 transition-all duration-300"
          >
            View All Plans & Compare <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
