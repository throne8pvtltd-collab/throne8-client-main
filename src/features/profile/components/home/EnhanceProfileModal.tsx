'use client';

import React from 'react';
import { X, Star } from 'lucide-react';

interface EnhanceProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const EnhanceProfileModal: React.FC<EnhanceProfileModalProps> = ({ isOpen, onClose }) => {
    const enhancements = [
        {
            title: 'Premium Profile',
            description: 'Get a verified badge and stand out to employers and recruiters',
            icon: '⭐'
        },
        {
            title: 'Profile Banner',
            description: 'Add a custom banner image to make your profile more visually appealing',
            icon: '🖼️'
        },
        {
            title: 'Video Introduction',
            description: 'Record a 30-second video introduction to showcase your personality',
            icon: '🎥'
        },
        {
            title: 'Skills Endorsements',
            description: 'Get your skills endorsed by colleagues and connections',
            icon: '✨'
        }
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Transparent Overlay Background */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative z-10 w-full max-w-2xl mx-auto max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between sticky top-0 bg-gradient-to-r from-[#4a3728] to-[#6a5748] px-6 py-5 z-10">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Enhance Profile</h2>
                        <p className="text-white/70 text-sm mt-1">Discover ways to make your profile stand out</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>
                </div>

                {/* Content Body */}
                <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">
                    <div className="space-y-4">
                        {enhancements.map((enhancement, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-4 p-4 bg-gradient-to-br from-[#f6ede8]/50 to-[#e0d8cf]/30 rounded-xl border border-[#e0d8cf] hover:shadow-md transition-all duration-200 cursor-pointer hover:from-[#f6ede8] hover:to-[#e0d8cf]/50"
                            >
                                <div className="text-3xl flex-shrink-0">{enhancement.icon}</div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-[#4a3728]">{enhancement.title}</h3>
                                    <p className="text-sm text-[#4a3728]/70 mt-1">{enhancement.description}</p>
                                </div>
                                <Star className="w-6 h-6 text-[#4a3728]/30 flex-shrink-0 mt-1" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 flex gap-3 px-6 py-4 border-t border-[#e0d8cf] bg-white">
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-3 rounded-full border-2 border-[#e0d8cf] text-[#4a3728] font-semibold hover:bg-[#f6ede8]/50 transition-colors duration-200"
                    >
                        Maybe Later
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-3 rounded-full bg-gradient-to-r from-[#4a3728] to-[#6a5748] text-white font-semibold hover:shadow-lg transition-all duration-200"
                    >
                        Explore Options
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EnhanceProfileModal;
