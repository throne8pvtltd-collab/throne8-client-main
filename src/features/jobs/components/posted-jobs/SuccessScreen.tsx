import { memo } from 'react'
import Link from 'next/link'

interface Props {
  onPostAnother: () => void
}

// memo — this screen never changes after mount, no need to re-render
export const SuccessScreen = memo(function SuccessScreen({ onPostAnother }: Props) {
  return (
    <div className="min-h-screen bg-[#f7f3ef] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-[#2d1f14] rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl">
          ✓
        </div>
        <h2 className="font-black text-[#2d1f14] text-2xl mb-3">Job posted!</h2>
        <p className="text-[#6b5847] text-sm mb-2">
          Your listing is under review and will go live within <strong>2 hours</strong>.
        </p>
        <p className="text-[#9d8876] text-xs mb-8">
          We'll email you when it's published.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/jobs"
            className="px-5 py-2.5 bg-[#2d1f14] text-[#e0d8cf] text-sm font-bold rounded-xl hover:bg-[#4a3728] transition-colors"
          >
            Browse Jobs
          </Link>
          <button
            type="button"
            onClick={onPostAnother}
            className="px-5 py-2.5 border border-[#e8e0d6] text-[#6b5847] text-sm font-semibold rounded-xl hover:bg-white transition-colors"
          >
            Post Another
          </button>
        </div>
      </div>
    </div>
  )
})