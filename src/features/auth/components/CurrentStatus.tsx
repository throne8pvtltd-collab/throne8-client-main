//  src/app/(auth)/_components/CurrentStatus.tsx
'use client';

import { useState } from 'react';
import {statuses} from '../data';



interface Props {
  onNext: (data: {
    status: string;        // ✅ For UI flow tracking
    userType: string;      // ✅ For server (same value)
  }) => void;
  onBack: () => void;
}

export default function CurrentStatus({ onNext, onBack }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleNext = () => {
    if (!selected) return;

    // ✅ Send both fields (status for UI, userType for server)
    onNext({
      status: selected,      // For UI flow control
      userType: selected     // For server validation (same value)
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-3">
        <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#4a3728] to-[#8b7355]">
          Your Current Status
        </h2>

        <div className="space-y-4">
          {statuses.map((status) => (
            <button
              key={status.id}
              type="button"
              onClick={() => setSelected(status.id)}
              className={`
                w-full p-6 rounded-2xl border-2 text-left transition-all shadow-sm
                ${selected === status.id
                  ? 'border-[#4a3728] bg-[#4a3728]/5 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }
              `}
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl">{status.icon}</span>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{status.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{status.desc}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-8 py-4 bg-gradient-to-r from-[#4a3728] to-[#8b7355] text-white border font-semibold border-gray-300 rounded-xl hover:bg-gray-50 transition"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={!selected}
            className={`
              px-8 py-4 rounded-xl font-semibold transition shadow-lg
              ${selected
                ? 'bg-gradient-to-r from-[#4a3728] to-[#8b7355] text-white hover:opacity-90'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
              }
            `}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}