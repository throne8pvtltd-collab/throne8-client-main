import React from 'react';
import { PremiumUser } from '@/features/networks/types';

interface PremiumProfileCardProps {
    user: PremiumUser;
}

export const PremiumProfileCard: React.FC<PremiumProfileCardProps> = ({ user }) => {
    return (
        <div
            className="group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 transform hover:scale-105"
            style={{ backgroundColor: '#f6ede8' }}
        >
            {/* Premium gradient border */}
            <div className="absolute inset-0 bg-gradient-to-r from-#f6ede8 via-#e0d8cf to-#4a3728 p-0.5 rounded-2xl">
                <div className="w-full h-full rounded-2xl" style={{ backgroundColor: '#f6ede8' }}></div>
            </div>

            <div className="relative p-5">
                <div className="flex items-center justify-between mb-4">
                    <div className="relative">
                        <img
                            src={user.img}
                            alt={user.name}
                            className="w-14 h-14 rounded-full border-3 border-amber-300 object-cover shadow-lg"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/56';
                            }}
                        />
                    </div>
                    <div className="px-2 py-1 rounded-full text-xs font-bold text-amber-800 bg-gradient-to-r from-amber-200 to-orange-200">
                        ⭐ {user.badge}
                    </div>
                </div>

                <h3
                    className="text-lg font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-amber-600 group-hover:to-orange-600 transition-all duration-300"
                    style={{ color: '#4a3728' }}
                >
                    {user.name}
                </h3>

                <p className="text-sm opacity-80 mb-2 font-medium" style={{ color: '#4a3728' }}>
                    {user.title}
                </p>

                <p className="text-xs opacity-60 mb-3" style={{ color: '#4a3728' }}>
                    {user.stats}
                </p>

                <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                        {user.achievements.slice(0, 2).map((achievement, i) => (
                            <span
                                key={i}
                                className="text-xs px-2 py-1 rounded-full font-medium opacity-80"
                                style={{ backgroundColor: '#e0d8cf', color: '#4a3728' }}
                            >
                                {achievement}
                            </span>
                        ))}
                    </div>
                </div>

                <button className="w-full px-3 py-2 rounded-xl font-bold text-white shadow-lg transform transition-all duration-300 hover:scale-105 bg-gradient-to-r from-[#4a3728] to-[#7a5c3e] hover:from-[#4a3728] hover:to-[#7a5c3e]">
                    <span className="flex items-center justify-center gap-1 text-sm">
                        ⭐ View Profile
                    </span>
                </button>
            </div>
        </div>
    );
};