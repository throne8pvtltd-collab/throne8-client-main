export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f7f3ef] animate-pulse">
      <div className="border-b border-[#d4c4b5] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#e0d8cf]" />
            <div className="flex-1 space-y-2">
              <div className="h-6 w-48 bg-[#e0d8cf] rounded-lg" />
              <div className="h-4 w-72 bg-[#e8ddd4] rounded-lg" />
              <div className="h-3 w-56 bg-[#e8ddd4] rounded-lg" />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex gap-6">
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({length:4}).map((_,i) => <div key={i} className="h-28 bg-white border border-[#d4c4b5] rounded-2xl" />)}
          </div>
          <div className="h-64 bg-white border border-[#d4c4b5] rounded-2xl" />
        </div>
        <div className="hidden lg:block w-72 space-y-4">
          {Array.from({length:3}).map((_,i) => <div key={i} className="h-36 bg-white border border-[#d4c4b5] rounded-2xl" />)}
        </div>
      </div>
    </div>
  )
}
