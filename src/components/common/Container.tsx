'use client';

import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
  size?: 'sm' | 'default' | 'lg' | 'xl' | 'full';
}

export function Container({ className, children, size = 'default', ...props }: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-3xl',
    default: 'max-w-5xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <div
      className={cn('w-full mx-auto px-4 sm:px-6 md:px-8', sizeClasses[size], className)}
      {...props}
    >
      {children}
    </div>
  );
}