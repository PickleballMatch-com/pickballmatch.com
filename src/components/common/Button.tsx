'use client';

import { Button as ShadcnButton } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  children: React.ReactNode;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'default', className, children, asChild = false, ...props }, ref) => {
    // Map our variant names to shadcn's variants or our custom styles
    const variantMapping = {
      default: 'default',
      primary: 'default', // Use default but with our primary styling
      secondary: 'secondary',
      outline: 'outline',
      ghost: 'ghost',
      link: 'link',
      destructive: 'destructive',
    };

    // Add custom class names based on variant
    const customClassName = cn({
      'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'primary',
      'bg-transparent text-secondary border-2 border-secondary hover:bg-secondary hover:text-white':
        variant === 'secondary',
    });

    return (
      <ShadcnButton
        ref={ref}
        variant={variantMapping[variant] as any}
        size={size}
        className={cn(customClassName, className)}
        asChild={asChild}
        {...props}
      >
        {children}
      </ShadcnButton>
    );
  }
);

Button.displayName = 'Button';

export { Button };