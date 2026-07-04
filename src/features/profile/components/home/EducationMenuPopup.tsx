'use client';

import React, { useState, useRef, useEffect } from 'react';
import AuthService from '@/lib/api/auth.service';
import { useEducation } from '@/features/profile/hooks/useEducation';

interface EducationMenuPopupProps {
    educationId: string;
    isOpen: boolean;
    onClose: () => void;
    onEducationDeleted?: () => void;
    onEducationArchived?: () => void;
}

export default function EducationMenuPopup({
    educationId,
    isOpen,
    onClose,
    onEducationDeleted,
    onEducationArchived,
}: EducationMenuPopupProps) {
    const [isArchiving, setIsArchiving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const { removeEducation, archiveEducationRecord } = useEducation();

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

    const handleArchive = async () => {
        if (isArchiving) return;

        try {
            setIsArchiving(true);
            await archiveEducationRecord(educationId).unwrap();

            if (onEducationArchived) {
                onEducationArchived();
            }

            onClose();
        } catch (error: any) {
            console.error('❌ [MENU] Failed to archive education:', error);
            alert(error.message || 'Failed to archive education');
        } finally {
            setIsArchiving(false);
        }
    };

    // Handle Delete
    const handleDelete = async () => {
        if (isDeleting) return;

        try {
            setIsDeleting(true);
            await removeEducation(educationId).unwrap();
            if (onEducationDeleted) {
                onEducationDeleted();
            }

            onClose();
        } catch (error: any) {
            console.error('❌ [MENU] Failed to delete education:', error);
            alert(error.message || 'Failed to delete education');
        } finally {
            setIsDeleting(false);
        }
    };


    if (!isOpen) return null;

    return (
        <>
            {/* Main Menu */}
            {!showDeleteConfirm && (
                <div
                    ref={menuRef}
                    className="fixed top-12 right-16 bg-[#F6EDE8] rounded-xl shadow-2xl border border-[#e0d8cf]/50 z-[9999] w-56 overflow-hidden"
                >
                    {/* Archive Button */}
                    <button
                        onClick={handleArchive}
                        disabled={isArchiving || isDeleting}
                        className="w-full px-4 py-3 flex items-center gap-3 text-[#4a3728]/80 hover:bg-[#f6ede8] hover:text-[#4a3728] transition-all duration-200 border-b border-[#e0d8cf]/30 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isArchiving ? (
                            <>
                                <div className="w-5 h-5 border-2 border-[#4a3728]/20 border-t-[#4a3728] rounded-full animate-spin" />
                                <span className="text-sm font-medium flex-1 text-left">
                                    Archiving...
                                </span>
                            </>
                        ) : (
                            <>
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
                                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                                    />
                                </svg>
                                <span className="text-sm font-medium flex-1 text-left">
                                    Archive Education
                                </span>
                            </>
                        )}
                    </button>

                    {/* Delete Button */}
                    <button
                        onClick={() => setShowDeleteConfirm(true)}
                        disabled={isArchiving || isDeleting}
                        className="w-full px-4 py-3 flex items-center gap-3 text-red-600 hover:bg-red-50 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
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
                        <span className="text-sm font-medium flex-1 text-left">Delete Education</span>
                    </button>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div
                    ref={menuRef}
                    className="fixed top-12 right-16 bg-white rounded-xl shadow-2xl border-2 border-red-200 z-[9999] w-72 overflow-hidden"
                >
                    <div className="p-4 bg-red-50 border-b border-red-200">
                        <h4 className="text-lg font-bold text-red-900 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            Delete Education?
                        </h4>
                    </div>

                    <div className="p-4">
                        <p className="text-sm text-gray-700 mb-2">
                            This action cannot be undone. This education record will be permanently deleted.
                        </p>
                        <p className="text-sm text-red-700 mb-4">
                            Are you sure you want to proceed?
                        </p>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                disabled={isDeleting}
                                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isDeleting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    'Delete'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

