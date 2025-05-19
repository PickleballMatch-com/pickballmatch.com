'use client';

import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children: React.ReactNode;
  background?: 'white' | 'light' | 'dark' | 'primary';
}

export function Section({
  className,
  children,
  background = 'white',
  ...props
}: SectionProps) {
  const backgroundClasses = {
    white: 'bg-white',
    light: 'bg-gray-50',
    dark: 'bg-secondary text-white',
    primary: 'bg-primary text-secondary',
  };

  return (
    <section
      className={cn('py-12 md:py-16', backgroundClasses[background], className)}
      {...props}
    >
      {children}
    </section>
  );
}