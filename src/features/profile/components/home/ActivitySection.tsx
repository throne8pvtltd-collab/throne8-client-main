// src/profile/components/ActivitySection.tsx
'use client';
import React, { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ShowAllActivityModal from './ShowAllActivityModal';
import CreatePostModal from './CreatePostModal';
import UpdatePostModal from './UpdatePostModal';
import PostCard from '../feed/PostCard';
import RepostWithPerspectiveModal from '../../../dashboard/components/feed/RepostWithPerspectiveModal';
import { useActivityHandlers } from '../../hooks/useActivityHandler';
import { ActivitySectionProps } from '../../types';
import { ACTIVITY_TABS } from '../../constants';
import { useConnectionsData } from '@/features/profile/hooks/useConnectionsData';
import ProfileService from '@/lib/api/profile.service';

// ─── Empty State ──────────────────────────────────────────────────────────────
const EmptyState = ({ label }: { label: string }) => (
    <div className="text-center py-14">
        <div className="w-16 h-16 bg-[#4a3728]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#4a3728]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
        </div>
        <p className="text-[#4a3728]/50 font-medium">{label}</p>
    </div>
);

// ─── Document Card (with eye/preview — same as modal) ────────────────────────
const DocumentCard = ({ post, doc }: { post: any; doc: any }) => {
    const [showPreview, setShowPreview] = useState(false);
    const previewUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(doc.cloudinarySecureUrl)}&embedded=true`;
    const fileSizeKB = doc.fileSize ? (doc.fileSize / 1024).toFixed(0) : '—';

    return (
        <div className="group bg-gradient-to-br from-[#e0d8cf]/60 via-[#e0d8cf]/40 to-[#f6ede8]/30 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-[#e0d8cf]/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#4a3728]/5 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
            <div className="flex items-start gap-5 relative z-10">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#4a3728] to-[#7a5c3e] rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-[#f6ede8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-[#4a3728] truncate">{doc.originalName}</h4>
                    <p className="text-sm text-[#4a3728]/60 mt-0.5">
                        {post.title} · {fileSizeKB} KB · {doc.format?.toUpperCase() || 'DOC'}
                    </p>
                    <div className="flex gap-3 mt-3 flex-wrap">
                        <button
                            onClick={() => setShowPreview(v => !v)}
                            className="px-4 py-2 bg-gradient-to-r from-[#4a3728] to-[#7a5c3e] text-[#f6ede8] rounded-xl text-sm font-semibold hover:opacity-90 transition-all duration-200 flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {showPreview ? 'Hide PDF' : 'View PDF'}
                        </button>
                        <a
                            href={doc.cloudinarySecureUrl}
                            download={doc.originalName}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 border-2 border-[#4a3728]/30 text-[#4a3728] rounded-xl text-sm font-semibold hover:border-[#4a3728]/60 hover:bg-[#4a3728]/5 transition-all duration-200 flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download
                        </a>
                    </div>
                </div>
            </div>
            {showPreview && (
                <div className="mt-5 rounded-xl overflow-hidden border-2 border-[#e0d8cf] relative z-10">
                    <div className="bg-[#4a3728]/5 px-4 py-2 flex items-center gap-2 border-b border-[#e0d8cf]">
                        <div className="w-2 h-2 rounded-full bg-[#4a3728]/40" />
                        <span className="text-xs font-semibold text-[#4a3728]/60 truncate">{doc.originalName}</span>
                    </div>
                    <iframe
                        src={previewUrl}
                        className="w-full h-[520px] bg-white"
                        title={doc.originalName}
                    />
                </div>
            )}
        </div>
    );
};

// ─── Repost Card ──────────────────────────────────────────────────────────────
const RepostCard = ({
    repost,
    onDeleteRepost,
}: {
    repost: any;
    onDeleteRepost?: (repostId: string) => Promise<any>;
}) => {
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const originalPost = repost.originalPost;
    if (!originalPost) return null;

    const handleDeleteRepost = async () => {
        if (!confirm('Remove this repost?')) return;
        try {
            setIsDeleting(true);
            await onDeleteRepost?.(repost.repostId);
        } catch (err) {
            alert('Failed to remove repost');
        } finally {
            setIsDeleting(false);
            setOpenMenuId(null);
        }
    };

    return (
        <div className="bg-gradient-to-br from-[#e0d8cf]/60 via-[#e0d8cf]/40 to-[#f6ede8]/30 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-[#e0d8cf]/40 overflow-hidden">
            {/* Repost Header */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#e0d8cf]/50">
                <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-full bg-[#4a3728]/20 flex items-center justify-center border-2 border-[#4a3728]/20">
                        <svg className="w-5 h-5 text-[#4a3728]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <p className="font-bold text-[#4a3728] text-sm truncate">You</p>
                            <span className="text-xs text-[#4a3728]/50 flex-shrink-0">reposted</span>
                        </div>
                        <p className="text-xs text-[#4a3728]/50 mt-0.5">
                            {repost.repostType === 'quote' ? 'Quote Repost' : 'Repost'} ·{' '}
                            {new Date(repost.createdAt).toLocaleDateString('en-US', {
                                month: 'short', day: 'numeric'
                            })}
                        </p>
                    </div>
                </div>

                {/* 3-dot menu */}
                <div className="relative flex-shrink-0">
                    <button
                        onClick={() => setOpenMenuId(openMenuId ? null : 'menu')}
                        className="p-2 hover:bg-[#4a3728]/10 rounded-full transition-all duration-200"
                    >
                        <svg className="w-5 h-5 text-[#4a3728]/60" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 8a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 8a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
                        </svg>
                    </button>
                    {openMenuId === 'menu' && (
                        <div className="absolute right-0 top-8 bg-white rounded-xl shadow-2xl border border-[#e0d8cf] z-50 min-w-[180px]">
                            <button
                                onClick={handleDeleteRepost}
                                disabled={isDeleting}
                                className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                {isDeleting ? 'Removing...' : 'Remove Repost'}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Quote thought (if quote repost) */}
            {repost.repostType === 'quote' && repost.thoughtText && (
                <p className="text-sm text-[#4a3728]/80 italic mb-4 px-2 border-l-2 border-[#4a3728]/30">
                    "{repost.thoughtText}"
                </p>
            )}

            {/* Original Post Content */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e0d8cf]/30">
                <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#4a3728]/10 flex items-center justify-center border-2 border-[#4a3728]/10">
                        <svg className="w-5 h-5 text-[#4a3728]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-bold text-[#4a3728] text-sm">
                            {originalPost.userId || 'User'}
                        </p>
                        <p className="text-xs text-[#4a3728]/50">
                            {new Date(originalPost.createdAt).toLocaleDateString('en-US', {
                                month: 'short', day: 'numeric'
                            })}
                        </p>
                    </div>
                </div>

                <h3 className="text-base font-bold text-[#4a3728] mb-2">{originalPost.title}</h3>

                {originalPost.content && (
                    <p className="text-sm text-[#4a3728]/70 leading-relaxed mb-3 line-clamp-3">
                        {originalPost.content}
                    </p>
                )}

                {/* Images if any */}
                {originalPost.images?.length > 0 && (
                    <img
                        src={originalPost.images[0].cloudinarySecureUrl}
                        alt={originalPost.title}
                        className="w-full h-40 object-cover rounded-lg mt-2"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                        }}
                    />
                )}

                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#e0d8cf]/30">
                    <span className="text-xs text-[#4a3728]/50 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {originalPost.likesCount || 0}
                    </span>
                    <span className="text-xs text-[#4a3728]/50 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        {originalPost.commentsCount || 0}
                    </span>
                </div>
            </div>
        </div>
    );
};

// ─── Video Card (same as modal) ───────────────────────────────────────────────
const VideoCard = ({ post, video }: { post: any; video: any }) => {
    const fileSizeMB = video.fileSize ? (video.fileSize / (1024 * 1024)).toFixed(1) : '—';
    const duration = video.duration
        ? `${Math.floor(video.duration / 60)}:${String(Math.floor(video.duration % 60)).padStart(2, '0')}`
        : '';

    return (
        <div className="group bg-gradient-to-br from-[#e0d8cf]/60 via-[#e0d8cf]/40 to-[#f6ede8]/30 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-[#e0d8cf]/40 relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#4a3728]/5 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-700 z-[1]" />
            <div className="relative">
                <video
                    controls
                    className="w-full h-64 object-cover bg-black"
                    src={video.cloudinarySecureUrl}
                    preload="metadata"
                />
                {duration && (
                    <div className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-semibold z-[2]">
                        {duration}
                    </div>
                )}
            </div>
            <div className="p-5 relative z-[1]">
                <h4 className="text-base font-bold text-[#4a3728] mb-1">{post.title}</h4>
                <div className="flex items-center gap-3 text-[#4a3728]/60 text-sm">
                    <span className="bg-[#4a3728]/10 px-2 py-0.5 rounded-lg font-semibold uppercase text-xs">{video.format || 'MP4'}</span>
                    <span>{fileSizeMB} MB</span>
                    <span className="truncate">{video.originalName}</span>
                </div>
            </div>
        </div>
    );
};

// ─── Image Card (same as modal) ───────────────────────────────────────────────
const ImageCard = ({ post, img }: { post: any; img: any }) => (
    <div className="group bg-gradient-to-br from-[#e0d8cf]/60 via-[#e0d8cf]/40 to-[#f6ede8]/30 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-500 border border-[#e0d8cf]/40">
        <div className="relative overflow-hidden h-56">
            <img
                src={img.cloudinarySecureUrl}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-4">
            <p className="text-[#4a3728] font-semibold text-sm truncate">{post.title}</p>
            <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-[#4a3728]/50 uppercase">{img.format}</span>
                <span className="text-xs text-[#4a3728]/50">{img.width}×{img.height}</span>
            </div>
        </div>
    </div>
);

// ─── Main ActivitySection ─────────────────────────────────────────────────────
const ActivitySection: React.FC<ActivitySectionProps> = ({
    posts,
    onPostCreated,
    isLoading = false,
    profileImage = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    fullName = '',
    headline = '',
    followers = 0,
    currentUserId,
    userReposts = [],
    isLoadingReposts = false,
    onCreateRepost,
    onDeleteRepost,
}) => {
    const [activeTab, setActiveTab] = useState('Posts');
    const [showAllModal, setShowAllModal] = useState(false);
    const [showCreatePostModal, setShowCreatePostModal] = useState(false);
    const [openRepostIndex, setOpenRepostIndex] = useState<number | null>(null);
    const [isRepostWithPerspectiveOpen, setIsRepostWithPerspectiveOpen] = useState(false);
    const [selectedRepostPost, setSelectedRepostPost] = useState<any>(null);
    const [userComments, setUserComments] = useState<any[]>([]);
    const [isLoadingUserComments, setIsLoadingUserComments] = useState(false);

    useEffect(() => {
        if (activeTab === 'Comments' && currentUserId) {
            const fetchMyComments = async () => {
                try {
                    setIsLoadingUserComments(true);
                    const response = await ProfileService.getMyComments();
                    setUserComments(response.data?.comments || response.data || []);
                } catch (error) {
                    console.error('Failed to load user comments:', error);
                } finally {
                    setIsLoadingUserComments(false);
                }
            };
            fetchMyComments();
        }
    }, [activeTab, currentUserId]);

    const formatRelativeTime = (dateStr: string) => {
        if (!dateStr) return 'Recently';
        const diffMs = Date.now() - new Date(dateStr).getTime();
        const mins = Math.floor(diffMs / 60000);
        const hours = Math.floor(mins / 60);
        const days = Math.floor(hours / 24);
        if (mins < 1) return 'Just now';
        if (mins < 60) return `${mins}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    };

    const handlers = useActivityHandlers({ posts, onPostCreated, profileImage });

    const repostedEntryIds = new Set(
    userReposts
        .map((r: any) => r.originalPost?.entryId)
        .filter(Boolean)
);
const filteredPosts = posts.filter(
    (p: any) => !repostedEntryIds.has(p.entryId || p.postId)
);
const hasMorePosts = (filteredPosts.length + userReposts.length) > 2;

const combinedItems = [
    ...userReposts.map((repost: any) => ({ type: 'repost', data: repost })),
    ...filteredPosts.map((post: any) => ({ type: 'post', data: post })),
];

const scrollRef = useRef<HTMLDivElement>(null);
const [showLeftArrow, setShowLeftArrow] = useState(false);
const [showRightArrow, setShowRightArrow] = useState(false);

const handleScroll = () => {
    if (scrollRef.current) {
        const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
        setShowLeftArrow(scrollLeft > 10);
        setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
};

useEffect(() => {
    const timer = setTimeout(() => {
        handleScroll();
    }, 200);
    return () => clearTimeout(timer);
}, [combinedItems.length]);

const scrollLeft = () => {
    if (scrollRef.current) {
        const { clientWidth } = scrollRef.current;
        scrollRef.current.scrollBy({ left: -clientWidth / 2, behavior: 'smooth' });
    }
};

const scrollRight = () => {
    if (scrollRef.current) {
        const { clientWidth } = scrollRef.current;
        scrollRef.current.scrollBy({ left: clientWidth / 2, behavior: 'smooth' });
    }
};

    const {
        followersList,
        isLoadingConnections,
        fetchConnectionsData,
    } = useConnectionsData();

    useEffect(() => {
        if (currentUserId) fetchConnectionsData(currentUserId);
    }, [currentUserId]);

    // ── Show All button ───────────────────────────────────────────
    const ShowAllButton = ({ label }: { label: string }) => (
        <button
            onClick={() => setShowAllModal(true)}
            className="w-full group bg-gradient-to-r from-[#4a3728]/10 via-[#4a3728]/5 to-[#e0d8cf]/20 hover:from-[#4a3728]/20 hover:via-[#4a3728]/15 hover:to-[#e0d8cf]/30 border-2 border-dashed border-[#4a3728]/30 hover:border-[#4a3728]/50 rounded-2xl p-6 transition-all duration-300 flex items-center justify-center gap-3"
        >
            <span className="text-[#4a3728] font-bold text-lg">{label}</span>
            <svg className="w-5 h-5 text-[#4a3728] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
        </button>
    );

    // ── Derived media lists (same logic as modal) ─────────────────
    const allVideos: { post: any; video: any }[] = posts.flatMap((p: any) =>
        (p.videos || []).map((v: any) => ({ post: p, video: v }))
    );
    const allImages: { post: any; img: any }[] = posts.flatMap((p: any) =>
        (p.images || []).map((img: any) => ({ post: p, img }))
    );
    const allDocuments: { post: any; doc: any }[] = posts.flatMap((p: any) =>
        (p.documents || []).map((doc: any) => ({ post: p, doc }))
    );

    // console.log('📊 [ActivitySection] Rendered with posts:', posts);

    const handleRepostInstant = async (idx: number) => {
        const post = posts[idx];
        if (!post) return;
        const postId = post.entryId || post.postId;
        try {
            await onCreateRepost?.(postId, 'repost');
            alert('Post reposted successfully!');
            onPostCreated?.();
        } catch (error: any) {
            if (error.message?.includes('already reposted')) {
                alert('You have already reposted this post');
            } else {
                alert(error.message || 'Repost failed');
            }
        } finally {
            setOpenRepostIndex(null);
        }
    };

    const openRepostWithPerspectiveModal = (post: any, idx: number) => {
        setSelectedRepostPost(post);
        setIsRepostWithPerspectiveOpen(true);
        setOpenRepostIndex(null);
    };

    const handleConfirmRepost = async (thoughts: string) => {
        if (!selectedRepostPost) return;
        const postId = selectedRepostPost.entryId || selectedRepostPost.postId;
        try {
            await onCreateRepost?.(postId, 'quote', thoughts);
            alert('Quote reposted successfully!');
            onPostCreated?.();
        } catch (error: any) {
            alert(error.message || 'Repost failed');
        } finally {
            setIsRepostWithPerspectiveOpen(false);
            setSelectedRepostPost(null);
        }
    };

    const handlePostAction = async (action: string, idx: number) => {
        const post = posts[idx];
        if (!post) return;
        const postId = post.entryId || post.postId;
        
        switch (action) {
            case 'pin':
                await handlers.handlePinPost(postId, post.isPinned || false);
                break;
            case 'save':
                await handlers.handleSavePost(postId, post.isSaved || false);
                break;
            case 'delete':
                await handlers.handleDeletePost(postId);
                break;
            case 'archive':
                await handlers.handleArchivePost(postId);
                break;
            case 'copy':
                try {
                    const postUrl = `${window.location.origin}/post/${postId}`;
                    await navigator.clipboard.writeText(postUrl);
                    alert('Post link copied to clipboard!');
                } catch (err) {
                    console.error('Failed to copy text: ', err);
                }
                break;
            case 'embed':
                try {
                    const embedCode = `<iframe src="${window.location.origin}/post/${postId}/embed" width="504" height="600" frameborder="0" style="border: 1px solid #e0d8cf; border-radius: 8px;"></iframe>`;
                    await navigator.clipboard.writeText(embedCode);
                    alert('Embed iframe code copied to clipboard!');
                } catch (err) {
                    console.error('Failed to copy embed code: ', err);
                }
                break;
            case 'analytics':
                alert(`Post Analytics:\n• Total Views: ${post.viewsCount || post.impressions || 0}\n• Likes: ${post.likesCount || post.likes || 0}\n• Comments: ${post.commentsCount || 0}`);
                break;
            case 'hide':
                await handlers.handleArchivePost(postId);
                break;
            default:
                break;
        }
    };

    return (
        <>
           <div id="activity-section" className="bg-gradient-to-br from-[#f6ede8]/90 via-[#f6ede8]/80 to-[#e0d8cf]/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-[#e0d8cf]/60 mb-8 relative overflow-hidden">
                {/* Background blobs */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#e0d8cf]/20 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#4a3728]/10 to-transparent rounded-full blur-2xl" />

                {/* ── Section Header ── */}
                <div className="flex justify-between items-center mb-6 relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-8 bg-gradient-to-b from-[#4a3728] to-[#7a5c3e] rounded-full" />
                        <h3 className="text-2xl font-bold text-[#4a3728] tracking-tight">Activity</h3>
                    </div>
                    <div className="flex items-center gap-2 bg-[#4a3728]/10 px-4 py-2 rounded-full backdrop-blur-sm">
                        <div className="w-2 h-2 bg-[#4a3728] rounded-full animate-pulse" />
                        <p className="text-sm font-semibold text-[#4a3728]">
                            {isLoadingConnections ? '...' : followersList.length} followers
                        </p>
                    </div>
                </div>

                {/* ── Tabs + Create Button ── */}
                <div className="flex justify-between items-center mb-8 relative z-10">
                    <div className="bg-[#e0d8cf]/50 backdrop-blur-sm rounded-2xl p-1">
                        <div className="flex">
                            {ACTIVITY_TABS.map((item) => (
                                <button
                                    key={item}
                                    onClick={() => setActiveTab(item)}
                                    className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 relative ${activeTab === item
                                        ? 'text-[#f6ede8] bg-[#4a3728] shadow-lg transform scale-105'
                                        : 'text-[#4a3728]/70 hover:text-[#4a3728] hover:bg-[#e0d8cf]/30'
                                        }`}
                                >
                                    {item}
                                    {activeTab === item && (
                                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-[#4a3728] rounded-full" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={() => setShowCreatePostModal(true)}
                        className="group px-6 py-3 bg-gradient-to-r from-[#4a3728] to-[#7a5c3e] text-[#f6ede8] rounded-2xl text-sm font-semibold transition-all duration-300 flex items-center gap-3 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#7a5c3e] to-[#4a3728] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <svg className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        <span className="relative z-10">Create a post</span>
                    </button>
                </div>

                {/* ── Tab Content ── */}
                <div className="space-y-6 relative z-10">

                    {/* ── POSTS ── */}
                    {activeTab === 'Posts' && (
                        <>
                            {isLoading ? (
                                <div className="flex justify-center items-center py-12">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a3728]" />
                                </div>
                            ) : combinedItems.length === 0 ? (
                                <EmptyState label="No posts yet. Create your first post!" />
                            ) : (
                                <>
                                    <div className="relative w-full group/slider">
                                        <style dangerouslySetInnerHTML={{__html: `
                                            .no-scrollbar::-webkit-scrollbar {
                                                display: none !important;
                                            }
                                        `}} />

                                        {/* Left Arrow Button */}
                                        {showLeftArrow && (
                                            <button
                                                onClick={scrollLeft}
                                                className="absolute left-[-16px] top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-neutral-100 text-[#4a3728] w-10 h-10 rounded-full flex items-center justify-center shadow-lg border border-[#e0d8cf] transition-all duration-200"
                                            >
                                                <ChevronLeft className="w-6 h-6" />
                                            </button>
                                        )}

                                        {/* Right Arrow Button */}
                                        {showRightArrow && (
                                            <button
                                                onClick={scrollRight}
                                                className="absolute right-[-16px] top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-neutral-100 text-[#4a3728] w-10 h-10 rounded-full flex items-center justify-center shadow-lg border border-[#e0d8cf] transition-all duration-200"
                                            >
                                                <ChevronRight className="w-6 h-6" />
                                            </button>
                                        )}

                                        {/* Scrollable Row */}
                                        <div
                                            ref={scrollRef}
                                            onScroll={handleScroll}
                                            className="flex flex-row overflow-x-auto gap-4 scroll-smooth pb-4 px-1 no-scrollbar"
                                            style={{
                                                scrollbarWidth: 'none',
                                                msOverflowStyle: 'none',
                                            }}
                                        >
                                            {combinedItems.map((item, idx) => {
                                                if (item.type === 'repost') {
                                                    return (
                                                        <div
                                                            key={`repost-${item.data.repostId}`}
                                                            className="w-[calc(100%-16px)] md:w-[calc(50%-8px)] flex-shrink-0"
                                                        >
                                                            <RepostCard
                                                                repost={item.data}
                                                                onDeleteRepost={onDeleteRepost}
                                                            />
                                                        </div>
                                                    );
                                                }

                                                const post = item.data;
                                                const postKey = post.entryId || post.postId;
                                                const originalIndex = posts.findIndex(p => (p.entryId || p.postId) === postKey);
                                                const idxToUse = originalIndex !== -1 ? originalIndex : idx;

                                                return (
                                                    <div
                                                        key={`post-${postKey}`}
                                                        className="w-[calc(100%-16px)] md:w-[calc(50%-8px)] flex-shrink-0"
                                                    >
                                                        <PostCard
                                                            post={post}
                                                            index={idxToUse}
                                                            profileImage={profileImage}
                                                            fullName={fullName}
                                                            headline={headline}
                                                            postLikes={handlers.postLikes}
                                                            openMenuId={handlers.openMenuId}
                                                            setOpenMenuId={handlers.setOpenMenuId}
                                                            onLikeToggle={handlers.handleLikeToggle}
                                                            onPinPost={handlers.handlePinPost}
                                                            onSavePost={handlers.handleSavePost}
                                                            onDeletePost={handlers.handleDeletePost}
                                                            onArchivePost={handlers.handleArchivePost}
                                                            onOpenUpdateModal={(i: any, title: any) => {
                                                                handlers.setUpdatePostId(i);
                                                                handlers.setUpdatePostTitle(title);
                                                                handlers.setShowUpdateModal(true);
                                                            }}
                                                            openCommentsIndex={handlers.openCommentsIndex === idxToUse ? postKey : null}
                                                            onToggleComments={handlers.toggleCommentsPanel}
                                                            commentsByPost={handlers.commentsByPost}
                                                            isLoadingComments={handlers.isLoadingComments}
                                                            isSubmittingComment={handlers.isSubmittingComment}
                                                            commentLikes={handlers.commentLikes}
                                                            formatCommentTime={handlers.formatCommentTime}
                                                            openCommentMenuIndex={handlers.openCommentMenuIndex}
                                                            toggleCommentMenu={handlers.toggleCommentMenu}
                                                            handleCommentAction={handlers.handleCommentAction}
                                                            editingCommentId={handlers.editingCommentId}
                                                            editCommentText={handlers.editCommentText}
                                                            setEditCommentText={handlers.setEditCommentText}
                                                            handleEditSubmit={handlers.handleEditSubmit}
                                                            isDeletingCommentId={handlers.isDeletingCommentId}
                                                            replyingToCommentId={handlers.replyingToCommentId}
                                                            setReplyingToCommentId={handlers.setReplyingToCommentId}
                                                            replyText={handlers.replyText}
                                                            setReplyText={handlers.setReplyText}
                                                            handleReplySubmit={handlers.handleReplySubmit}
                                                            likeCommentToggle={handlers.likeCommentToggle}
                                                            commentText={handlers.commentText}
                                                            setCommentText={handlers.setCommentText}
                                                            handleCommentSubmit={handlers.handleCommentSubmit}
                                                            replyingTo={handlers.replyingTo}
                                                            setReplyingTo={handlers.setReplyingTo}
                                                            showEmojiPicker={handlers.showEmojiPicker}
                                                            setShowEmojiPicker={handlers.setShowEmojiPicker}
                                                            handleEmojiClick={handlers.handleEmojiClick}
                                                            setIsDeletingCommentId={handlers.setIsDeletingCommentId}
                                                            currentUserId={currentUserId || ''}
                                                            isDarkMode={undefined}
                                                            likedPosts={handlers.postLikes}
                                                            handleLike={handlers.handleLikeToggle}
                                                            openMenuIndex={handlers.openMenuId}
                                                            openRepostIndex={openRepostIndex}
                                                            handlePostAction={handlePostAction}
                                                            toggleComments={(pid: string) => {
                                                                const pIdx = posts.findIndex(p => (p.entryId || p.postId) === pid);
                                                                if (pIdx !== -1) {
                                                                    handlers.toggleCommentsPanel(pIdx, pid);
                                                                }
                                                            }}
                                                            handleReply={handlers.setReplyingToCommentId}
                                                            handleCommentReaction={handlers.likeCommentToggle}
                                                            postComments={handlers.commentsByPost}
                                                            emojiList={undefined}
                                                            togglePostMenu={(i: number) => handlers.setOpenMenuId(handlers.openMenuId === i ? null : i)}
                                                            toggleRepostMenu={(i: number) => setOpenRepostIndex(openRepostIndex === i ? null : i)}
                                                            onOpenWithPerspectiveModal={openRepostWithPerspectiveModal}
                                                            handleRepostInstant={handleRepostInstant}
                                                            postCommentCounts={undefined}
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    {hasMorePosts && <ShowAllButton label={`Show All Posts (${filteredPosts.length + userReposts.length})`} />}
                                </>
                            )}
                        </>
                    )}

                    {activeTab === 'Comments' && (
                        <div className="space-y-6">
                            {isLoadingUserComments ? (
                                <div className="flex justify-center items-center py-12">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a3728]" />
                                </div>
                            ) : userComments.length === 0 ? (
                                <EmptyState label="Comments you've made will appear here." />
                            ) : (
                                <div className="space-y-4">
                                    {userComments.map((comment: any) => (
                                        <div
                                            key={comment.commentId}
                                            className="bg-white hover:bg-neutral-50/50 transition-colors p-6 rounded-2xl border border-[#e0d8cf]/40 shadow-sm flex flex-col gap-3"
                                        >
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={profileImage || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdYRNQDghH1JvFXro2Yz3iWNmmFAubFZ-RGQ&s'}
                                                    alt={fullName}
                                                    className="w-10 h-10 rounded-xl object-cover border border-[#4a3728]/20"
                                                />
                                                <div>
                                                    <h4 className="font-bold text-[#4a3728]">{fullName}</h4>
                                                    <p className="text-xs text-[#4a3728]/60">
                                                        {formatRelativeTime(comment.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-sm font-medium text-[#4a3728] pl-1">
                                                {comment.content}
                                            </div>
                                            <div className="flex items-center gap-4 text-xs text-[#4a3728]/50 pl-1 mt-1 border-t border-[#4a3728]/10 pt-2">
                                                <span className="flex items-center gap-1">
                                                    <i className="ri-heart-line text-sm"></i>
                                                    {comment.likesCount || 0} likes
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ── VIDEOS ── */}
                    {activeTab === 'Videos' && (
                        <div className="space-y-6">
                            {allVideos.length === 0 ? (
                                <EmptyState label="No videos uploaded yet." />
                            ) : (
                                <>
                                    {allVideos.slice(0, 2).map(({ post, video }, idx) => (
                                        <VideoCard key={`${post.entryId || post.postId}-${idx}`} post={post} video={video} />
                                    ))}
                                    {allVideos.length > 2 && (
                                        <ShowAllButton label={`Show All Videos (${allVideos.length})`} />
                                    )}
                                </>
                            )}
                        </div>
                    )}

                    {/* ── IMAGES ── */}
                    {activeTab === 'Images' && (
                        <div className="space-y-5">
                            {allImages.length === 0 ? (
                                <EmptyState label="No images uploaded yet." />
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                        {allImages.slice(0, 6).map(({ post, img }, idx) => (
                                            <ImageCard key={`${post.entryId || post.postId}-${idx}`} post={post} img={img} />
                                        ))}
                                    </div>
                                    {allImages.length > 6 && (
                                        <ShowAllButton label={`Show All Images (${allImages.length})`} />
                                    )}
                                </>
                            )}
                        </div>
                    )}

                    {/* ── DOCUMENTS ── */}
                    {activeTab === 'Documents' && (
                        <div className="space-y-5">
                            {allDocuments.length === 0 ? (
                                <EmptyState label="No documents uploaded yet." />
                            ) : (
                                <>
                                    {allDocuments.slice(0, 3).map(({ post, doc }, idx) => (
                                        <DocumentCard key={`${post.entryId || post.postId}-${idx}`} post={post} doc={doc} />
                                    ))}
                                    {allDocuments.length > 3 && (
                                        <ShowAllButton label={`Show All Documents (${allDocuments.length})`} />
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* ── Modals ── */}
            <ShowAllActivityModal
                isOpen={showAllModal}
                onClose={() => setShowAllModal(false)}
                activeSection={activeTab}
                posts={posts}
                postLikes={handlers.postLikes}
                onLikeToggle={handlers.handleLikeToggle}
            />

            <UpdatePostModal
                postId={posts[handlers.updatePostId || 0]?.entryId || posts[handlers.updatePostId || 0]?.postId || ''}
                isOpen={handlers.showUpdateModal}
                onClose={() => {
                    handlers.setShowUpdateModal(false);
                    handlers.setUpdatePostId(null);
                }}
                currentTitle={handlers.updatePostTitle}
                onUpdate={handlers.handleUpdatePost}
            />

            <CreatePostModal
                isOpen={showCreatePostModal}
                onClose={() => setShowCreatePostModal(false)}
                onSubmit={async () => {
                    setShowCreatePostModal(false);
                    onPostCreated?.();
                }}
            />

            <RepostWithPerspectiveModal
                isOpen={isRepostWithPerspectiveOpen}
                onClose={() => {
                    setIsRepostWithPerspectiveOpen(false);
                    setSelectedRepostPost(null);
                }}
                post={selectedRepostPost}
                onRepost={handleConfirmRepost}
                isDarkMode={false}
            />
        </>
    );
};

export default ActivitySection;