import type { Metadata } from 'next';
import Image from 'next/image';
import { Shield, Target, Eye, Heart, Lock, Users, Gem } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import StatStrip from '@/components/ui/StatStrip';
import FadeIn from '@/components/ui/FadeIn';
import { team } from '@/lib/team';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about AuraGold Investments — our story, mission, leadership team, and commitment to regulated, transparent gold investment since 2018.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About AuraGold Investments',
    description: 'Our story, mission, and the team behind the world\'s most accessible gold investment platform.',
  },
};

const stats = [
  { value: '$50M+', label: 'Gold Under Management' },
  { value: '10,000+', label: 'Active Investors' },
  { value: '50+', label: 'Countries Served' },
  { value: '2018', label: 'Established' },
];

const values = [
  {
    icon: Eye,
    title: 'Transparency',
    desc: 'Every gram of gold we hold is independently audited. Investors can verify their allocations in real time through their secure portal.',
  },
  {
    icon: Lock,
    title: 'Security',
    desc: 'LBMA-certified vault storage, Lloyd\'s of London insurance, and military-grade digital security protect every investment.',
  },
  {
    icon: Users,
    title: 'Accessibility',
    desc: 'We broke down the barriers to gold ownership. Anyone with internet access and $500 can invest in certified physical gold.',
  },
  {
    icon: Heart,
    title: 'Integrity',
    desc: 'We operate with full regulatory compliance and never make promises we cannot keep. Risk disclosures are front and centre.',
  },
];

const partners = [
  'LBMA Vault Partner', 'Lloyd\'s Insurance', 'Swift Banking', 'Chainlink Oracle', 'Fireblocks Custody', 'Fiserv Processing',
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0d1b2a] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1
              className="font-playfair text-4xl md:text-6xl font-bold text-white mb-6 gold-underline inline-block"
              style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
            >
              Who We Are
            </h1>
            <p className="text-white/60 text-xl max-w-2xl mx-auto mt-8">
              AuraGold is on a mission to make institutional-grade gold investment accessible to every
              person on earth with an internet connection.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-[#faf8f4] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading title="Our Story" className="mb-10" />
          </FadeIn>
          <div className="space-y-6 text-[#2e3d52] text-lg leading-relaxed">
            <FadeIn delay={100}>
              <p>
                AuraGold was founded in 2018 by a team of commodities traders and fintech engineers
                who believed the same truth: the world&apos;s most proven store of value should not
                be restricted to banks, hedge funds, and the ultra-wealthy. Physical gold had a
                liquidity problem, a distribution problem, and an access problem. We set out to solve
                all three.
              </p>
            </FadeIn>
            <FadeIn delay={200}>
              <p>
                Our mission has always been to democratise gold — to make it as simple to invest in
                certified, vault-stored physical gold as it is to open a savings account. From day
                one, every bar we hold is allocated to specific investors, insured at full value, and
                audited quarterly by an independent Big Four accounting firm.
              </p>
            </FadeIn>
            <FadeIn delay={300}>
              <p>
                Today, AuraGold serves over 10,000 active investors across 50+ countries, managing
                more than $50M in physical gold. Our London, Dubai, and Singapore offices coordinate
                vault operations, investor support, and regulatory compliance across multiple
                jurisdictions — ensuring that wherever you are, your gold is safe, verified, and
                ready when you need it.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatStrip stats={stats} />

      {/* Mission & Vision */}
      <section className="bg-[#0d1b2a] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeIn direction="left">
              <div className="bg-[#162336] rounded-2xl p-8 border border-[#c9a84c]/20 h-full">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#c9a84c]/10 mb-6">
                  <Target className="text-[#c9a84c]" size={26} />
                </div>
                <h3
                  className="font-playfair text-2xl font-bold text-[#c9a84c] mb-4"
                  style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
                >
                  Our Mission
                </h3>
                <p className="text-white/60 leading-relaxed">
                  To make real gold investment accessible to anyone with an internet connection,
                  globally — breaking down barriers of wealth, geography, and financial complexity
                  that have kept physical gold out of reach for ordinary investors.
                </p>
              </div>
            </FadeIn>
            <FadeIn direction="right">
              <div className="bg-[#162336] rounded-2xl p-8 border border-[#c9a84c]/20 h-full">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#c9a84c]/10 mb-6">
                  <Eye className="text-[#c9a84c]" size={26} />
                </div>
                <h3
                  className="font-playfair text-2xl font-bold text-[#c9a84c] mb-4"
                  style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
                >
                  Our Vision
                </h3>
                <p className="text-white/60 leading-relaxed">
                  A world where gold&apos;s 5,000-year legacy as the ultimate store of value serves
                  not just the privileged few, but everyone — from a saver in Lagos to an investor in
                  Singapore, building generational wealth one troy ounce at a time.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-[#faf8f4] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading
              title="Our Core Values"
              subtitle="Every decision at AuraGold is guided by four principles."
              centered
              className="mb-14"
            />
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <FadeIn key={title} delay={i * 100}>
                <div className="bg-white rounded-2xl p-6 shadow-md border border-[#f0ece3] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 text-center h-full">
                  <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-[#c9a84c]/10 mb-4">
                    <Icon className="text-[#c9a84c]" size={22} />
                  </div>
                  <h3 className="font-bold text-[#0d1b2a] text-lg mb-3">{title}</h3>
                  <p className="text-[#2e3d52] text-sm leading-relaxed">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="bg-[#0d1b2a] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading
              title="Leadership Team"
              subtitle="The experienced professionals behind AuraGold."
              centered
              light
              className="mb-14"
            />
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <FadeIn key={member.name} delay={i * 100}>
                <div className="bg-[#162336] rounded-2xl overflow-hidden border border-[#c9a84c]/10 hover:border-[#c9a84c]/30 transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-52 bg-[#c9a84c]/10 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-[#c9a84c]/20 border-2 border-[#c9a84c]/40 flex items-center justify-center">
                      <Gem className="text-[#c9a84c]" size={32} />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-white text-base mb-0.5">{member.name}</h3>
                    <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-widest mb-3">
                      {member.title}
                    </p>
                    <p className="text-white/50 text-sm leading-relaxed line-clamp-4">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory & Compliance */}
      <section className="bg-[#faf8f4] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading
              title="Regulated & Compliant"
              subtitle="We operate under the highest standards of financial regulation."
              centered
              className="mb-14"
            />
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {[
              { icon: Shield, title: 'Licensed', desc: 'AuraGold operates under a valid financial services licence in each jurisdiction it serves, meeting all regulatory capital and operational requirements.' },
              { icon: Lock, title: 'Insured', desc: 'All investor gold holdings are insured at full replacement value through Lloyd\'s of London, covering theft, loss, and transit.' },
              { icon: Eye, title: 'Audited', desc: 'Independent quarterly audits by a Big Four accounting firm verify that every investor\'s allocated gold exists exactly as recorded.' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <FadeIn key={title} delay={i * 100}>
                <div className="bg-white rounded-2xl p-6 shadow-md border border-[#f0ece3] text-center">
                  <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 mb-5">
                    <Icon className="text-[#c9a84c]" size={26} />
                  </div>
                  <h3 className="font-bold text-[#0d1b2a] text-xl mb-3">{title}</h3>
                  <p className="text-[#2e3d52] text-sm leading-relaxed">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Partner Logos */}
          <FadeIn>
            <p className="text-center text-xs text-[#2e3d52]/50 uppercase tracking-widest font-semibold mb-6">
              Partners & Infrastructure
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {partners.map((p) => (
                <div
                  key={p}
                  className="px-6 py-3 rounded-xl border-2 border-[#c9a84c]/20 bg-white text-[#2e3d52] text-sm font-semibold"
                >
                  {p}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
