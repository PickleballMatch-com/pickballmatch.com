'use client';

import {
  Card as ShadcnCard,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

// Main Card component
export function Card({ className, children, ...props }: CardProps) {
  return (
    <ShadcnCard className={cn('shadow-md hover:shadow-lg transition-shadow', className)} {...props}>
      {children}
    </ShadcnCard>
  );
}

// Re-export the card sub-components with any custom styling needed
export { CardHeader, CardFooter, CardContent, CardTitle, CardDescription };

// Custom CardTitle with our branded styling
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
  children: React.ReactNode;
}

export function CustomCardTitle({ className, children, ...props }: CardTitleProps) {
  return (
    <CardTitle className={cn('text-lg font-bold text-secondary', className)} {...props}>
      {children}
    </CardTitle>
  );
}

// Custom CardDescription with our branded styling
interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  children: React.ReactNode;
}

export function CustomCardDescription({ className, children, ...props }: CardDescriptionProps) {
  return (
    <CardDescription className={cn('text-sm text-gray-500', className)} {...props}>
      {children}
    </CardDescription>
  );
}