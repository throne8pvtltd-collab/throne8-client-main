'use client';

import React, { useState, useRef, useEffect } from 'react';

interface PostMenuPopupProps {
    postId: string;
    currentPinState?: boolean;
    currentSaveState?: boolean;
    onPin?: (postId: string, isPinned: boolean) => void;
    onSave?: (postId: string, isSaved: boolean) => void;
    onUpdate?: () => void;
    onDelete?: (postId: string) => void;
    onArchive?: (postId: string, isArchived: boolean) => void;
    isOpen: boolean;
    onClose: () => void;

}

export default function PostMenuPopup({
    postId,
    currentPinState = false,
    currentSaveState = false,
    onPin,
    onSave,
    onUpdate,
    onDelete,
    onArchive,
    isOpen,
    onClose,
}: PostMenuPopupProps) {
    const [isPinned, setIsPinned] = useState(currentPinState);
    const [isSaved, setIsSaved] = useState(currentSaveState);
    const [isArchived, setIsArchived] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen, onClose]);

    const handlePin = () => {
        const newState = !isPinned;
        setIsPinned(newState);
        onPin?.(postId, newState);
    };

    const handleSave = () => {
        const newState = !isSaved;
        setIsSaved(newState);
        onSave?.(postId, newState);
    };

    const handleArchive = () => {
        const newState = !isArchived;
        setIsArchived(newState);
        onArchive?.(postId, newState);
    };

    if (!isOpen) return null;

    return (
        <div
            ref={menuRef}
            className="fixed top-12 right-16 bg-[#F6EDE8] rounded-xl shadow-2xl border border-[#e0d8cf]/50 z-[9999] w-56 overflow-hidden"
        >
            {/* Pin/Unpin */}
            <button
                onClick={handlePin}
                className="w-full px-4 py-3 flex items-center gap-3 text-[#4a3728]/80 hover:bg-[#f6ede8] hover:text-[#4a3728] transition-all duration-200 border-b border-[#e0d8cf]/30 group"
            >
                <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform"
                    fill={isPinned ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 5a2 2 0 012-2h6a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                </svg>
                <span className="text-sm font-medium flex-1 text-left">
                    {isPinned ? 'Unpin' : 'Pin'}
                </span>
            </button>

            {/* Save/Unsave */}
            <button
                onClick={handleSave}
                className="w-full px-4 py-3 flex items-center gap-3 text-[#4a3728]/80 hover:bg-[#f6ede8] hover:text-[#4a3728] transition-all duration-200 border-b border-[#e0d8cf]/30 group"
            >
                <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform"
                    fill={isSaved ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 5a2 2 0 012-2h6a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                </svg>
                <span className="text-sm font-medium flex-1 text-left">
                    {isSaved ? 'Unsave' : 'Save'}
                </span>
            </button>

            {/* Update */}
            <button
                onClick={() => {
                    onUpdate?.();
                    onClose();
                }}
                className="w-full px-4 py-3 flex items-center gap-3 text-[#4a3728]/80 hover:bg-[#f6ede8] hover:text-[#4a3728] transition-all duration-200 border-b border-[#e0d8cf]/30 group"
            >
                <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                </svg>
                <span className="text-sm font-medium flex-1 text-left">Update</span>
            </button>

            {/* Archive/Unarchive */}
            <button
                onClick={handleArchive}
                className="w-full px-4 py-3 flex items-center gap-3 text-[#4a3728]/80 hover:bg-[#f6ede8] hover:text-[#4a3728] transition-all duration-200 border-b border-[#e0d8cf]/30 group"
            >
                <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform"
                    fill={isArchived ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                </svg>
                <span className="text-sm font-medium flex-1 text-left">
                    {isArchived ? 'Unarchive' : 'Archive'}
                </span>
            </button>

            {/* Delete */}
            <button
                onClick={() => {
                    onDelete?.(postId);
                    onClose();
                }}
                className="w-full px-4 py-3 flex items-center gap-3 text-red-600 hover:bg-red-50 transition-all duration-200 group"
            >
                <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                </svg>
                <span className="text-sm font-medium flex-1 text-left">Delete</span>
            </button>
        </div>
    );
}
