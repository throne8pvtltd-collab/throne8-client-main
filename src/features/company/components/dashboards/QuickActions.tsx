import { memo } from 'react';
import Link from 'next/link';

export interface QuickAction {
  id: string;
  label: string;
  href: string;
  icon: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

const QuickActions = memo(function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {actions.map((action) => (
        <Link
          key={action.id}
          href={action.href}
          className="flex items-center gap-2.5 bg-[#4a3728] text-[#f6ede8] px-4 py-3 rounded-xl hover:bg-[#6b4e3d] transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02] group"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} />
          </svg>
          <span className="text-xs font-semibold truncate">{action.label}</span>
        </Link>
      ))}
    </div>
  );
});

export default QuickActions;