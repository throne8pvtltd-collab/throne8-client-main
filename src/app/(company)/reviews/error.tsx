'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#f6ede8] flex items-center justify-center">
      <div className="text-center">
        <p className="text-5xl mb-4">⚠️</p>
        <h1 className="text-xl font-semibold text-[#4a3728] mb-2">Something went wrong</h1>
        <p className="text-sm text-[#4a3728]/60 mb-8">An unexpected error occurred. Please try again.</p>
        <button
          onClick={reset}
          className="px-5 py-2.5 bg-[#4a3728] text-[#f6ede8] rounded-xl text-sm font-semibold hover:bg-[#6b4e3d] transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}