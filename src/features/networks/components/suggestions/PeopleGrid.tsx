import React from 'react';
import { Person } from '@/features/networks/types';
import { PersonCard } from './PersonCard';

interface PeopleGridProps {
    people: Person[];
    connectedUsers: Set<string>; // ✅ Changed from Set<number> to Set<string>
    onConnect: (userId: string) => void;
}

export const PeopleGrid: React.FC<PeopleGridProps> = ({
    people,
    connectedUsers,
    onConnect
}) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {people.map((person) => (
                <PersonCard
                    key={person.id}
                    person={person}
                    isConnected={connectedUsers.has(person.id)}
                    onConnect={onConnect}
                />
            ))}
        </div>
    );
};