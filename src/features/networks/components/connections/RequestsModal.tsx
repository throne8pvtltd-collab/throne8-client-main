import React from 'react';
import { ConnectionRequest, SentRequest, RequestTabType } from '@/features/networks/types';
import { ConnectionRequestCard } from './ConnectionRequestCard';

interface RequestsModalProps {
    show: boolean;
    activeTab: RequestTabType;
    setActiveTab: (tab: RequestTabType) => void;
    receivedRequests: ConnectionRequest[];
    sentRequests: SentRequest[];
    onAccept: (id: string) => void; // ✅ CHANGE: number → string
    onIgnore: (id: string) => void;
    onWithdraw: (id: string) => void;
}

export const RequestsModal: React.FC<RequestsModalProps> = ({
    show,
    activeTab,
    setActiveTab,
    receivedRequests,
    sentRequests,
    onAccept,
    onIgnore,
    onWithdraw
}) => {
    if (!show) return null;

    const tabs: RequestTabType[] = ["received", "sent"];

    return (
        <div
            className="mt-6 rounded-3xl p-6 shadow-xl border-2"
            style={{ backgroundColor: '#f6ede8', borderColor: '#4a3728' }}
        >
            {/* Tabs */}
            <div className="flex gap-6 mb-6 border-b pb-3">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`font-bold pb-2 transition ${activeTab === tab ? "border-b-4" : "opacity-60"
                            }`}
                        style={{ borderColor: '#4a3728', color: '#4a3728' }}
                    >
                        {tab === "received" ? "Received Requests" : "Sent Requests"}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="space-y-4">
                {activeTab === "received" ? (
                    receivedRequests.length === 0 ? (
                        <div className="py- text-center">
                            <div className="flex justify-center items-center gap-8">
                                <div
                                    className="w-4 h-4 rounded-full flex items-center justify-center text-3xl"
                                    style={{ backgroundColor: '#f6ede8', color: '#4a3728' }}
                                >
                                    <i className="ri-mail-check-line"></i>
                                </div>
                                <div className="text-lg font-semibold" style={{ color: '#4a3728' }}>
                                    No Pending Requests
                                </div>
                            </div>
                            <p className="text-sm opacity-70 mt-2" style={{ color: '#4a3728' }}>
                                You're all caught up! Check back later for new connection requests.
                            </p>
                        </div>
                    ) : (
                        receivedRequests.map(user => (
                            <ConnectionRequestCard
                                key={user.id}
                                user={user}
                                onAccept={onAccept}
                                onIgnore={onIgnore}
                                showActions={true}
                            />
                        ))
                    )
                ) : (
                    sentRequests.length === 0 ? (
                        <div className="text-center">
                            <div className="flex justify-center items-center gap-8">
                                <div
                                    className="w-4 h-4 rounded-full flex items-center justify-center text-3xl"
                                    style={{ backgroundColor: '#f6ede8', color: '#4a3728' }}
                                >
                                    <i className="ri-send-plane-2-line"></i>
                                </div>
                                <div className="text-lg font-semibold" style={{ color: '#4a3728' }}>
                                    No Pending Requests
                                </div>
                            </div>
                            <p className="text-sm opacity-70 mt-2" style={{ color: '#4a3728' }}>
                                You're all caught up! Check back later for new connection requests.
                            </p>
                        </div>
                    ) : (
                        sentRequests.map(user => (
                            <div
                                key={user.id}
                                className="flex items-center justify-between p-4 rounded-2xl cursor-pointer hover:scale-[1.01] transition shadow"
                                style={{ backgroundColor: '#e0d8cf' }}
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
                                    </div>
                                </div>

                                <button
                                    onClick={() => onWithdraw(user.id)}
                                    className="px-4 py-2 rounded-xl text-sm font-bold text-white"
                                    style={{
                                        background: 'linear-gradient(135deg, #4a3728, #7a5c3e)'
                                    }}
                                >
                                    Withdraw
                                </button>
                            </div>
                        ))
                    )
                )}
            </div>
        </div>
    );
};