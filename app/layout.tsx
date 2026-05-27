import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | AurimGold Investments',
    default: 'AurimGold Investments — Own Real Gold. Earn Real Returns.',
  },
  description:
    'Invest in physical gold from $500. Earn 2–4% daily returns. Withdraw as gold shipment or bank transfer. AurimGold — making gold accessible to everyone.',
  keywords: ['gold investment', 'buy gold online', 'gold returns', 'physical gold', 'investment platform'],
  openGraph: {
    type: 'website',
    siteName: 'AurimGold Investments',
    title: 'AurimGold Investments — Own Real Gold. Earn Real Returns.',
    description:
      'Invest in physical gold from $500. Earn 2–4% daily returns. Withdraw as gold shipment or bank transfer.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AurimGold Investments',
    description: 'Own Real Gold. Earn Real Returns. Invest from $500.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full scroll-smooth`}
    >
      <body
        className="min-h-full flex flex-col font-inter antialiased"
        style={{ fontFamily: 'var(--font-inter), Inter, Arial, sans-serif' }}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
