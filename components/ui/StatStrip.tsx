interface Stat {
  value: string;
  label: string;
}

interface StatStripProps {
  stats: Stat[];
  dark?: boolean;
}

export default function StatStrip({ stats, dark = false }: StatStripProps) {
  return (
    <div
      className={`w-full ${dark ? 'bg-[#0d1b2a]' : 'bg-[#c9a84c]/10 border-y border-[#c9a84c]/20'}`}
    >
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p
              className="font-playfair text-3xl md:text-4xl font-bold text-[#c9a84c] mb-1"
              style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
            >
              {stat.value}
            </p>
            <p className={`text-sm uppercase tracking-widest font-semibold ${dark ? 'text-[#c9a84c]/60' : 'text-[#2e3d52]'}`}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
