import type { Metadata } from 'next';
import { Gem, TrendingUp, Globe, Shield, BarChart2 } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import FadeIn from '@/components/ui/FadeIn';
import Accordion from '@/components/ui/Accordion';
import LivePriceDisplay from '@/components/gold-market/LivePriceDisplay';
import GoldPriceChart from '@/components/gold-market/GoldPriceChart';

export const metadata: Metadata = {
  title: 'Gold Market',
  description:
    'Live XAU/USD gold prices, 12-month historical chart, market analysis, and educational content about the global gold market.',
  alternates: { canonical: '/gold-market' },
  openGraph: {
    title: 'Live Gold Market — AuraGold Investments',
    description: 'Track live XAU/USD prices, historical performance, and understand why gold holds its value.',
  },
};

const whyCards = [
  {
    icon: Gem,
    title: 'Absolute Scarcity',
    desc: 'All the gold ever mined in human history would fit in roughly 3.5 Olympic swimming pools. Its finite supply is a fundamental driver of long-term value.',
    stat: '≈ 212,000 tonnes mined in all of history',
  },
  {
    icon: TrendingUp,
    title: 'Central Bank Demand',
    desc: 'Central banks globally bought over 1,000 tonnes of gold in 2023 — the second-highest annual purchase on record — reinforcing gold\'s role as the ultimate reserve asset.',
    stat: '1,037 tonnes purchased by central banks in 2023',
  },
  {
    icon: BarChart2,
    title: 'Inflation Correlation',
    desc: 'Gold\'s price has risen an average of 10.6% annually over the past 20 years. In periods of high inflation, gold has historically outperformed most traditional asset classes.',
    stat: 'Avg. +10.6% per year over 20 years (YBM)',
  },
  {
    icon: Globe,
    title: '5,000 Years of Value',
    desc: 'No other asset has maintained purchasing power across millennia, cultures, and continents. Gold has survived every currency collapse, war, and economic crisis in recorded history.',
    stat: 'Store of value since ~3,000 BCE',
  },
];

const newsItems = [
  {
    date: 'May 20, 2026',
    headline: 'Gold Hits Record High as Inflation Concerns Persist',
    excerpt: 'XAU/USD surpassed $2,400 per troy ounce as investors sought safe-haven assets amid rising global inflation expectations and central bank policy uncertainty.',
  },
  {
    date: 'May 14, 2026',
    headline: 'Central Banks Accelerate Gold Purchases in Q1 2026',
    excerpt: 'New data from the World Gold Council shows central banks added 290 tonnes of gold in Q1 2026, pacing ahead of last year\'s record buying spree.',
  },
  {
    date: 'May 5, 2026',
    headline: 'Physical Gold ETF Outflows Signal Shift to Direct Ownership',
    excerpt: 'Analysts note a trend of institutional and retail investors moving from paper gold products to direct physical gold ownership platforms.',
  },
];

const educationItems = [
  {
    question: 'What is XAU/USD?',
    answer: 'XAU/USD is the currency pair representing the price of one troy ounce of gold (XAU) in US dollars (USD). "XAU" is the ISO 4217 code for gold — X for non-sovereign currency and AU for the chemical symbol Aurum (gold). This is the benchmark price used in all global gold trading.',
  },
  {
    question: 'What is a troy ounce?',
    answer: 'A troy ounce (oz t) is the standard unit for weighing precious metals. It equals 31.1034768 grams — slightly heavier than a standard avoirdupois ounce (28.35 grams). All gold pricing, contracts, and vault allocations use troy ounces. When AuraGold states your gold allocation, it is expressed in troy ounces.',
  },
  {
    question: 'What drives the price of gold?',
    answer: 'Gold prices are primarily driven by: (1) US dollar strength — gold typically moves inversely to the USD; (2) real interest rates — lower rates increase gold\'s appeal; (3) geopolitical uncertainty — gold rises in periods of instability; (4) central bank buying and selling; (5) inflation expectations; and (6) global jewellery and industrial demand, particularly from India and China.',
  },
];

const comparisonRows = [
  { asset: 'Gold', volatility: 'Low', hedge: '✓ Excellent', liquidity: 'High', track: '5,000+ years', highlight: true },
  { asset: 'Stocks', volatility: 'High', hedge: 'Partial', liquidity: 'High', track: '~100 years', highlight: false },
  { asset: 'Real Estate', volatility: 'Medium', hedge: '✓ Good', liquidity: 'Low', track: 'Regional', highlight: false },
  { asset: 'Crypto', volatility: 'Very High', hedge: 'Unproven', liquidity: 'Medium', track: '< 15 years', highlight: false },
];

export default function GoldMarketPage() {
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
              The Gold Market <span className="text-[#c9a84c]">Today</span>
            </h1>
            <p className="text-white/60 text-xl">
              Live pricing, historical performance, and market intelligence — all in one place.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Live Price */}
      <section className="bg-[#0d1b2a] pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <LivePriceDisplay />
          </FadeIn>
        </div>
      </section>

      {/* Chart */}
      <section className="bg-[#0d1b2a] pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn delay={100}>
            <GoldPriceChart />
          </FadeIn>
        </div>
      </section>

      {/* Why Gold */}
      <section className="bg-[#faf8f4] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading
              title="Why Gold Holds Its Value"
              subtitle="Four data-backed reasons gold remains the world's most trusted store of wealth."
              centered
              className="mb-14"
            />
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyCards.map(({ icon: Icon, title, desc, stat }, i) => (
              <FadeIn key={title} delay={i * 80}>
                <div className="bg-white rounded-2xl p-6 shadow-md border border-[#f0ece3] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#c9a84c]/10 mb-4">
                    <Icon className="text-[#c9a84c]" size={22} />
                  </div>
                  <h3 className="font-bold text-[#0d1b2a] text-base mb-2">{title}</h3>
                  <p className="text-[#2e3d52] text-sm leading-relaxed flex-1 mb-4">{desc}</p>
                  <p className="text-[#c9a84c] text-xs font-semibold bg-[#c9a84c]/8 px-3 py-2 rounded-lg">
                    {stat}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-[#0d1b2a] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading
              title="Gold vs. Other Assets"
              centered
              light
              className="mb-12"
            />
          </FadeIn>
          <FadeIn delay={100}>
            <div className="overflow-x-auto rounded-2xl border border-[#c9a84c]/20">
              <table className="w-full min-w-[550px]">
                <thead>
                  <tr className="bg-[#162336]">
                    {['Asset', 'Volatility', 'Inflation Hedge', 'Liquidity', 'Long-term Track Record'].map((h) => (
                      <th key={h} className="px-5 py-4 text-[#c9a84c]/60 text-xs uppercase tracking-widest text-left font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={row.asset}
                      className={`border-t border-[#c9a84c]/10 ${
                        row.highlight
                          ? 'bg-[#c9a84c]/5 border-l-2 border-l-[#c9a84c]'
                          : i % 2 === 0
                          ? 'bg-[#0d1b2a]'
                          : 'bg-[#162336]/30'
                      }`}
                    >
                      <td className={`px-5 py-4 font-bold text-sm ${row.highlight ? 'text-[#c9a84c]' : 'text-white'}`}>
                        {row.asset}
                      </td>
                      <td className="px-5 py-4 text-white/60 text-sm">{row.volatility}</td>
                      <td className={`px-5 py-4 text-sm font-medium ${row.hedge.startsWith('✓') ? 'text-emerald-400' : 'text-white/60'}`}>
                        {row.hedge}
                      </td>
                      <td className="px-5 py-4 text-white/60 text-sm">{row.liquidity}</td>
                      <td className="px-5 py-4 text-white/60 text-sm">{row.track}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* News */}
      <section className="bg-[#faf8f4] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading title="Gold Market News" className="mb-12" />
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsItems.map((item, i) => (
              <FadeIn key={item.headline} delay={i * 80}>
                <div className="bg-white rounded-2xl p-7 shadow-md border border-[#f0ece3] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                  <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-widest mb-3">
                    {item.date}
                  </p>
                  <h3 className="font-bold text-[#0d1b2a] text-lg mb-3 leading-snug">{item.headline}</h3>
                  <p className="text-[#2e3d52] text-sm leading-relaxed flex-1 mb-5">{item.excerpt}</p>
                  <span className="text-[#c9a84c] text-sm font-semibold cursor-pointer hover:underline">
                    Read More →
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="bg-[#0d1b2a] py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading
              title="Understanding Gold"
              subtitle="Essential knowledge for every gold investor."
              centered
              light
              className="mb-10"
            />
          </FadeIn>
          <FadeIn delay={100}>
            <Accordion items={educationItems} dark />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
