import type { Metadata } from 'next';
import { Package, CreditCard, CheckCircle, Clock, Shield } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import FadeIn from '@/components/ui/FadeIn';
import Accordion from '@/components/ui/Accordion';

export const metadata: Metadata = {
  title: 'Withdrawal Options',
  description:
    'Withdraw your AurimGold investment as physical gold delivery to 50+ countries or via direct bank transfer. Learn about fees, timelines, and the process.',
  alternates: { canonical: '/withdraw' },
  openGraph: {
    title: 'Withdrawal Options — AurimGold Investments',
    description: 'Physical gold delivery or bank transfer. Your gold, your way.',
  },
};

const withdrawalFaq = [
  {
    question: 'When can I submit a withdrawal request?',
    answer: 'Withdrawal requests can be submitted once your investment plan matures. Starter plans mature after 3 months, Growth after 6 months, and Premium after 12 months. Premium plan holders may also request early withdrawal, subject to a 1% exit fee. You have a 30-day window to request withdrawal after maturity.',
  },
  {
    question: 'Can I split my withdrawal between gold and cash?',
    answer: 'Yes. You may request a partial withdrawal in physical gold and receive the remaining balance via bank transfer. Contact our support team to arrange a split withdrawal, and ensure your total withdrawal meets the $500 minimum for each method.',
  },
  {
    question: 'What happens if my gold shipment is delayed or lost?',
    answer: 'All AurimGold gold shipments are fully insured from dispatch to delivery through Lloyd\'s of London. In the unlikely event of loss, damage, or significant delay (beyond 30 business days), we initiate a full insurance claim and process either a replacement shipment or bank transfer equivalent at no cost to you.',
  },
  {
    question: 'Which bank accounts can receive transfers?',
    answer: 'AurimGold supports bank transfers to accounts in USD, EUR, GBP, AED, and SGD. Transfers are sent via SWIFT international wire. Your account must be in your name as verified on your AurimGold account. Processing takes 3–5 business days from approval.',
  },
  {
    question: 'Are there taxes on my gold withdrawal?',
    answer: 'Tax obligations on gold proceeds vary by country and individual circumstances. AurimGold does not withhold taxes on behalf of investors. We recommend consulting a tax advisor in your jurisdiction regarding capital gains or wealth tax obligations related to gold investments.',
  },
];

const goldSteps = [
  { n: 1, title: 'Submit Request', desc: 'Log into your portal and submit a physical gold withdrawal request, specifying your delivery address.' },
  { n: 2, title: 'Identity Verified', desc: 'Our compliance team verifies your identity and delivery address before processing any shipment.' },
  { n: 3, title: 'Gold Allocated', desc: 'Your specific gold allocation is identified in the vault, bar serial numbers confirmed, and assay certificates prepared.' },
  { n: 4, title: 'Packaged & Insured', desc: 'Gold is packaged in tamper-evident containers, fully insured, and handed to our certified shipping partner.' },
  { n: 5, title: 'Shipped & Tracked', desc: 'Your shipment departs with full tracking. You receive your tracking number within 48 hours of dispatch.' },
];

const bankSteps = [
  { n: 1, title: 'Submit Request', desc: 'Request bank transfer via your investor portal. Provide your bank details including SWIFT/IBAN.' },
  { n: 2, title: 'Identity Verified', desc: 'We verify your identity and confirm the bank account is registered in your name.' },
  { n: 3, title: 'Spot Rate Locked', desc: 'Your gold is converted at the prevailing XAU/USD spot rate at the time of request — locked immediately.' },
  { n: 4, title: 'Transfer Initiated', desc: 'SWIFT international wire is initiated. Funds arrive in your account within 3–5 business days.' },
];

const timelineSteps = [
  'Request Submitted',
  'Identity Verified',
  'Gold Allocated',
  'Processing',
  'Completed',
];

export default function WithdrawPage() {
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
              Your Gold,{' '}
              <span className="text-[#c9a84c]">Your Way</span>
            </h1>
            <p className="text-white/60 text-xl leading-relaxed">
              At maturity, choose physical gold delivery to your door or a direct bank transfer.
              Fully insured. Globally accessible.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Withdrawal Options */}
      <section className="bg-[#faf8f4] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Gold Shipment */}
            <FadeIn direction="left">
              <div className="bg-white rounded-2xl shadow-md border border-[#f0ece3] p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#c9a84c]/10">
                    <Package className="text-[#c9a84c]" size={26} />
                  </div>
                  <div>
                    <h2
                      className="font-playfair text-2xl font-bold text-[#0d1b2a]"
                      style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
                    >
                      Physical Gold Delivery
                    </h2>
                    <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-widest">
                      7–21 Business Days
                    </p>
                  </div>
                </div>
                <div className="space-y-4 mb-6">
                  {goldSteps.map(({ n, title, desc }) => (
                    <div key={n} className="flex gap-4">
                      <div className="w-7 h-7 flex-shrink-0 rounded-full bg-[#c9a84c] flex items-center justify-center text-[#0d1b2a] font-bold text-sm mt-0.5">
                        {n}
                      </div>
                      <div>
                        <p className="font-semibold text-[#0d1b2a] text-sm">{title}</p>
                        <p className="text-[#2e3d52] text-sm leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-[#faf8f4] rounded-xl p-4 space-y-2 text-sm">
                  {[
                    '✓ Tamper-evident packaging',
                    '✓ Signature required on delivery',
                    '✓ Insured via Lloyd\'s of London',
                    '✓ 50+ countries served',
                    '✓ Tracking within 48h of dispatch',
                    '✓ Minimum: $500 equivalent',
                  ].map((t) => (
                    <p key={t} className="text-[#2e3d52]">{t}</p>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Bank Transfer */}
            <FadeIn direction="right">
              <div className="bg-[#0d1b2a] rounded-2xl border border-[#c9a84c]/20 p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#c9a84c]/10">
                    <CreditCard className="text-[#c9a84c]" size={26} />
                  </div>
                  <div>
                    <h2
                      className="font-playfair text-2xl font-bold text-white"
                      style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
                    >
                      Bank Transfer
                    </h2>
                    <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-widest">
                      3–5 Business Days
                    </p>
                  </div>
                </div>
                <div className="space-y-4 mb-6">
                  {bankSteps.map(({ n, title, desc }) => (
                    <div key={n} className="flex gap-4">
                      <div className="w-7 h-7 flex-shrink-0 rounded-full bg-[#c9a84c] flex items-center justify-center text-[#0d1b2a] font-bold text-sm mt-0.5">
                        {n}
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">{title}</p>
                        <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-[#162336] rounded-xl p-4 space-y-2 text-sm">
                  {[
                    '✓ Currencies: USD, EUR, GBP, AED, SGD',
                    '✓ Rate locked at time of request',
                    '✓ SWIFT wire transfer',
                    '✓ Minimum: $500',
                    '✓ Account must be in your name',
                  ].map((t) => (
                    <p key={t} className="text-white/60">{t}</p>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[#0d1b2a] py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading
              title="Withdrawal Timeline"
              centered
              light
              className="mb-14"
            />
          </FadeIn>
          <FadeIn delay={100}>
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-[#c9a84c]/20" />
              {timelineSteps.map((step, i) => (
                <div key={step} className="relative z-10 flex flex-col items-center text-center flex-1">
                  <div className="w-12 h-12 rounded-full bg-[#c9a84c] flex items-center justify-center text-[#0d1b2a] font-bold mb-3">
                    {i === timelineSteps.length - 1 ? (
                      <CheckCircle size={20} />
                    ) : (
                      <span>{i + 1}</span>
                    )}
                  </div>
                  <p className="text-white text-sm font-semibold">{step}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Fees Table */}
      <section className="bg-[#faf8f4] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading title="Fees & Processing" className="mb-10" />
          </FadeIn>
          <FadeIn delay={100}>
            <div className="overflow-x-auto rounded-2xl border border-[#c9a84c]/20">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#0d1b2a]">
                    {['Method', 'Processing Fee', 'Minimum', 'Timeline'].map((h) => (
                      <th key={h} className="px-6 py-4 text-[#c9a84c]/60 text-xs uppercase tracking-widest text-left font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-[#c9a84c]/10 bg-white">
                    <td className="px-6 py-5 font-semibold text-[#0d1b2a] flex items-center gap-2">
                      <Package size={16} className="text-[#c9a84c]" /> Gold Shipment
                    </td>
                    <td className="px-6 py-5 text-[#2e3d52]">$25 flat + 0.5% insurance</td>
                    <td className="px-6 py-5 text-[#2e3d52]">$500 equiv.</td>
                    <td className="px-6 py-5 text-[#2e3d52]">7–21 business days</td>
                  </tr>
                  <tr className="border-t border-[#c9a84c]/10 bg-[#faf8f4]">
                    <td className="px-6 py-5 font-semibold text-[#0d1b2a] flex items-center gap-2">
                      <CreditCard size={16} className="text-[#c9a84c]" /> Bank Transfer
                    </td>
                    <td className="px-6 py-5 text-[#2e3d52]">1.5% of amount</td>
                    <td className="px-6 py-5 text-[#2e3d52]">$500</td>
                    <td className="px-6 py-5 text-[#2e3d52]">3–5 business days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#0d1b2a] py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading
              title="Withdrawal FAQ"
              centered
              light
              className="mb-10"
            />
          </FadeIn>
          <FadeIn delay={100}>
            <Accordion items={withdrawalFaq} dark />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
