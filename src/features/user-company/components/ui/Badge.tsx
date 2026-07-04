import { BadgeVariant } from '@/features/company/type/company.types';
import { cn } from '@/shared/utils/cn';


const VARIANTS: Record<BadgeVariant | string, string> = {
  Core: 'bg-brand-brown text-brand-cream',
  Enterprise: 'bg-amber-700 text-amber-50',
  New: 'bg-emerald-700 text-emerald-50',
  Beta: 'bg-blue-700 text-blue-50',
  default: 'bg-brand-beige text-brand-brown',
};

interface Props {
  label: string;
  variant?: BadgeVariant | string;
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({ label, variant = 'default', size = 'sm', className }: Props) {
  return (
    <span className={cn(
      'inline-flex items-center font-bold rounded-full',
      size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1',
      VARIANTS[variant] ?? VARIANTS.default,
      className,
    )}>
      {label}
    </span>
  );
}
