import { memo } from 'react';

interface Props {
  counts: { published: number; draft: number; scheduled: number };
}

const ITEMS = [
  { key: 'published' as const, label: 'Published', color: 'text-green-600'  },
  { key: 'draft'     as const, label: 'Drafts',    color: 'text-yellow-600' },
  { key: 'scheduled' as const, label: 'Scheduled', color: 'text-blue-600'   },
];

// memo — static counts, never changes unless POSTS data changes
const PostStats = memo(function PostStats({ counts }: Props) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {ITEMS.map(s => (
        <div key={s.key} className="bg-[#f6ede8]/80 border border-[#e0d8cf] rounded-xl p-4 text-center">
          <p className={`text-2xl font-bold ${s.color}`}>{counts[s.key]}</p>
          <p className="text-xs text-[#4a3728]/60 mt-0.5">{s.label}</p>
        </div>
      ))}
    </div>
  );
});

export default PostStats;