interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  accent?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = false,
  light = false,
  accent = true,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      <h2
        className={`font-playfair text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight ${
          light ? 'text-white' : 'text-[#0d1b2a]'
        }`}
        style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
      >
        {accent ? (
          <span className="gold-underline">{title}</span>
        ) : (
          title
        )}
      </h2>
      {subtitle && (
        <p
          className={`text-lg md:text-xl leading-relaxed mt-6 max-w-2xl ${
            centered ? 'mx-auto' : ''
          } ${light ? 'text-[#c9a84c]/80' : 'text-[#2e3d52]'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
