import { cn } from '@/shared/utils/cn';

interface Props {
  icon?:       React.ReactNode;
  title:       string;
  description?: string;
  action?:     React.ReactNode;
  className?:  string;
}

export function EmptyState({ icon, title, description, action, className }: Props) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center py-16 px-4', className)}>
      {icon && <div className="mb-4 text-brand-beige">{icon}</div>}
      <p className="text-base font-semibold text-brand-brown/70">{title}</p>
      {description && <p className="text-sm text-brand-brown/45 mt-1 max-w-xs">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
