import React from 'react';

export const PersonCardLoader: React.FC = () => {
    return (
        <div
            className="group relative overflow-hidden rounded-2xl shadow-xl"
            style={{ backgroundColor: '#f6ede8' }}
        >
            {/* Gradient overlay for shimmer effect */}
            <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"
                style={{
                    animation: 'shimmer 2s infinite',
                    backgroundPosition: '200% center',
                }}
            />

            <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-br from-[#4a3728] to-[#7a5c3e] rounded-bl-3xl"></div>
            </div>

            <div className="relative p-5 flex flex-col h-full">
                <div className="flex flex-col items-center text-center">
                    {/* Avatar Skeleton */}
                    <div className="relative mb-4">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#4a3728] to-[#7a5c3e] rounded-full blur-md opacity-20"></div>
                        <div className="w-16 h-16 rounded-full bg-[#e0d8cf] border-3 border-white shadow-xl relative z-10 animate-pulse"></div>
                    </div>

                    {/* Name Skeleton */}
                    <div className="w-24 h-5 bg-[#e0d8cf] rounded mb-3 animate-pulse"></div>

                    {/* Title Skeleton */}
                    <div className="space-y-1.5 mb-2 w-full">
                        <div className="w-full h-3 bg-[#e0d8cf] rounded animate-pulse"></div>
                        <div className="w-4/5 h-3 bg-[#e0d8cf] rounded mx-auto animate-pulse"></div>
                    </div>

                    {/* Location Skeleton */}
                    <div className="flex items-center gap-1 mb-4 justify-center w-full">
                        <div className="w-2 h-2 bg-[#e0d8cf] rounded-full animate-pulse"></div>
                        <div className="w-20 h-3 bg-[#e0d8cf] rounded animate-pulse"></div>
                    </div>

                    {/* Mutual Connections Skeleton */}
                    <div className="flex items-center gap-1 mb-4 justify-center">
                        <div className="flex -space-x-1">
                            <div className="w-4 h-4 bg-[#e0d8cf] rounded-full border border-white animate-pulse"></div>
                            <div className="w-4 h-4 bg-[#e0d8cf] rounded-full border border-white animate-pulse"></div>
                            <div className="w-4 h-4 bg-[#e0d8cf] rounded-full border border-white animate-pulse"></div>
                        </div>
                        <div className="w-12 h-3 bg-[#e0d8cf] rounded ml-1 animate-pulse"></div>
                    </div>

                    {/* Button Skeleton */}
                    <div className="w-full py-2.5 px-4 rounded-xl bg-[#e0d8cf] shadow-lg animate-pulse"></div>
                </div>
            </div>

            <style jsx>{`
                @keyframes shimmer {
                    0% {
                        background-position: -200% center;
                    }
                    100% {
                        background-position: 200% center;
                    }
                }
            `}</style>
        </div>
    );
};
