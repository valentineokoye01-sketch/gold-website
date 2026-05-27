'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'left' | 'right' | 'none';
}

export default function FadeIn({
  children,
  delay = 0,
  className = '',
  direction = 'up',
}: FadeInProps) {
  const [ref, isVisible] = useIntersectionObserver();

  const translateMap = {
    up: 'translate-y-8',
    left: '-translate-x-8',
    right: 'translate-x-8',
    none: '',
  };

  const hiddenClasses = `opacity-0 ${translateMap[direction]}`;
  const visibleClasses = 'opacity-100 translate-y-0 translate-x-0';

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? visibleClasses : hiddenClasses} ${className}`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
}
