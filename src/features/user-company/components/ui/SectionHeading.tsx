import { cn } from '@/shared/utils/cn';

interface Props {
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

const SIZES = { sm: 'text-lg', md: 'text-2xl', lg: 'text-3xl' };

export function SectionHeading({ children, subtitle, className, size = 'md', icon }: Props) {
  return (
    <div className={cn('mb-1', className)}>
      <h2 className={cn(
        'font-bold text-brand-brown tracking-tight flex items-center gap-2',
        'font-display',
        SIZES[size],
      )}>
        {icon}
        {children}
      </h2>
      {subtitle && <p className="text-sm text-brand-brown/55 mt-1">{subtitle}</p>}
    </div>
  );
}
