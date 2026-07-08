// src/profile/components/ProfileActions.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import OpenToModal from './OpenToModal';
import AddProfileSectionModal from './AddProfileSectionModal';
import EnhanceProfileModal from './EnhanceProfileModal';
import ResourcesModal from './ResourcesModal';

const ProfileActions: React.FC = () => {
    const [openToOpen, setOpenToOpen] = useState(false);
    const [addProfileSectionOpen, setAddProfileSectionOpen] = useState(false);
    const [enhanceProfileOpen, setEnhanceProfileOpen] = useState(false);
    const [resourcesOpen, setResourcesOpen] = useState(false);

    const isAnyModalOpen = openToOpen || addProfileSectionOpen || enhanceProfileOpen || resourcesOpen;

    useEffect(() => {
        if (isAnyModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isAnyModalOpen]);

    const buttons = [
        { label: 'Open to', setter: setOpenToOpen },
        { label: 'Add profile section', setter: setAddProfileSectionOpen },
        { label: 'Enhance profile', setter: setEnhanceProfileOpen },
        { label: 'Resources', setter: setResourcesOpen }
    ];

    return (
        <>
            <div className="bg-gradient-to-br from-[#f6ede8] to-[#e0d8cf] backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-8 border border-[#e0d8cf]/50">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {buttons.map((button, index) => (
                        <button
                            key={button.label}
                            onClick={() => button.setter(true)}
                            className="px-6 py-3 bg-[#4a3728] text-[#f6ede8] font-medium rounded-xl shadow-md hover:bg-[#6b4e31] hover:shadow-[0_0_15px_rgba(224,216,207,0.3)] transition-all duration-300 transform hover:scale-105 active:scale-95"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {button.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Modals */}
            <OpenToModal isOpen={openToOpen} onClose={() => setOpenToOpen(false)} />
            <AddProfileSectionModal isOpen={addProfileSectionOpen} onClose={() => setAddProfileSectionOpen(false)} />
            <EnhanceProfileModal isOpen={enhanceProfileOpen} onClose={() => setEnhanceProfileOpen(false)} />
            <ResourcesModal isOpen={resourcesOpen} onClose={() => setResourcesOpen(false)} />
        </>
    );
};

export default ProfileActions;