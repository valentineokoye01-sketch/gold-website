import { testimonials } from '@/lib/testimonials';
import FadeIn from '@/components/ui/FadeIn';

function Stars({ count }: { count: number }) {
  return (
    <span className="text-[#c9a84c] text-base">
      {'★'.repeat(count)}{'☆'.repeat(5 - count)}
    </span>
  );
}

export default function Testimonials() {
  const display = testimonials.slice(0, 3);

  return (
    <section className="bg-[#0d1b2a] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2
            className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
          >
            Trusted by Investors Worldwide
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Hear from real AurimGold investors across the globe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {display.map((t, i) => (
            <FadeIn key={t.name} delay={i * 100}>
              <div className="bg-[#162336] rounded-2xl p-7 border border-[#c9a84c]/10 hover:border-[#c9a84c]/30 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#c9a84c]/20 flex items-center justify-center text-xl">
                    {t.flag}
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{t.name}</p>
                    <p className="text-[#c9a84c]/60 text-xs">{t.country}</p>
                  </div>
                </div>
                <Stars count={t.rating} />
                <p className="text-white/60 text-sm leading-relaxed mt-3 mb-4 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="pt-4 border-t border-[#c9a84c]/10">
                  <span className="text-xs text-[#c9a84c] font-semibold uppercase tracking-widest">
                    {t.plan}
                  </span>
                  <span className="text-xs text-white/30 ml-2">· {t.invested} invested</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
