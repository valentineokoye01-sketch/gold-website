import Link from 'next/link';
import { Gem, Send } from 'lucide-react';
import { CONTACT_EMAIL, SOCIAL_LINKS } from '@/lib/constants';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'FAQ', href: '/faq' },
];

const investmentLinks = [
  { label: 'Investment Plans', href: '/plans' },
  { label: 'ROI Calculator', href: '/calculator' },
  { label: 'Gold Market', href: '/gold-market' },
  { label: 'Payments', href: '/payments' },
  { label: 'Withdraw', href: '/withdraw' },
];

const supportLinks = [
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Telegram', href: SOCIAL_LINKS.telegram, external: true },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Risk Disclosure', href: '#' },
  { label: 'Cookie Policy', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-[#080f17] text-white border-t border-[#c9a84c]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <Gem className="text-[#c9a84c]" size={24} strokeWidth={1.8} />
              <span
                className="font-bold text-lg"
                style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
              >
                AurimGold
              </span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed mb-5">
              Making gold accessible to everyone, globally.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3">
              <a
                href={SOCIAL_LINKS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-white/10 hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors"
                aria-label="Telegram"
              >
                <Send size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#c9a84c] text-xs font-bold uppercase tracking-widest mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/50 hover:text-[#c9a84c] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Investment */}
          <div>
            <h4 className="text-[#c9a84c] text-xs font-bold uppercase tracking-widest mb-5">
              Investment
            </h4>
            <ul className="space-y-3">
              {investmentLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/50 hover:text-[#c9a84c] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[#c9a84c] text-xs font-bold uppercase tracking-widest mb-5">
              Support
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((l) => (
                <li key={l.label}>
                  {'external' in l && l.external ? (
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/50 hover:text-[#c9a84c] transition-colors"
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link
                      href={l.href}
                      className="text-sm text-white/50 hover:text-[#c9a84c] transition-colors"
                    >
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[#c9a84c] text-xs font-bold uppercase tracking-widest mb-5">
              Legal
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/50 hover:text-[#c9a84c] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <p className="text-xs text-white/30 uppercase tracking-widest mb-3 font-semibold">
            Accepted Payments
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            {['BTC', 'ETH', 'USDT', 'Bank Transfer'].map((method) => (
              <span
                key={method}
                className="px-3 py-1.5 rounded-lg border border-white/10 text-xs text-white/40 font-medium"
              >
                {method}
              </span>
            ))}
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="border-t border-white/10 pt-8 mb-6">
          <p className="text-xs text-white/30 leading-relaxed max-w-4xl">
            AurimGold Investments is a regulated gold trading platform. All investments carry risk.
            Past performance does not guarantee future returns. Gold values may fluctuate. Investment
            returns are subject to market conditions and are not guaranteed. Please read our Risk
            Disclosure before investing.
          </p>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-white/30">
            © 2026 AurimGold Investments. All Rights Reserved.
          </p>
          <p className="text-xs text-white/20">
            {CONTACT_EMAIL}
          </p>
        </div>
      </div>
    </footer>
  );
}
