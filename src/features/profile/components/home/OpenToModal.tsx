'use client';

import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

interface OpenToModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface MainFeature {
    id: string;
    title: string;
    icon: string;
    subFeatures: string[];
}

const OpenToModal: React.FC<OpenToModalProps> = ({ isOpen, onClose }) => {
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        job: true,
        hiring: false,
        services: false,
        volunteer: false
    });

    const mainFeatures: MainFeature[] = [
        {
            id: 'job',
            title: 'Finding a new job',
            icon: '💼',
            subFeatures: [
                'Job titles',
                'Location types (On-site/Hybrid/Remote)',
                'Locations (specific cities)',
                'Notice period',
                'Expected annual salary',
                'Start date (Immediate/Flexible)',
                'Full-time employment',
                'Part-time employment',
                'Contract employment',
                'Internship employment',
                'Temporary employment',
                'Privacy (Only visible to recruiters)'
            ]
        },
        {
            id: 'hiring',
            title: 'Hiring',
            icon: '👥',
            subFeatures: [
                'Share open roles',
                'Job title',
                'Location',
                'Employment type',
                'Job description',
                'Attract qualified candidates'
            ]
        },
        {
            id: 'services',
            title: 'Providing services',
            icon: '🛠️',
            subFeatures: [
                'Service description',
                'Service categories',
                'Portfolio/Work samples',
                'Search visibility',
                'Profile showcase',
                'Client outreach',
                'Pricing info'
            ]
        },
        {
            id: 'volunteer',
            title: 'Finding volunteer opportunities',
            icon: '🤝',
            subFeatures: [
                'Causes you care about',
                'Skills',
                'Volunteering preferences',
                'Nonprofit search visibility',
                'Profile display',
                'Time availability',
                'Remote/On-site preference'
            ]
        }
    ];

    const toggleSection = (id: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Transparent Overlay Background */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div 
                className="relative z-10 w-full max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl"
                style={{ maxHeight: '85vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
            >
                {/* Header */}
                <div className="flex items-center justify-between sticky top-0 bg-gradient-to-r from-[#4a3728] to-[#6a5748] px-6 py-5 z-10">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Open to</h2>
                        <p className="text-white/70 text-sm mt-1">Tell people what opportunities you're interested in</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>
                </div>

                {/* Content Body */}
                <div 
                    className="p-6"
                    style={{ flex: 1, overflowY: 'auto' }}
                >
                    <div className="space-y-4">
                        {mainFeatures.map((feature) => (
                            <div key={feature.id} className="border border-[#e0d8cf] rounded-xl overflow-hidden">
                                {/* Main Feature Header */}
                                <button
                                    onClick={() => toggleSection(feature.id)}
                                    className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-[#f6ede8] to-[#e0d8cf]/50 hover:from-[#f6ede8] hover:to-[#e0d8cf] transition-all duration-200 group"
                                >
                                    <div className="text-3xl flex-shrink-0">{feature.icon}</div>
                                    <div className="flex-1 text-left">
                                        <h3 className="text-lg font-semibold text-[#4a3728] group-hover:text-[#6a5748] transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm text-[#4a3728]/60 mt-0.5">
                                            {feature.subFeatures.length} features
                                        </p>
                                    </div>
                                    <ChevronDown
                                        className={`w-5 h-5 text-[#4a3728] flex-shrink-0 transition-transform duration-300 ${
                                            expandedSections[feature.id] ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>

                                {/* Sub-Features List */}
                                {expandedSections[feature.id] && (
                                    <div className="bg-white border-t border-[#e0d8cf]">
                                        <div className="p-4 space-y-3">
                                            {feature.subFeatures.map((subFeature, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-3 p-3 bg-[#f6ede8]/30 rounded-lg border border-[#e0d8cf]/50 hover:bg-[#f6ede8] transition-colors duration-200"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="w-5 h-5 accent-[#4a3728] rounded cursor-pointer flex-shrink-0"
                                                    />
                                                    <label className="text-sm font-medium text-[#4a3728] cursor-pointer flex-1">
                                                        {subFeature}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
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
                        Cancel
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-3 rounded-full bg-gradient-to-r from-[#4a3728] to-[#6a5748] text-white font-semibold hover:shadow-lg transition-all duration-200"
                    >
                        Apply Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OpenToModal;
