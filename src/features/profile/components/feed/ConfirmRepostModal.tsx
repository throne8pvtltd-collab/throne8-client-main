'use client';
import React from 'react';
import { X } from 'lucide-react';

interface ConfirmRepostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDarkMode: boolean;
}

const ConfirmRepostModal: React.FC<ConfirmRepostModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isDarkMode
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[101] p-4">
      <div
        className={`w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden ${
          isDarkMode ? 'bg-slate-800' : 'bg-white'
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-6 border-b ${
            isDarkMode ? 'border-slate-700 bg-slate-900' : 'border-[#4a3728]/10 bg-[#f6ede8]/50'
          }`}
        >
          <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-[#4a3728]'}`}>
            Confirm Repost
          </h2>
          <button
            onClick={onClose}
            className={`p-1 rounded-lg transition-colors ${
              isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-[#e0d8cf]'
            }`}
          >
            <X size={20} className={isDarkMode ? 'text-slate-300' : 'text-[#4a3728]'} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <div className="mb-4">
            <i className="ri-repeat-line text-4xl text-blue-500"></i>
          </div>
          <p className={`text-sm mb-2 ${isDarkMode ? 'text-slate-300' : 'text-[#4a3728]'}`}>
            Are you sure you want to repost this?
          </p>
          <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-[#4a3728]/60'}`}>
            This post will be shared instantly without any additional thoughts.
          </p>
        </div>

        {/* Footer */}
        <div
          className={`flex gap-3 p-6 border-t ${
            isDarkMode ? 'border-slate-700 bg-slate-900' : 'border-[#4a3728]/10 bg-[#f6ede8]/50'
          }`}
        >
          <button
            onClick={onClose}
            className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${
              isDarkMode
                ? 'bg-slate-700 hover:bg-slate-600 text-white'
                : 'bg-[#e0d8cf] hover:bg-[#d4c9bd] text-[#4a3728]'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-3 rounded-xl font-semibold text-white transition-colors bg-blue-500 hover:bg-blue-600`}
          >
            Repost
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRepostModal;
