// src/components/ui/BlockLoader.tsx  ← rename to SkeletonLoader.tsx
export default function SkeletonLoader({
  count = 3,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white/70 rounded-2xl p-5 border border-white/60 shadow-md animate-pulse"
        >
          {/* Top row */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#e0d8cf]" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-[#e0d8cf] rounded-full w-2/5" />
              <div className="h-3 bg-[#e0d8cf] rounded-full w-1/4" />
            </div>
          </div>
          {/* Lines */}
          <div className="space-y-2 mb-4">
            <div className="h-3 bg-[#e0d8cf] rounded-full w-full" />
            <div className="h-3 bg-[#e0d8cf] rounded-full w-3/4" />
          </div>
          {/* Bottom blocks */}
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((j) => (
              <div key={j} className="h-8 bg-[#e0d8cf] rounded-lg" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}