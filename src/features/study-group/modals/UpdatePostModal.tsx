'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface UpdatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: any;
  onUpdate: (postId: string, updatedData: { title: string; text: string; status: string }) => Promise<void>;
  onPublish?: (postId: string) => Promise<void>;
}

const UpdatePostModal: React.FC<UpdatePostModalProps> = ({
  isOpen,
  onClose,
  post,
  onUpdate,
  onPublish,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);

  // Reset state when modal opens or post changes
  useEffect(() => {
    if (isOpen && post) {
      setTitle(post.title || '');
      setContent(post.text || '');
      setStatus(post.status || 'draft');
      setError(null);
    }
  }, [isOpen, post]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) { setError('Title is required'); return; }

    setIsUpdating(true);
    setError(null);

    try {
      await onUpdate(post.id, {
        title: title.trim(),
        text: content.trim(),
        status,
      });
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Failed to update post');
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePublish = async () => {
    if (!onPublish) return;
    setIsPublishing(true);
    setError(null);
    try {
      await onPublish(post.postId || post.id);  // ✅ postId UUID use karo
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Failed to publish post');
    } finally {
      setIsPublishing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl w-96 max-w-[90%] p-6 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#4a3728]">Update Post</h2>
          <button
            onClick={onClose}
            disabled={isUpdating}
            className="text-[#4a3728]/50 hover:text-[#4a3728] transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-semibold text-[#4a3728] mb-2">
              Post Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              disabled={isUpdating}
              className="w-full px-3 py-2 border border-[#e0d8cf] rounded-lg bg-white text-[#4a3728]
                         placeholder:text-[#4a3728]/40 focus:outline-none focus:border-[#4a3728]
                         disabled:bg-[#f6ede8] disabled:opacity-50 transition-colors"
            />
          </div>

          {/* Content Field */}
          <div>
            <label className="block text-sm font-semibold text-[#4a3728] mb-2">
              Post Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter post content"
              disabled={isUpdating}
              rows={5}
              className="w-full px-3 py-2 border border-[#e0d8cf] rounded-lg bg-white text-[#4a3728]
                         placeholder:text-[#4a3728]/40 focus:outline-none focus:border-[#4a3728]
                         disabled:bg-[#f6ede8] disabled:opacity-50 transition-colors resize-none"
            />
          </div>

          {/* Status section */}
          <div className="space-y-2">
            {/* Status Toggle */}
            <div className="flex items-center justify-between bg-[#f6ede8]/50 p-3 rounded-lg border border-[#e0d8cf]">
              <label className="text-sm font-semibold text-[#4a3728]">Status</label>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${status === 'draft'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-green-100 text-green-700'
                  }`}>
                  {status}
                </span>
               
              </div>
            </div>

            {/* ✅ Publish button — sirf draft posts ke liye */}
            {status === 'draft' && onPublish && (
              <button
                type="button"
                onClick={handlePublish}
                disabled={isUpdating || isPublishing}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5
                 bg-[#4a3728] text-white rounded-lg hover:bg-[#4a3728]/90
                 transition-colors disabled:opacity-50 text-sm font-semibold">
                {isPublishing ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10"
                        stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 8 12 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Publishing...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M5 13l4 4L19 7" />
                    </svg>
                    Publish Now
                  </>
                )}
              </button>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isUpdating}
              className="flex-1 px-4 py-2 border border-[#e0d8cf] text-[#4a3728] rounded-lg
                         hover:bg-[#f6ede8] transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="flex-1 px-4 py-2 bg-[#4a3728] text-white rounded-lg
                         hover:bg-[#4a3728]/90 transition-colors disabled:opacity-50
                         font-semibold"
            >
              {isUpdating ? 'Updating...' : 'Update Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePostModal;
