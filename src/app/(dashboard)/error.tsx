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
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8">
      <h2 className="mb-4 text-3xl font-bold text-red-600">Something went wrong!</h2>
      <p className="mb-8 text-gray-600">{error.message || 'An unexpected error occurred.'}</p>
      <button
        onClick={() => reset()}
        className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition"
      >
        Try again
      </button>
    </div>
  );
}