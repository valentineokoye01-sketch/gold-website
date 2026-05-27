import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import TrustBadges from '@/components/home/TrustBadges';
import HowItWorksPreview from '@/components/home/HowItWorksPreview';
import PlansPreview from '@/components/home/PlansPreview';
import LivePriceTicker from '@/components/home/LivePriceTicker';
import WhyGold from '@/components/home/WhyGold';
import Testimonials from '@/components/home/Testimonials';
import FinalCTA from '@/components/home/FinalCTA';

export const metadata: Metadata = {
  title: 'Own Real Gold. Earn Real Returns.',
  description:
    'AurimGold Investments — Invest in physical gold from $500. Earn 2–4% monthly returns. Withdraw as gold shipment or bank transfer. 10,000+ investors in 50+ countries.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'AurimGold Investments — Own Real Gold. Earn Real Returns.',
    description:
      'Invest in physical gold from $500. Earn 2–4% monthly returns subject to market conditions. Fully insured vault storage.',
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <HowItWorksPreview />
      <PlansPreview />
      <LivePriceTicker />
      <WhyGold />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
