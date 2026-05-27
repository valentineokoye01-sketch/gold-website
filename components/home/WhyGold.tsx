import { TrendingUp, Gem, Globe, DollarSign, Package, Lock } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';

const reasons = [
  {
    icon: TrendingUp,
    title: 'Inflation Hedge',
    desc: 'Gold has historically preserved purchasing power over centuries, outperforming cash during inflationary periods.',
  },
  {
    icon: Gem,
    title: 'Tangible Asset',
    desc: 'Unlike digital assets or equities, physical gold carries intrinsic value with no counterparty risk.',
  },
  {
    icon: Globe,
    title: 'Global Value',
    desc: 'Gold is recognised and traded in every market on earth — the ultimate borderless store of wealth.',
  },
  {
    icon: DollarSign,
    title: 'Passive Returns',
    desc: 'Through AuraGold, your allocated gold generates 2–4% monthly returns via institutional trading strategies.',
  },
  {
    icon: Package,
    title: 'Physical Delivery',
    desc: 'You can withdraw your investment as physical gold bars, shipped insured to your door in 50+ countries.',
  },
  {
    icon: Lock,
    title: 'Secure Vault Storage',
    desc: 'Your gold rests in LBMA-certified vaults — insured at full value, independently audited every quarter.',
  },
];

export default function WhyGold() {
  return (
    <section className="bg-[#faf8f4] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2
            className="font-playfair text-3xl md:text-4xl font-bold text-[#0d1b2a] mb-4"
            style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
          >
            Why Choose Gold?
          </h2>
          <p className="text-[#2e3d52] text-lg max-w-2xl mx-auto">
            Gold has been humanity&apos;s most trusted store of value for 5,000 years. Here&apos;s why
            it belongs in your portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map(({ icon: Icon, title, desc }, i) => (
            <FadeIn key={title} delay={i * 80}>
              <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-[#f0ece3]">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#c9a84c]/10 mb-4">
                  <Icon className="text-[#c9a84c]" size={22} />
                </div>
                <h3 className="font-bold text-lg text-[#0d1b2a] mb-2">{title}</h3>
                <p className="text-[#2e3d52] text-sm leading-relaxed">{desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
