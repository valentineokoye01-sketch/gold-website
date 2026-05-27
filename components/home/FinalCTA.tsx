import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-20">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #c9a84c 0%, #a8852e 40%, #7a5c18 100%)',
        }}
      />
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, white 0%, transparent 60%)',
        }}
      />
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <h2
          className="font-playfair text-3xl md:text-5xl font-bold text-[#0d1b2a] mb-6 leading-tight"
          style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
        >
          Start Building Real Wealth with Gold Today
        </h2>
        <p className="text-[#0d1b2a]/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Join 10,000+ investors across 50 countries who trust AuraGold to grow and protect
          their wealth through physical gold investment.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/plans"
            className="inline-flex items-center justify-center px-10 py-4 bg-[#0d1b2a] hover:bg-[#162336] text-white font-bold text-lg rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
          >
            Create Your Account Today
          </Link>
          <Link
            href="/calculator"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#0d1b2a]/30 text-[#0d1b2a] font-semibold text-lg rounded-xl hover:border-[#0d1b2a] transition-all duration-300"
          >
            Calculate Returns
          </Link>
        </div>
        <p className="mt-6 text-sm text-[#0d1b2a]/50">
          No commitment. No setup fees. Start from $500.
        </p>
      </div>
    </section>
  );
}
