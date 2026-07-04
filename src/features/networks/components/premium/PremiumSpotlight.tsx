import React from 'react';
import { PremiumUser } from '@/features/networks/types';
import { SectionHeader } from '../ui/SectionHeader';
import { PremiumProfileCard } from './PremiumProfileCard';

interface PremiumSpotlightProps {
    profiles: PremiumUser[];
}

export const PremiumSpotlight: React.FC<PremiumSpotlightProps> = ({ profiles }) => {
    return (
        <div
            className="rounded-3xl shadow-2xl p-8 border-2"
            style={{ backgroundColor: '#e0d8cf', borderColor: '#4a3728' }}
        >
            <SectionHeader
                icon="⭐"
                title="Premium Spotlight"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {profiles.map((user, index) => (
                    <PremiumProfileCard key={index} user={user} />
                ))}
            </div>
        </div>
    );
};