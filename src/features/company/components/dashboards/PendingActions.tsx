import { memo } from 'react';
import Link from 'next/link';

export interface PendingItem {
  id: string;
  label: string;
  action: string;
  href: string;
  urgency: 'high' | 'medium' | 'low';
}

interface PendingActionsProps {
  items: PendingItem[];
}

const URGENCY_COLOR = {
  high: 'bg-red-500',
  medium: 'bg-yellow-500',
  low: 'bg-green-500',
} as const;

const PendingActions = memo(function PendingActions({ items }: PendingActionsProps) {
  return (
    <div className="bg-[#f6ede8]/80 border border-[#e0d8cf] rounded-2xl p-6 shadow-sm">
      <h3 className="text-base font-bold text-[#4a3728] mb-4">Action Needed</h3>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#e0d8cf]/50 hover:bg-[#e0d8cf]/80 transition-colors duration-200"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${URGENCY_COLOR[item.urgency]}`} />
              <p className="text-xs text-[#4a3728]/80 font-medium truncate">{item.label}</p>
            </div>
            <Link
              href={item.href}
              className="text-[10px] font-bold text-[#4a3728] bg-[#4a3728]/10 px-2 py-1 rounded-lg hover:bg-[#4a3728] hover:text-[#f6ede8] transition-all duration-200 whitespace-nowrap flex-shrink-0"
            >
              {item.action}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
});

export default PendingActions;