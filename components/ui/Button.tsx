import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
}

const base =
  'inline-flex items-center justify-center font-semibold rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 select-none btn-shimmer';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-[#c9a84c] hover:bg-[#a8852e] text-[#0d1b2a] focus:ring-[#c9a84c] shadow-lg hover:shadow-[0_8px_24px_rgba(201,168,76,0.35)] hover:-translate-y-0.5',
  secondary:
    'border-2 border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#0d1b2a] focus:ring-[#c9a84c] hover:-translate-y-0.5',
  ghost:
    'text-[#c9a84c] hover:bg-[rgba(201,168,76,0.1)] focus:ring-[#c9a84c]',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'text-sm px-4 py-2',
  md: 'text-base px-6 py-3',
  lg: 'text-lg px-8 py-4',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  children,
  external = false,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} ${className}`;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
