import { cn } from '@/shared/utils/cn';
import Image from 'next/image';
// import { cn } from '@/lib/utils';

type Size = 'sm' | 'md' | 'lg' | 'xl';

const SIZES: Record<Size, { outer: string; text: string }> = {
  sm: { outer: 'w-8  h-8',  text: 'text-xs'  },
  md: { outer: 'w-10 h-10', text: 'text-sm'  },
  lg: { outer: 'w-14 h-14', text: 'text-base' },
  xl: { outer: 'w-20 h-20', text: 'text-xl'  },
};

interface Props {
  src?:       string;
  initials?:  string;
  alt?:       string;
  size?:      Size;
  className?: string;
  rounded?:   'full' | 'xl' | '2xl';
}

export function Avatar({ src, initials, alt = '', size = 'md', className, rounded = '2xl' }: Props) {
  const { outer, text } = SIZES[size];
  const shape = `rounded-${rounded}`;

  if (src) {
    return (
      <div className={cn('relative flex-shrink-0', outer, shape, 'overflow-hidden', className)}>
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
    );
  }
  return (
    <div className={cn(
      'flex-shrink-0 flex items-center justify-center font-bold bg-gradient-to-br from-brand-brown to-brand-medium text-brand-cream shadow-sm',
      outer, shape, text, className,
    )}>
      {initials ?? '?'}
    </div>
  );
}
