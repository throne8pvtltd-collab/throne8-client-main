'use client';

import AuthService from '@/lib/api/auth.service';
import ProfileService from '@/lib/api/profile.service';
import React, { useState, useRef, useEffect } from 'react';

interface UpdatePostModalProps {
    postId: string;
    isOpen: boolean;
    onClose: () => void;
    currentTitle: string;
    onUpdate: (postId: string, newTitle: string) => void;
}

export default function UpdatePostModal({
    postId,
    isOpen,
    onClose,
    currentTitle,
    onUpdate,
}: UpdatePostModalProps) {
    const [title, setTitle] = useState(currentTitle);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        setTitle(currentTitle);
    }, [currentTitle, isOpen]);

    // Close modal when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            // Focus input when modal opens
            setTimeout(() => inputRef.current?.focus(), 100);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen, onClose]);

    const handleSubmit = async () => {
        if (!title.trim()) {
            alert('Title cannot be empty');
            return;
        }

        setIsSubmitting(true);
        try {
            // ✅ Call API
            await ProfileService.updatePost(postId, { title: title.trim() });

            onUpdate(postId, title);  // ✅ Pass postId
            onClose();

            // console.log('✅ Post updated successfully');
        } catch (error: any) {
            console.error('❌ Update failed:', error);
            alert(error.message || 'Failed to update post');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            handleSubmit();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[10000] flex items-center justify-center p-4">
            <div
                ref={modalRef}
                className="bg-white rounded-2xl shadow-2xl border border-[#e0d8cf]/60 w-full max-w-md overflow-hidden transform transition-all duration-300 scale-100"
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-[#4a3728] to-[#7a5c3e] px-6 py-4">
                    <h2 className="text-xl font-bold text-[#f6ede8]">Update Post Title</h2>
                </div>

                {/* Body */}
                <div className="p-6">
                    <label className="block text-sm font-semibold text-[#4a3728] mb-3">
                        Post Title
                    </label>
                    <textarea
                        ref={inputRef}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter your post title here..."
                        className="w-full px-4 py-3 border border-[#e0d8cf]/50 rounded-xl text-[#4a3728] placeholder-[#4a3728]/40 focus:outline-none focus:ring-2 focus:ring-[#4a3728]/30 focus:border-transparent resize-none transition-all duration-200"
                        rows={4}
                    />
                    <p className="text-xs text-[#4a3728]/50 mt-2">
                        {title.length} characters
                    </p>
                </div>

                {/* Footer */}
                <div className="bg-[#f6ede8]/40 px-6 py-4 flex gap-3 justify-end border-t border-[#e0d8cf]/30">
                    <button
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="px-6 py-2 rounded-xl font-medium text-[#4a3728] bg-[#e0d8cf]/30 hover:bg-[#e0d8cf]/50 transition-all duration-200 disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="px-6 py-2 rounded-xl font-medium text-[#f6ede8] bg-gradient-to-r from-[#4a3728] to-[#7a5c3e] hover:shadow-lg transition-all duration-200 disabled:opacity-50 flex items-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Updating...
                            </>
                        ) : (
                            'Update'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
