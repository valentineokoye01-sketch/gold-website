import type { Metadata } from 'next';
import { Shield, Lock, Copy, Send, CheckCircle, Zap } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import FadeIn from '@/components/ui/FadeIn';
import Accordion from '@/components/ui/Accordion';

export const metadata: Metadata = {
  title: 'Payment Methods',
  description:
    'Fund your AurimGold investment via Bitcoin, Ethereum, USDT, or international bank wire transfer. Fast, secure, and available from 80+ countries.',
  alternates: { canonical: '/payments' },
  openGraph: {
    title: 'Payment Methods — AurimGold Investments',
    description: 'Pay via crypto (BTC, ETH, USDT) or bank transfer from 80+ countries.',
  },
};

const cryptoCurrencies = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    network: 'Bitcoin Network',
    confirmations: '3 confirmations',
    minimum: '$100',
    time: '30–60 min',
    color: '#F7931A',
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    network: 'ERC-20 Network',
    confirmations: '12 confirmations',
    minimum: '$100',
    time: '5–15 min',
    color: '#627EEA',
  },
  {
    symbol: 'USDT',
    name: 'Tether USDT',
    network: 'TRC-20 or ERC-20',
    confirmations: '1 confirmation (TRC-20)',
    minimum: '$50',
    time: '1–3 min',
    color: '#26A17B',
  },
];

const cryptoSteps = [
  { icon: Copy, label: 'Copy Wallet Address', desc: 'Copy your unique AurimGold deposit address from your investor portal.' },
  { icon: Send, label: 'Send Exact Amount', desc: 'Send your intended investment amount to the address. Include no memo or tag unless specified.' },
  { icon: Zap, label: 'Share Transaction Hash', desc: 'Submit your TXID (transaction hash) in your portal to allow instant tracking.' },
  { icon: Lock, label: 'Await Confirmation', desc: 'Wait for the required number of blockchain confirmations for your cryptocurrency.' },
  { icon: CheckCircle, label: 'Investment Activated', desc: 'Once confirmed, your gold is allocated and your investment period begins immediately.' },
];

const paymentFaq = [
  {
    question: 'What cryptocurrencies do you accept?',
    answer: 'AurimGold accepts Bitcoin (BTC), Ethereum (ETH on ERC-20), and Tether USDT on both TRC-20 and ERC-20 networks. We recommend USDT TRC-20 for the fastest confirmation times and lowest network fees. All wallet addresses are unique per investor per transaction.',
  },
  {
    question: 'How do I confirm my bank transfer?',
    answer: 'After initiating your bank wire, log into your investor portal and submit your transfer confirmation document or SWIFT reference number. Always include your unique AurimGold reference code in the memo or payment reference field. Without this code, matching your payment may be delayed.',
  },
  {
    question: 'My crypto transaction hasn\'t been credited after 24 hours — what do I do?',
    answer: 'First, check your transaction status on a blockchain explorer using your TXID. If the required confirmations have been reached and your investment portal still shows pending, contact our support team with your TXID, the amount sent, and your registered email. We resolve all payment issues within 24 business hours.',
  },
  {
    question: 'Are there any deposit fees?',
    answer: 'AurimGold charges no deposit fees. For cryptocurrency payments, standard blockchain network fees (gas fees) apply and are payable by the sender. For bank wire transfers, your sending bank may charge an international transfer fee — this is outside our control. We receive and credit the full net amount deposited.',
  },
  {
    question: 'Can I invest in a different currency than USD?',
    answer: 'Yes. AurimGold accepts bank transfers in USD, EUR, GBP, AED, SGD, and other currencies on request. All investments are denominated and tracked in USD for consistency. Currency conversion at the prevailing exchange rate is applied automatically when your transfer is received in a non-USD currency.',
  },
];

export default function PaymentsPage() {
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
              Fast, Safe,{' '}
              <span className="text-[#c9a84c]">Flexible Payments</span>
            </h1>
            <p className="text-white/60 text-xl">
              Fund your gold investment via cryptocurrency or international bank transfer — from
              anywhere in the world.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Crypto */}
      <section className="bg-[#faf8f4] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading
              title="Cryptocurrency Payments"
              subtitle="Fast, borderless, and available 24/7."
              className="mb-12"
            />
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {cryptoCurrencies.map((c, i) => (
              <FadeIn key={c.symbol} delay={i * 80}>
                <div className="bg-white rounded-2xl p-6 shadow-md border border-[#f0ece3] hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4"
                    style={{ backgroundColor: c.color }}
                  >
                    {c.symbol}
                  </div>
                  <h3 className="font-bold text-[#0d1b2a] text-xl mb-1">{c.name}</h3>
                  <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-widest mb-4">
                    {c.network}
                  </p>
                  <div className="space-y-2 text-sm">
                    {[
                      ['Confirmations', c.confirmations],
                      ['Minimum', c.minimum],
                      ['Est. Time', c.time],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between py-2 border-b border-[#f0ece3]">
                        <span className="text-[#2e3d52]/60">{k}</span>
                        <span className="text-[#0d1b2a] font-semibold">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Crypto Steps */}
          <FadeIn delay={200}>
            <div className="bg-[#0d1b2a] rounded-2xl p-8 border border-[#c9a84c]/20">
              <h3
                className="font-playfair text-xl font-bold text-[#c9a84c] mb-6"
                style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
              >
                How to Pay with Crypto
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                {cryptoSteps.map(({ icon: Icon, label, desc }, i) => (
                  <div key={label} className="text-center">
                    <div className="w-10 h-10 mx-auto rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center mb-3">
                      <Icon className="text-[#c9a84c]" size={18} />
                    </div>
                    <p className="text-white font-semibold text-sm mb-1">{label}</p>
                    <p className="text-white/40 text-xs leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Bank Transfer */}
      <section className="bg-[#0d1b2a] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left">
              <SectionHeading
                title="Bank Wire Transfer"
                subtitle="Supported from 80+ countries in major global currencies."
                light
                className="mb-8"
              />
              <div className="space-y-5">
                {[
                  { label: 'Supported Countries', value: '80+ globally' },
                  { label: 'Currencies Accepted', value: 'USD, EUR, GBP, AED, SGD' },
                  { label: 'Processing Time', value: '1–3 business days after receipt' },
                  { label: 'Minimum Transfer', value: '$500 USD equivalent' },
                  { label: 'Required', value: 'Unique AurimGold reference code in memo' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between py-3 border-b border-[#c9a84c]/10">
                    <span className="text-white/50 text-sm">{label}</span>
                    <span className="text-white font-semibold text-sm text-right max-w-[200px]">{value}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn direction="right">
              <div className="bg-[#162336] rounded-2xl p-7 border border-[#c9a84c]/20">
                <h4
                  className="font-playfair text-xl font-bold text-[#c9a84c] mb-5"
                  style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
                >
                  Bank Transfer Instructions
                </h4>
                <ol className="space-y-4">
                  {[
                    'Log into your AurimGold investor portal to retrieve your unique reference code.',
                    'Initiate an international wire transfer from your bank to AurimGold\'s receiving account.',
                    'Include your unique reference code in the payment memo or reference field.',
                    'Upload your transfer confirmation or SWIFT receipt to your portal.',
                    'Investment is activated within 1–3 business days of confirmed receipt.',
                  ].map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <span className="w-6 h-6 flex-shrink-0 rounded-full bg-[#c9a84c] flex items-center justify-center text-[#0d1b2a] font-bold text-xs">
                        {i + 1}
                      </span>
                      <span className="text-white/60 leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="bg-[#faf8f4] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading
              title="Payment Security"
              centered
              className="mb-12"
            />
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: 'SSL Encrypted',
                desc: 'All data transmissions are protected by 256-bit SSL encryption, the same standard used by global financial institutions.',
              },
              {
                icon: Lock,
                title: 'Cold Wallet Storage',
                desc: 'Cryptocurrency received by AurimGold is immediately moved to offline cold storage — never exposed to hot wallet risks.',
              },
              {
                icon: CheckCircle,
                title: '2FA Verification',
                desc: 'All withdrawal requests and account changes require two-factor authentication, preventing unauthorised access even if credentials are compromised.',
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <FadeIn key={title} delay={i * 80}>
                <div className="bg-white rounded-2xl p-6 shadow-md border border-[#f0ece3] text-center hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                  <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-[#c9a84c]/10 mb-4">
                    <Icon className="text-[#c9a84c]" size={24} />
                  </div>
                  <h3 className="font-bold text-[#0d1b2a] text-lg mb-3">{title}</h3>
                  <p className="text-[#2e3d52] text-sm leading-relaxed">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#0d1b2a] py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading
              title="Payment FAQ"
              centered
              light
              className="mb-10"
            />
          </FadeIn>
          <FadeIn delay={100}>
            <Accordion items={paymentFaq} dark />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
