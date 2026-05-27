import type { Metadata } from 'next';
import Link from 'next/link';
import { UserPlus, BarChart2, CreditCard, TrendingUp, Shield, Lock, Search, ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import FadeIn from '@/components/ui/FadeIn';
import Accordion from '@/components/ui/Accordion';

export const metadata: Metadata = {
  title: 'How It Works',
  description:
    'Learn how AurimGold works: create your account, choose a plan, make a payment, and earn 2–4% monthly gold returns. Simple, transparent, and profitable.',
  alternates: { canonical: '/how-it-works' },
  openGraph: {
    title: 'How AurimGold Works',
    description: 'Four simple steps to own physical gold and earn monthly returns.',
  },
};

const steps = [
  {
    icon: UserPlus,
    step: '01',
    title: 'Create Your Free Account',
    body: 'Getting started takes less than five minutes. Register with your email address, create a secure password, and complete our streamlined identity verification process. We require a government-issued photo ID and a recent proof of address — the same documents required by any regulated financial institution. Once approved (typically within 24–48 hours), your investor dashboard is activated and ready.',
    bullets: [
      'Email registration with two-factor authentication',
      'GDPR-compliant identity verification',
      'Secure investor portal with real-time allocation view',
      'No account setup fees',
    ],
    side: 'left',
  },
  {
    icon: BarChart2,
    step: '02',
    title: 'Choose Your Investment Plan',
    body: 'AurimGold offers three investment tiers designed to match different capital levels and time horizons. The Starter plan is ideal for first-time gold investors and those testing the platform. Growth offers a compelling 3% monthly return for mid-range investors. Premium is built for serious wealth builders seeking maximum returns with dedicated support.',
    bullets: [
      'Starter: $500–$4,999 · 2% monthly · 3-month period',
      'Growth: $5,000–$24,999 · 3% monthly · 6-month period',
      'Premium: $25,000+ · 4% monthly · 12-month period',
      'Multiple plans can run concurrently',
    ],
    side: 'right',
    link: { href: '/plans', label: 'Compare All Plans' },
  },
  {
    icon: CreditCard,
    step: '03',
    title: 'Make Your Payment',
    body: 'Fund your investment via cryptocurrency (BTC, ETH, USDT) or international bank wire transfer. Crypto payments are typically confirmed within hours. Bank transfers are matched and activated within 1–3 business days after receipt. All transactions are secured with bank-grade encryption. Once your payment is confirmed, gold is allocated to your account at the prevailing spot price.',
    bullets: [
      'Accepted: Bitcoin, Ethereum, USDT (TRC-20 / ERC-20)',
      'Bank wire supported from 80+ countries in 5+ currencies',
      'Secure wallet addresses unique per investor per transaction',
      'Instant email confirmation upon payment receipt',
    ],
    side: 'left',
    link: { href: '/payments', label: 'View Payment Methods' },
  },
  {
    icon: TrendingUp,
    step: '04',
    title: 'Earn Returns & Withdraw',
    body: 'From the moment your gold is allocated, your returns begin to accrue at your plan\'s monthly rate, subject to market conditions. At the end of your investment period, your full principal plus accumulated profit becomes available for withdrawal. Choose to receive physical gold bars shipped insured to your door, or request a direct bank transfer in your preferred currency.',
    bullets: [
      'Returns accumulate monthly throughout the investment period',
      'Withdraw as physical gold delivery (50+ countries) or bank transfer',
      'Gold shipment: 7–21 business days, fully insured',
      'Bank transfer: 3–5 business days, locked at spot rate',
    ],
    side: 'right',
    link: { href: '/withdraw', label: 'Withdrawal Options' },
  },
];

const faqTeaser = [
  {
    question: 'Is AurimGold regulated?',
    answer: 'Yes. AurimGold holds valid financial services licences in each jurisdiction it operates and undergoes quarterly independent audits. All investor gold is held in LBMA-certified vaults, insured at full value through Lloyd\'s of London.',
  },
  {
    question: 'Can I withdraw before my plan ends?',
    answer: 'Early withdrawal is available exclusively to Premium plan holders, subject to a 1% early exit fee. Starter and Growth plan investors must wait until the plan matures to preserve the targeted returns for all investors.',
  },
  {
    question: 'What if I want to reinvest at the end of my plan?',
    answer: 'At maturity, you can roll your full payout (principal + profit) into a new plan — or a higher tier if your balance qualifies. Many investors compound their returns this way, growing their gold allocation each period.',
  },
];

export default function HowItWorksPage() {
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
              Simple.{' '}
              <span className="text-[#c9a84c]">Transparent.</span>
              <br />
              Profitable.
            </h1>
            <p className="text-white/60 text-xl leading-relaxed">
              Four straightforward steps stand between you and physical gold-backed monthly returns.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-[#faf8f4] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {steps.map(({ icon: Icon, step, title, body, bullets, side, link }, i) => (
            <FadeIn key={step} delay={i * 50}>
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${
                  side === 'right' ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Text side */}
                <div className={side === 'right' ? 'lg:order-2' : ''}>
                  <span className="text-[#c9a84c]/40 text-xs font-bold uppercase tracking-widest block mb-3">
                    Step {step}
                  </span>
                  <h2
                    className="font-playfair text-3xl md:text-4xl font-bold text-[#0d1b2a] mb-5"
                    style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
                  >
                    {title}
                  </h2>
                  <p className="text-[#2e3d52] text-lg leading-relaxed mb-6">{body}</p>
                  <ul className="space-y-2.5 mb-6">
                    {bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-[#2e3d52]">
                        <span className="mt-0.5 w-4 h-4 flex-shrink-0 flex items-center justify-center rounded-full bg-[#c9a84c]/15">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  {link && (
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-2 text-[#c9a84c] font-semibold hover:gap-3 transition-all duration-300"
                    >
                      {link.label} <ArrowRight size={16} />
                    </Link>
                  )}
                </div>

                {/* Visual side */}
                <div className={side === 'right' ? 'lg:order-1' : ''}>
                  <div className="bg-[#0d1b2a] rounded-2xl p-12 flex items-center justify-center border border-[#c9a84c]/20 aspect-square max-w-sm mx-auto">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto flex items-center justify-center rounded-full bg-[#c9a84c]/10 border-2 border-[#c9a84c]/30 mb-6">
                        <Icon className="text-[#c9a84c]" size={42} />
                      </div>
                      <span
                        className="font-playfair text-6xl font-bold text-[#c9a84c]/20"
                        style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
                      >
                        {step}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[#0d1b2a] py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading
              title="Investment Timeline"
              subtitle="Here's what your investment journey looks like from start to finish."
              centered
              light
              className="mb-14"
            />
          </FadeIn>
          <FadeIn delay={100}>
            <div className="relative">
              <div className="absolute top-6 left-0 right-0 h-0.5 bg-[#c9a84c]/20 hidden md:block" />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: 'Invest', desc: 'Fund your chosen plan via crypto or bank transfer' },
                  { label: 'Monthly Returns', desc: 'Returns accrue each month at your plan rate' },
                  { label: 'Period Ends', desc: 'Your plan matures — principal + profit unlocked' },
                  { label: 'Withdraw', desc: 'Receive gold shipment or bank transfer within days' },
                ].map(({ label, desc }, i) => (
                  <div key={label} className="text-center relative">
                    <div className="w-12 h-12 mx-auto rounded-full bg-[#c9a84c] flex items-center justify-center text-[#0d1b2a] font-bold text-lg mb-4 relative z-10">
                      {i + 1}
                    </div>
                    <h4 className="text-[#c9a84c] font-bold text-sm uppercase tracking-widest mb-2">
                      {label}
                    </h4>
                    <p className="text-white/40 text-xs leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Security */}
      <section className="bg-[#faf8f4] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <FadeIn direction="left">
              <SectionHeading
                title="Your Gold is Safe"
                subtitle="Security is not an afterthought at AurimGold — it is the foundation of everything we do."
                className="mb-8"
              />
              <div className="space-y-5">
                {[
                  { icon: Lock, text: 'LBMA-certified vault storage in London, Zurich, and Singapore' },
                  { icon: Shield, text: 'Full insurance coverage through Lloyd\'s of London' },
                  { icon: Search, text: 'Independent quarterly audits by a Big Four accounting firm' },
                  { icon: UserPlus, text: 'Gold allocated in your name and visible in your investor portal' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-3">
                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg bg-[#c9a84c]/10">
                      <Icon className="text-[#c9a84c]" size={16} />
                    </div>
                    <p className="text-[#2e3d52] text-base pt-1">{text}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn direction="right">
              <div className="bg-[#0d1b2a] rounded-2xl p-8 border border-[#c9a84c]/20">
                <p className="text-[#c9a84c] text-xs uppercase tracking-widest font-bold mb-4">
                  Security at a Glance
                </p>
                {[
                  ['Vault Certification', 'LBMA-Approved'],
                  ['Insurance Provider', "Lloyd's of London"],
                  ['Audit Frequency', 'Quarterly'],
                  ['Audit Firm', 'Big Four Accounting'],
                  ['Gold Purity', '99.5%+ Fine Gold'],
                  ['Segregation', 'Allocated (Your Name)'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-3 border-b border-[#c9a84c]/10">
                    <span className="text-white/40 text-sm">{k}</span>
                    <span className="text-white font-semibold text-sm">{v}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="bg-[#0d1b2a] py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading
              title="Common Questions"
              centered
              light
              className="mb-10"
            />
          </FadeIn>
          <FadeIn delay={100}>
            <Accordion items={faqTeaser} dark />
          </FadeIn>
          <FadeIn delay={200}>
            <div className="text-center mt-10">
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 text-[#c9a84c] font-semibold hover:gap-3 transition-all duration-300"
              >
                See All FAQs <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
