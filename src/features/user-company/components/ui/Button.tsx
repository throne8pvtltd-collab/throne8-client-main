import { cn } from '@/shared/utils/cn';
import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-brand-brown text-brand-cream hover:bg-brand-medium hover:shadow-lg hover:scale-105 active:scale-100',
  outline: 'border-2 border-brand-brown text-brand-brown hover:bg-brand-brown hover:text-brand-cream active:scale-100',
  ghost: 'text-brand-brown/70 hover:text-brand-brown hover:bg-brand-beige/50',
  danger: 'bg-red-600 text-white hover:bg-red-700 active:scale-100',
};

const SIZES: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3   text-base',
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  variant = 'primary', size = 'md', loading, leftIcon, rightIcon,
  className, children, disabled, ...rest
}: Props) {
  return (
    <button
      className={cn(
        'inline-flex items-center gap-2 rounded-xl font-semibold transition-all duration-200 cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      disabled={disabled ?? loading}
      {...rest}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
}
