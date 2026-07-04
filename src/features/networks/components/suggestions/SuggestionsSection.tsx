import React, { useState } from 'react';
import { Person } from '@/features/networks/types';
import { SectionHeader } from '../ui/SectionHeader';
import { PeopleGrid } from './PeopleGrid';
import { PersonCardLoader } from './PersonCardLoader';

interface SuggestionsSectionProps {
    title?: string;
    people: Person[];
    connectedUsers: Set<string>; // ✅ Changed from Set<number> to Set<string>
    onConnect: (userId: string) => void; // ✅ Changed from number to string
    isLoading?: boolean;
}

export const SuggestionsSection: React.FC<SuggestionsSectionProps> = ({
    title = "People You May Know",
    people,
    connectedUsers,
    onConnect,
    isLoading = false
}) => {
    const [showAll, setShowAll] = useState(false);

    // ✅ Loading state
    if (isLoading) {
        return (
            <div
                className="rounded-3xl shadow-2xl p-8 border-2"
                style={{ backgroundColor: '#e0d8cf', borderColor: '#4a3728' }}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-12">
                    {[...Array(4)].map((_, index) => (
                        <PersonCardLoader key={index} />
                    ))}
                </div>
            </div>
        );
    }

    // ✅ Empty state
    if (people.length === 0) {
        return (
            <div
                className="rounded-3xl shadow-2xl p-8 border-2"
                style={{ backgroundColor: '#e0d8cf', borderColor: '#4a3728' }}
            >
                <SectionHeader
                    icon={<i className="ri-hand-coin-fill"></i>}
                    title={title}
                />
                <p className="text-center text-[#4a3728]/70 py-8 font-medium">
                    No users to show at the moment
                </p>
            </div>
        );
    }

    // ✅ Show first 4 or all based on state
    const displayedPeople = showAll ? people : people.slice(0, 4);

    return (
        <div
            className="relative rounded-3xl shadow-2xl p-8 border-2"
            style={{ backgroundColor: '#e0d8cf', borderColor: '#4a3728' }}
        >
            <SectionHeader
                icon={<i className="ri-hand-coin-fill"></i>}
                title={title}
                // actionLabel={people.length > 4 ? (showAll ? "Show Less" : "See all →") : undefined}
                // onActionClick={people.length > 4 ? () => setShowAll(!showAll) : undefined}
            />

            <PeopleGrid
                people={displayedPeople}
                connectedUsers={connectedUsers}
                onConnect={onConnect}
            />

            {/* ✅ Show More/Less Button - Only when people > 4 */}
            {people.length > 4 && ( // ✅ FIXED: 4 se jyada pe button show hoga
                <div className="absolute mt-10 top-0 right-10 text-center">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="ml-auto text-sm font-bold px-4 py-2 rounded-xl transition"
                        style={{ backgroundColor: '#f6ede8', color: '#4a3728' }}
                        // className="px-6 py-3 bg-[#4a3728] text-[#f6ede8] rounded-xl font-semibold hover:bg-[#3a2718] transition-all duration-300 shadow-lg"
                    >
                        {showAll ? "Hide ▲" : `Show more →`}
                    </button>
                </div>
            )}
        </div>
    );
};