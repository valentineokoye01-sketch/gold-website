import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#0d1b2a] flex items-center overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 25%, #c9a84c 0%, transparent 50%), radial-gradient(circle at 75% 75%, #c9a84c 0%, transparent 50%)',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 flex flex-col lg:flex-row items-center gap-16">
        {/* Left — Copy */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse" />
            <span className="text-[#c9a84c] text-sm font-semibold tracking-wide">
              Live XAU/USD · $2,345.00
            </span>
          </div>

          <h1
            className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6"
            style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
          >
            Own Real Gold.
            <br />
            <span className="text-[#c9a84c]">Earn Real Returns.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
            Invest in physical gold from $500. Earn 2–4% monthly returns, subject to market
            conditions. Withdraw as physical gold delivery or direct bank transfer.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link
              href="/plans"
              className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-[#c9a84c] hover:bg-[#a8852e] text-[#0d1b2a] font-bold text-lg rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(201,168,76,0.4)] btn-shimmer"
            >
              Start Investing
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 border-2 border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#0d1b2a] font-bold text-lg rounded-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              How It Works
            </Link>
          </div>

          <div className="mt-10 flex items-center justify-center lg:justify-start gap-8 text-sm text-white/40">
            <span>✦ No hidden fees</span>
            <span>✦ Fully insured</span>
            <span>✦ 10,000+ investors</span>
          </div>
        </div>

        {/* Right — Animated Gold Bar SVG */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <div className="animate-float">
            <svg
              width="320"
              height="220"
              viewBox="0 0 320 220"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_20px_60px_rgba(201,168,76,0.35)]"
            >
              <defs>
                <linearGradient id="goldTop" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f0d080" />
                  <stop offset="40%" stopColor="#c9a84c" />
                  <stop offset="100%" stopColor="#7a5c18" />
                </linearGradient>
                <linearGradient id="goldFront" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#d4b96a" />
                  <stop offset="50%" stopColor="#a8852e" />
                  <stop offset="100%" stopColor="#6b4e10" />
                </linearGradient>
                <linearGradient id="goldSide" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#c9a84c" />
                  <stop offset="100%" stopColor="#7a5c18" />
                </linearGradient>
                <linearGradient id="shimmerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
                  <stop offset="100%" stopColor="transparent" />
                  <animateTransform
                    attributeName="gradientTransform"
                    type="translate"
                    from="-1 0"
                    to="2 0"
                    dur="2.5s"
                    repeatCount="indefinite"
                  />
                </linearGradient>
              </defs>
              {/* Top face */}
              <polygon
                points="60,60 260,60 300,30 100,30"
                fill="url(#goldTop)"
              />
              {/* Front face */}
              <rect x="60" y="60" width="200" height="110" fill="url(#goldFront)" rx="2" />
              {/* Side face */}
              <polygon
                points="260,60 300,30 300,140 260,170"
                fill="url(#goldSide)"
              />
              {/* Shimmer overlay */}
              <rect x="60" y="60" width="200" height="110" fill="url(#shimmerGrad)" rx="2" />
              {/* Stamp text */}
              <text
                x="160"
                y="105"
                textAnchor="middle"
                className="font-playfair"
                style={{ fontFamily: 'Georgia, serif' }}
                fontSize="20"
                fontWeight="bold"
                fill="rgba(255,255,255,0.5)"
              >
                AURAGOLD
              </text>
              <text
                x="160"
                y="130"
                textAnchor="middle"
                style={{ fontFamily: 'Georgia, serif' }}
                fontSize="13"
                fill="rgba(255,255,255,0.3)"
              >
                999.9 FINE GOLD · 1 KG
              </text>
              {/* Base shadow */}
              <ellipse cx="180" cy="190" rx="130" ry="18" fill="rgba(0,0,0,0.25)" />
            </svg>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 animate-bounce">
        <ChevronDown size={28} />
      </div>
    </section>
  );
}
