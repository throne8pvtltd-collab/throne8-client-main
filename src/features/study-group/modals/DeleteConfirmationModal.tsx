'use client';

import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
  postTitle?: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
  postTitle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl w-96 max-w-[90%] p-6 animate-in fade-in zoom-in-95">
        {/* Header with Icon */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-lg font-bold text-[#4a3728]">Delete Post</h2>
          </div>
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="text-[#4a3728]/50 hover:text-[#4a3728] transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message */}
        <div className="mb-6">
          <p className="text-sm text-[#4a3728]/80 mb-2">
            Are you sure you want to delete this post? This action cannot be undone.
          </p>
          {postTitle && (
            <p className="text-xs text-[#4a3728]/60 bg-[#f6ede8] p-2 rounded border border-[#e0d8cf]">
              <strong>Post:</strong> {postTitle}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 px-4 py-2 border border-[#e0d8cf] text-[#4a3728] rounded-lg
                       hover:bg-[#f6ede8] transition-colors disabled:opacity-50 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg
                       hover:bg-red-600 transition-colors disabled:opacity-50 font-medium"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
