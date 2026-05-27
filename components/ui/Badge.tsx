interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'navy' | 'green' | 'cream';
  className?: string;
}

export default function Badge({ children, variant = 'gold', className = '' }: BadgeProps) {
  const variants = {
    gold: 'bg-[#c9a84c] text-[#0d1b2a]',
    navy: 'bg-[#0d1b2a] text-[#c9a84c] border border-[#c9a84c]/40',
    green: 'bg-emerald-500 text-white',
    cream: 'bg-[#faf8f4] text-[#0d1b2a] border border-[#c9a84c]/20',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
