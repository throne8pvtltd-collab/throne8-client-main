'use client';

import { VerificationStatus } from '../../types';

const CONFIG: Record<VerificationStatus, { label: string; className: string }> = {
  pending: { label: 'Pending Verification', className: 'bg-yellow-100 text-yellow-700' },
  verified: { label: '✓ Verified', className: 'bg-green-100 text-green-700' },
  unverified: { label: 'Not Verified', className: 'bg-gray-100 text-gray-600' },
};

export function VerificationSection({ status }: { status: VerificationStatus }) {
  return (
    <div className="bg-[#f6ede8]/80 border border-[#e0d8cf] rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-[#4a3728]">Verification Status</h3>
          <p className="text-xs text-[#4a3728]/60 mt-0.5">Verified companies get a badge on their profile</p>
        </div>
        <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${CONFIG[status].className}`}>{CONFIG[status].label}</span>
      </div>
      {status !== 'verified' && (
        <button type="button" className="mt-4 text-xs font-semibold text-[#4a3728] bg-[#e0d8cf] px-4 py-2 rounded-xl hover:bg-[#4a3728] hover:text-[#f6ede8] transition-all duration-200">
          Request Verification
        </button>
      )}
    </div>
  );
}