import React from 'react';
import { TabType } from '@/features/networks/types';

interface NetworkTabProps {
    activeTab: TabType;
    setActiveTab: (tab: TabType) => void;
}

export const NetworkTab: React.FC<NetworkTabProps> = ({ activeTab, setActiveTab }) => {
    const tabs: TabType[] = ['grow', 'catchup'];

    return (
        <div
            className="rounded-3xl shadow-2xl p-8 border-2 relative overflow-hidden"
            style={{ backgroundColor: '#e0d8cf', borderColor: '#4a3728' }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-5"></div>
            <div className="relative flex gap-8">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`relative font-black text-lg pb-4 transition-all duration-300 ${activeTab === tab ? 'transform scale-110' : 'opacity-60 hover:opacity-100'
                            }`}
                        style={{ color: '#4a3728' }}
                    >
                        {tab === 'grow' ? 'Grow' : 'Catch Up'}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#4a3728] to-[#7a5c3e] rounded-full shadow-lg"></div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};