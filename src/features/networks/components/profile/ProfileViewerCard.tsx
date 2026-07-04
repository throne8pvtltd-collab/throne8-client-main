import React from 'react';

export const ProfileViewerCard: React.FC = () => {
    return (
        <div 
            className="rounded-3xl shadow-2xl p-8 border-2 relative overflow-hidden"
            style={{ backgroundColor: '#f6ede8', borderColor: '#4a3728' }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-[#f6ede8]/50 via-transparent to-[#f6ede8]/50 opacity-30"></div>
            <div className="relative flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-2xl"
                        style={{ backgroundColor: '#e0d8cf' }}
                    >
                        <i className="ri-eye-fill"></i>
                    </div>
                    <div>
                        <h4 className="font-black text-xl mb-2" style={{ backgroundColor: '#f6ede8', color: '#4a3728' }}>
                            Who's Viewed Your Profile?
                        </h4>
                        <p className="text-sm opacity-70" style={{ color: '#4a3728' }}>
                            Discover who's interested in your professional journey
                        </p>
                    </div>
                </div>
                <button 
                    className="group relative overflow-hidden px-6 py-3 rounded-2xl font-black shadow-xl transform hover:scale-105 transition-all duration-300"
                    style={{ backgroundColor: '#e0d8cf', color: '#4a3728' }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#4a3728] to-[#7a5c3e] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative group-hover:text-white">🌟 Try Premium</span>
                </button>
            </div>
        </div>
    );
};