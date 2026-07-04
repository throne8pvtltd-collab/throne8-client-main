'use client';
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface RepostWithPerspectiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: any;
  onRepost: (thoughts: string) => void;
  onOpenConfirmDialog?: () => void;
  isDarkMode: boolean;
}

const RepostWithPerspectiveModal: React.FC<RepostWithPerspectiveModalProps> = ({
  isOpen,
  onClose,
  post,
  onRepost,
  onOpenConfirmDialog,
  isDarkMode
}) => {
  const [thoughts, setThoughts] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleRepost = async () => {
    // If no thoughts provided, open confirmation dialog
    if (!thoughts.trim()) {
      onOpenConfirmDialog?.();
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    onRepost(thoughts);
    setThoughts('');
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
      <div
        className={`w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden ${
          isDarkMode ? 'bg-slate-800' : 'bg-white'
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-6 border-b ${
            isDarkMode ? 'border-slate-700 bg-slate-900' : 'border-[#4a3728]/10 bg-[#f6ede8]/50'
          }`}
        >
          <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-[#4a3728]'}`}>
            Repost with Perspective
          </h2>
          <button
            onClick={onClose}
            className={`p-1 rounded-lg transition-colors ${
              isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-[#e0d8cf]'
            }`}
          >
            <X size={24} className={isDarkMode ? 'text-slate-300' : 'text-[#4a3728]'} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* Original Post Display */}
          <div
            className={`p-4 rounded-2xl mb-6 ${
              isDarkMode ? 'bg-slate-700/50 border border-slate-600' : 'bg-[#e0d8cf]/30 border border-[#4a3728]/10'
            }`}
          >
            <div className="flex items-start gap-3 mb-3">
              <img
                src={post?.userAvatar || 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop'}
                alt="User"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-[#4a3728]'}`}>
                  {post?.userName || 'Sarah Wilson'}
                </p>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-[#4a3728]/60'}`}>
                  {post?.userRole || 'Product Designer'} • {post?.time || '2h ago'}
                </p>
              </div>
            </div>
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-200' : 'text-[#4a3728]'}`}>
              {post?.content || 'This is the original post content that you are reposting. Add your thoughts to share your perspective on this post.'}
            </p>
            {post?.image && (
              <img
                src={post.image}
                alt="Post"
                className="mt-3 rounded-lg w-full max-h-48 object-cover"
              />
            )}
          </div>

          {/* Your Thoughts Input */}
          <div className="space-y-2">
            <label className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-[#4a3728]'}`}>
              Add your perspective (optional)
            </label>
            <textarea
              value={thoughts}
              onChange={(e) => setThoughts(e.target.value)}
              placeholder="Share your thoughts on this post... (Leave empty to repost as-is)"
              className={`w-full p-4 rounded-xl border-2 resize-none focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-blue-500'
                  : 'bg-white border-[#4a3728]/20 text-[#4a3728] placeholder-[#4a3728]/50 focus:ring-blue-400'
              }`}
              rows={4}
            />
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-[#4a3728]/60'}`}>
              {thoughts.length} characters
            </p>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`flex gap-3 p-6 border-t ${
            isDarkMode ? 'border-slate-700 bg-slate-900' : 'border-[#4a3728]/10 bg-[#f6ede8]/50'
          }`}
        >
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${
              isDarkMode
                ? 'bg-slate-700 hover:bg-slate-600 text-white'
                : 'bg-[#e0d8cf] hover:bg-[#d4c9bd] text-[#4a3728]'
            } disabled:opacity-50`}
          >
            Cancel
          </button>
          <button
            onClick={handleRepost}
            disabled={isSubmitting}
            className={`flex-1 py-3 rounded-xl font-semibold text-white transition-colors bg-blue-500 hover:bg-blue-600 disabled:opacity-50`}
          >
            {isSubmitting ? 'Reposting...' : 'Repost'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RepostWithPerspectiveModal;
