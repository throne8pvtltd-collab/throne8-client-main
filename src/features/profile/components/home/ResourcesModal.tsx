'use client';

import React, { useState } from 'react';
import { X, ChevronDown, Share2, FileDown, Bookmark, Activity, Info } from 'lucide-react';

interface ResourcesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Resource {
    id: string;
    title: string;
    icon: React.ReactNode;
    action: () => void;
}

const ResourcesModal: React.FC<ResourcesModalProps> = ({ isOpen, onClose }) => {
    const [expandedResources, setExpandedResources] = useState<Record<string, boolean>>({
        message: false,
        pdf: false,
        saved: false,
        activity: false,
        about: false
    });

    const resources: Resource[] = [
        {
            id: 'message',
            title: 'Send profile in a message',
            icon: <Share2 className="w-6 h-6" />,
            action: () => console.log('Send profile')
        },
        {
            id: 'pdf',
            title: 'Save to PDF',
            icon: <FileDown className="w-6 h-6" />,
            action: () => console.log('Save to PDF')
        },
        {
            id: 'saved',
            title: 'Saved items',
            icon: <Bookmark className="w-6 h-6" />,
            action: () => console.log('View saved items')
        },
        {
            id: 'activity',
            title: 'Activity',
            icon: <Activity className="w-6 h-6" />,
            action: () => console.log('View activity')
        },
        {
            id: 'about',
            title: 'About this profile',
            icon: <Info className="w-6 h-6" />,
            action: () => console.log('About profile')
        }
    ];

    const toggleResource = (id: string) => {
        setExpandedResources(prev => ({
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
            <div className="relative z-10 w-full max-w-2xl mx-auto max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between sticky top-0 bg-gradient-to-r from-[#4a3728] to-[#6a5748] px-6 py-5 z-10">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Resources</h2>
                        <p className="text-white/70 text-sm mt-1">Manage and share your profile</p>
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
                        {resources.map((resource) => (
                            <div key={resource.id} className="border border-[#e0d8cf] rounded-xl overflow-hidden">
                                {/* Resource Header - Clickable */}
                                <button
                                    onClick={() => toggleResource(resource.id)}
                                    className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-[#f6ede8] to-[#e0d8cf]/50 hover:from-[#f6ede8] hover:to-[#e0d8cf] transition-all duration-200 group"
                                >
                                    <div className="text-[#4a3728] flex-shrink-0 group-hover:text-[#6a5748] transition-colors">
                                        {resource.icon}
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h3 className="text-lg font-semibold text-[#4a3728] group-hover:text-[#6a5748] transition-colors">
                                            {resource.title}
                                        </h3>
                                    </div>
                                    <ChevronDown
                                        className={`w-5 h-5 text-[#4a3728] flex-shrink-0 transition-transform duration-300 ${
                                            expandedResources[resource.id] ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>

                                {/* Resource Details - Expandable */}
                                {expandedResources[resource.id] && (
                                    <div className="bg-white border-t border-[#e0d8cf] p-4">
                                        <div className="space-y-3">
                                            {resource.id === 'message' && (
                                                <>
                                                    <p className="text-sm text-[#4a3728]/80 mb-3">
                                                        Share your profile link with a message to your connections
                                                    </p>
                                                    <button
                                                        onClick={() => {
                                                            resource.action();
                                                            toggleResource(resource.id);
                                                        }}
                                                        className="w-full px-4 py-2 bg-[#4a3728] text-white rounded-lg hover:bg-[#6a5748] transition-colors duration-200"
                                                    >
                                                        Send Message
                                                    </button>
                                                </>
                                            )}
                                            {resource.id === 'pdf' && (
                                                <>
                                                    <p className="text-sm text-[#4a3728]/80 mb-3">
                                                        Download your profile as a PDF document
                                                    </p>
                                                    <button
                                                        onClick={() => {
                                                            resource.action();
                                                            toggleResource(resource.id);
                                                        }}
                                                        className="w-full px-4 py-2 bg-[#4a3728] text-white rounded-lg hover:bg-[#6a5748] transition-colors duration-200"
                                                    >
                                                        Download PDF
                                                    </button>
                                                </>
                                            )}
                                            {resource.id === 'saved' && (
                                                <>
                                                    <p className="text-sm text-[#4a3728]/80 mb-3">
                                                        View all your saved items and collections
                                                    </p>
                                                    <button
                                                        onClick={() => {
                                                            resource.action();
                                                            toggleResource(resource.id);
                                                        }}
                                                        className="w-full px-4 py-2 bg-[#4a3728] text-white rounded-lg hover:bg-[#6a5748] transition-colors duration-200"
                                                    >
                                                        View Saved Items
                                                    </button>
                                                </>
                                            )}
                                            {resource.id === 'activity' && (
                                                <>
                                                    <p className="text-sm text-[#4a3728]/80 mb-3">
                                                        Check your profile activity and engagement stats
                                                    </p>
                                                    <button
                                                        onClick={() => {
                                                            resource.action();
                                                            toggleResource(resource.id);
                                                        }}
                                                        className="w-full px-4 py-2 bg-[#4a3728] text-white rounded-lg hover:bg-[#6a5748] transition-colors duration-200"
                                                    >
                                                        View Activity
                                                    </button>
                                                </>
                                            )}
                                            {resource.id === 'about' && (
                                                <>
                                                    <p className="text-sm text-[#4a3728]/80 mb-3">
                                                        Learn more about how profiles work and best practices
                                                    </p>
                                                    <button
                                                        onClick={() => {
                                                            resource.action();
                                                            toggleResource(resource.id);
                                                        }}
                                                        className="w-full px-4 py-2 bg-[#4a3728] text-white rounded-lg hover:bg-[#6a5748] transition-colors duration-200"
                                                    >
                                                        Learn More
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 px-6 py-4 border-t border-[#e0d8cf] bg-white">
                    <button
                        onClick={onClose}
                        className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-[#4a3728] to-[#6a5748] text-white font-semibold hover:shadow-lg transition-all duration-200"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResourcesModal;
