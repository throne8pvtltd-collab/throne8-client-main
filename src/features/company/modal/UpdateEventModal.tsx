'use client';

import { memo, useState, useCallback, useEffect } from 'react';
import type { Event } from '@/features/company/store/slices/eventSlice';

interface UpdateEventModalProps {
  isOpen: boolean;
  event: Event | null;
  onClose: () => void;
  onSubmit: (id: string, title: string, description: string) => void;
  isLoading?: boolean;
}

const UpdateEventModal = memo(function UpdateEventModal({
  isOpen,
  event,
  onClose,
  onSubmit,
  isLoading = false,
}: UpdateEventModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Initialize form when event changes
  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description || '');
    }
  }, [event, isOpen]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (event && title.trim()) {
        onSubmit(event.id, title, description);
        setTitle('');
        setDescription('');
      }
    },
    [event, title, description, onSubmit]
  );

  const handleClose = useCallback(() => {
    setTitle('');
    setDescription('');
    onClose();
  }, [onClose]);

  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-bold text-gray-800">Update Event</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
              Event Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
          </div>

          {/* Description Field */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter event description"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              disabled={isLoading}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !title.trim()}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default UpdateEventModal;
