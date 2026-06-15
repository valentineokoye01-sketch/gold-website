'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Gem, Menu, X } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  if (pathname.startsWith('/dashboard')) return null;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0d1b2a] border-b border-[#c9a84c]/30 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-white hover:opacity-90 transition-opacity"
            onClick={closeMenu}
          >
            <Gem className="text-[#c9a84c]" size={26} strokeWidth={1.8} />
            <span
              className="font-bold text-lg md:text-xl leading-none"
              style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
            >
              AurimGold
              <span className="hidden sm:inline text-[#c9a84c]"> Investments</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                      active
                        ? 'text-[#c9a84c]'
                        : 'text-white/80 hover:text-[#c9a84c]'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-3 right-3 h-0.5 bg-[#c9a84c] rounded-full transition-all duration-300 ${
                        active ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/plans"
              className="hidden md:inline-flex items-center justify-center px-5 py-2.5 bg-[#c9a84c] hover:bg-[#a8852e] text-[#0d1b2a] font-semibold text-sm rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(201,168,76,0.4)] btn-shimmer"
            >
              Start Investing
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg text-white hover:text-[#c9a84c] transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-16 left-0 right-0 z-40 lg:hidden bg-[#0d1b2a] border-b border-[#c9a84c]/20 shadow-2xl transition-all duration-300 ${
          menuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <nav className="px-4 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`px-4 py-3 rounded-xl font-medium text-base transition-all duration-200 ${
                  active
                    ? 'bg-[#c9a84c]/15 text-[#c9a84c]'
                    : 'text-white/80 hover:bg-white/5 hover:text-[#c9a84c]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="mt-3 pt-3 border-t border-[#c9a84c]/20">
            <Link
              href="/plans"
              onClick={closeMenu}
              className="block w-full text-center px-6 py-3 bg-[#c9a84c] hover:bg-[#a8852e] text-[#0d1b2a] font-bold rounded-xl transition-all duration-300"
            >
              Start Investing
            </Link>
          </div>
        </nav>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={closeMenu}
        />
      )}
    </>
  );
}
