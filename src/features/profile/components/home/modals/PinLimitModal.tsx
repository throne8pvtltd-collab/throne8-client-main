'use client';
import React from 'react';
import { X, AlertCircle } from 'lucide-react';

interface PinLimitModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PinLimitModal: React.FC<PinLimitModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative z-10 w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#4a3728] to-[#6a5748] px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <AlertCircle className="w-6 h-6 text-yellow-300" />
                            <h3 className="text-xl font-bold text-white">Pin Limit Reached</h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <p className="text-[#4a3728] text-base leading-relaxed mb-6">
                        You can only pin <span className="font-bold">2 skills</span> at a time.
                        Please unpin an existing skill before pinning a new one.
                    </p>

                    <button
                        onClick={onClose}
                        className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-[#4a3728] to-[#6a5748] text-white font-semibold hover:shadow-lg transition-all duration-200"
                    >
                        Got it
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PinLimitModal;