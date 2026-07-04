import React from 'react';

interface ProfileCompletionCardProps {
    completionPercentage?: number;
}

export const ProfileCompletionCard: React.FC<ProfileCompletionCardProps> = ({
    completionPercentage = 12
}) => {
    return (
        <div
            className="rounded-3xl shadow-2xl border-2 overflow-hidden"
            style={{ backgroundColor: '#e0d8cf', borderColor: '#4a3728' }}
        >
            <div className="relative p-8">
                <div
                    className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
                    style={{
                        backgroundColor: '#4a3728',
                        transform: 'translate(50%, -50%)'
                    }}
                ></div>
                <div className="relative flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div
                                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
                                style={{ backgroundColor: '#f6ede8' }}
                            >
                                <i className="ri-account-pin-circle-fill"></i>
                            </div>
                            <div>
                                <h3 className="text-2xl font-black" style={{ color: '#4a3728' }}>
                                    Complete Your Profile!
                                </h3>
                                <p className="text-sm opacity-70" style={{ color: '#4a3728' }}>
                                    Unlock more networking opportunities
                                </p>
                            </div>
                        </div>

                        <div className="relative mb-6">
                            <div
                                className="w-full h-3 rounded-full overflow-hidden"
                                style={{ backgroundColor: '#f6ede8' }}
                            >
                                <div
                                    className="h-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-full shadow-inner transition-all duration-1000"
                                    style={{ width: `${completionPercentage}%` }}
                                ></div>
                            </div>
                        </div>

                        <button
                            className="group relative overflow-hidden px-8 py-4 rounded-2xl font-black text-white shadow-2xl transform hover:scale-105 transition-all duration-300"
                            style={{
                                background: 'linear-gradient(135deg, #4a3728 0%, #6b4e3d 50%, #8b6f47 100%)'
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                            <span className="relative">🎯 Boost My Profile</span>
                        </button>
                    </div>

                    <div className="text-center">
                        <div
                            className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black shadow-2xl mb-2"
                            style={{ backgroundColor: '#f6ede8', color: '#4a3728' }}
                        >
                            {completionPercentage}%
                        </div>
                        <div className="text-xs font-bold opacity-60" style={{ color: '#4a3728' }}>
                            Profile Score
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};