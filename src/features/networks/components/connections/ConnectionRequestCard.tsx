import React from 'react';
import { ConnectionRequest } from '@/features/networks/types';

interface ConnectionRequestCardProps {
    user: ConnectionRequest;
    onAccept: (id: string) => void; 
    onIgnore: (id: string) => void;
    showActions?: boolean;
}

export const ConnectionRequestCard: React.FC<ConnectionRequestCardProps> = ({
    user,
    onAccept,
    onIgnore,
    showActions = true
}) => {
    return (
        <div
            className="flex items-center justify-between p-4 rounded-2xl shadow-lg"
            style={{ backgroundColor: '#f6ede8' }}
        >
            <div className="flex items-center gap-4">
                <img
                    src={user.image}
                    alt={user.name}
                    className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                    <h4 className="font-bold" style={{ color: '#4a3728' }}>
                        {user.name}
                    </h4>
                    <p className="text-xs opacity-70" style={{ color: '#4a3728' }}>
                        {user.title}
                    </p>
                    <p className="text-xs opacity-50" style={{ color: '#4a3728' }}>
                        {user.mutuals}
                    </p>
                </div>
            </div>

            {showActions && (
                <div className="flex gap-3">
                    <button
                        onClick={() => onIgnore(user.id)}
                        className="px-4 py-2 rounded-xl text-sm font-bold border"
                        style={{ borderColor: '#4a3728', color: '#4a3728' }}
                    >
                        Ignore
                    </button>

                    <button
                        onClick={() => onAccept(user.id)}
                        className="px-4 py-2 rounded-xl text-sm font-bold text-white"
                        style={{
                            background: 'linear-gradient(135deg, #4a3728, #7a5c3e)'
                        }}
                    >
                        Accept
                    </button>
                </div>
            )}
        </div>
    );
};