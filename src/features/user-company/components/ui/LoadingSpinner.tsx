import { cn } from '@/shared/utils/cn';

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center py-12', className)}>
      <div className="w-8 h-8 border-2 border-brand-beige border-t-brand-brown rounded-full animate-spin" />
    </div>
  );
}
