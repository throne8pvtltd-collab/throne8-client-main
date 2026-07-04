import { cn } from '@/shared/utils/cn';
import type { ElementType, ComponentPropsWithoutRef } from 'react';

type Padding = 'none' | 'sm' | 'md' | 'lg';

const PADDING: Record<Padding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

interface CardOwnProps {
  hoverable?: boolean;
  padding?: Padding;
}

type CardProps<T extends ElementType = 'div'> = CardOwnProps & {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof CardOwnProps | 'as'>;

export function Card<T extends ElementType = 'div'>({
  as,
  children,
  className,
  hoverable = false,
  padding = 'md',
  ...rest
}: CardProps<T>) {
  const Tag = (as ?? 'div') as ElementType;
  return (
    <Tag
      className={cn(
        'bg-white/60 backdrop-blur-sm rounded-2xl border border-brand-beige/60 shadow-sm',
        hoverable && 'transition-all duration-300 hover:shadow-lg hover:border-brand-beige hover:-translate-y-0.5',
        PADDING[padding],
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
