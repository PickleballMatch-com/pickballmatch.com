'use client';

import { cn } from '@/lib/utils';

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export function PageHeader({
  title,
  description,
  className,
  align = 'left',
  ...props
}: PageHeaderProps) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={cn('mb-8', alignmentClasses[align], className)} {...props}>
      <h1 className="text-3xl font-bold text-secondary tracking-tight">{title}</h1>
      {description && (
        <p className="mt-2 text-lg text-gray-500">{description}</p>
      )}
    </div>
  );
}