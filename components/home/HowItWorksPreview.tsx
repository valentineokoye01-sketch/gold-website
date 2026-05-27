import Link from 'next/link';
import { UserPlus, BarChart2, CreditCard, TrendingUp, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    step: '01',
    title: 'Create Account',
    desc: 'Register in minutes with email verification and identity confirmation.',
  },
  {
    icon: BarChart2,
    step: '02',
    title: 'Choose Plan',
    desc: 'Select Starter, Growth, or Premium based on your investment goals.',
  },
  {
    icon: CreditCard,
    step: '03',
    title: 'Make Payment',
    desc: 'Fund via cryptocurrency or bank wire transfer in your preferred currency.',
  },
  {
    icon: TrendingUp,
    step: '04',
    title: 'Earn & Withdraw',
    desc: 'Accumulate 2–4% monthly returns and withdraw as gold or cash.',
  },
];

export default function HowItWorksPreview() {
  return (
    <section className="bg-[#0d1b2a] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2
            className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
          >
            How AuraGold Works
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Four simple steps stand between you and gold-backed returns.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map(({ icon: Icon, step, title, desc }, i) => (
            <div key={step} className="relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(50%+32px)] right-0 h-px bg-[#c9a84c]/20 z-0" />
              )}
              <div className="relative z-10 bg-[#162336] rounded-2xl p-6 border border-[#c9a84c]/10 text-center hover:border-[#c9a84c]/30 transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30">
                  <Icon className="text-[#c9a84c]" size={22} />
                </div>
                <span className="text-[#c9a84c]/40 text-xs font-bold tracking-widest uppercase block mb-2">
                  Step {step}
                </span>
                <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 text-[#c9a84c] font-semibold hover:gap-3 transition-all duration-300"
          >
            See Full Process <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
