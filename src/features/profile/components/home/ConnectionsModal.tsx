'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface User {
    id: string;
    name: string;
    headline: string;
    image: string;
    isFollowing?: boolean;
}

interface ConnectionsModalProps {
    isOpen: boolean;
    onClose: () => void;
    following: User[];
    followers: User[];
    username?: string;
}

const ConnectionsModal: React.FC<ConnectionsModalProps> = ({
    isOpen,
    onClose,
    following,
    followers,
    username = 'User',
}) => {
    const [activeTab, setActiveTab] = useState<'following' | 'followers'>('followers');
    const [followingList, setFollowingList] = useState<User[]>(following);
    const [followersList, setFollowersList] = useState<User[]>(followers);

    // ✅ ADD THIS useEffect - Sync state with props when they change
    useEffect(() => {
        setFollowingList(following);
        setFollowersList(followers);
    }, [following, followers]);

    // ✅ Reset to followers tab when modal opens
    useEffect(() => {
        if (isOpen) {
            setActiveTab('followers');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleFollowToggle = (userId: string, isFollowing: boolean) => {
        if (activeTab === 'following') {
            setFollowingList(prev =>
                prev.map(user =>
                    user.id === userId ? { ...user, isFollowing: !isFollowing } : user
                )
            );
        } else {
            setFollowersList(prev =>
                prev.map(user =>
                    user.id === userId ? { ...user, isFollowing: !isFollowing } : user
                )
            );
        }
    };

    const displayUsers = activeTab === 'following' ? followingList : followersList;
    const tabCount = activeTab === 'following' ? followingList.length : followersList.length;


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Transparent Overlay Background */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative z-10 w-full max-w-2xl mx-auto max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between sticky top-0 bg-gradient-to-r from-[#4a3728] to-[#6a5748] px-6 py-5 z-10">
                    <div>
                        <h2 className="text-2xl font-bold text-white">{username}'s Connections</h2>
                        <p className="text-white/70 text-sm mt-1">View your following and followers</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-[#e0d8cf] sticky top-[73px] z-10 bg-white">
                    <button
                        onClick={() => setActiveTab('following')}
                        className={`flex-1 px-6 py-4 text-center font-semibold transition-all duration-200 relative ${activeTab === 'following'
                            ? 'text-[#4a3728]'
                            : 'text-[#4a3728]/50 hover:text-[#4a3728]/70'
                            }`}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <span className="text-lg">👥</span>
                            <span>Following</span>
                            <span className="ml-2 text-sm font-bold bg-[#f6ede8] px-3 py-1 rounded-full">
                                {followingList.length}
                            </span>
                        </div>
                        {activeTab === 'following' && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4a3728] to-[#6a5748] rounded-t-full"></div>
                        )}
                    </button>

                    <button
                        onClick={() => setActiveTab('followers')}
                        className={`flex-1 px-6 py-4 text-center font-semibold transition-all duration-200 relative ${activeTab === 'followers'
                            ? 'text-[#4a3728]'
                            : 'text-[#4a3728]/50 hover:text-[#4a3728]/70'
                            }`}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <span className="text-lg">⭐</span>
                            <span>Followers</span>
                            <span className="ml-2 text-sm font-bold bg-[#f6ede8] px-3 py-1 rounded-full">
                                {followersList.length}
                            </span>
                        </div>
                        {activeTab === 'followers' && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4a3728] to-[#6a5748] rounded-t-full"></div>
                        )}
                    </button>
                </div>

                {/* Content Area */}
                <div className="overflow-y-auto max-h-[calc(90vh-150px)]">
                    {displayUsers.length > 0 ? (
                        <div className="p-6 space-y-4">
                            {displayUsers.map((user) => (
                                <div
                                    key={user.id}
                                    className="flex items-center gap-4 p-4 rounded-2xl border border-[#e0d8cf] bg-white/50 hover:bg-gradient-to-r hover:from-[#f6ede8] hover:to-white transition-all duration-300 group"
                                >
                                    {/* Profile Image */}
                                    <div className="flex-shrink-0">
                                        <img
                                            src={user.image}
                                            alt={user.name}
                                            className="w-16 h-16 rounded-xl object-cover border-2 border-[#e0d8cf] group-hover:border-[#4a3728] transition-all duration-300 group-hover:shadow-lg"
                                        />
                                    </div>

                                    {/* User Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-bold text-[#4a3728] group-hover:text-[#5a4738] transition-colors">
                                            {user.name}
                                        </h3>
                                        <p className="text-sm text-[#4a3728]/70 line-clamp-2 mt-1">
                                            {user.headline}
                                        </p>
                                    </div>

                                    {/* Action Button */}
                                    <div className="flex-shrink-0">
                                        <button
                                            onClick={() =>
                                                handleFollowToggle(user.id, user.isFollowing || false)
                                            }
                                            className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${user.isFollowing
                                                ? 'bg-[#4a3728] text-white hover:bg-[#3a2718] border border-[#4a3728]'
                                                : 'bg-white text-[#4a3728] border-2 border-[#4a3728] hover:bg-[#4a3728] hover:text-white'
                                                }`}
                                        >
                                            {user.isFollowing ? (
                                                <>
                                                    <span>✓</span> Following
                                                </>
                                            ) : (
                                                <>
                                                    <span>+</span> Follow
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="text-6xl mb-4">📭</div>
                            <h3 className="text-lg font-semibold text-[#4a3728]">
                                No {activeTab === 'following' ? 'Following' : 'Followers'} Yet
                            </h3>
                            <p className="text-sm text-[#4a3728]/60 mt-2">
                                {activeTab === 'following'
                                    ? 'Start following people to see them here'
                                    : "You don't have any followers yet"}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConnectionsModal;
