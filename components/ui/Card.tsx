interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gold?: boolean;
  dark?: boolean;
}

export default function Card({
  children,
  className = '',
  hover = false,
  gold = false,
  dark = false,
}: CardProps) {
  const base = 'rounded-2xl p-6 transition-all duration-300';
  const theme = dark
    ? 'bg-[#162336] text-white'
    : gold
    ? 'bg-[#0d1b2a] border border-[#c9a84c]/30 text-white'
    : 'bg-white text-[#1a2535]';
  const hoverStyle = hover
    ? 'hover:-translate-y-1 hover:shadow-xl cursor-pointer'
    : '';
  const shadow = dark || gold ? 'shadow-lg' : 'shadow-md';

  return (
    <div className={`${base} ${theme} ${hoverStyle} ${shadow} ${className}`}>
      {children}
    </div>
  );
}
