// src/profile/components/useActivityHandlers.ts
import { useState, useEffect } from 'react';
import AuthService from '@/lib/api/auth.service';

import { useComments } from './useComments';
import { Post, PostLikeState } from '../types';
import ProfileService from '@/lib/api/profile.service';

interface UseActivityHandlersProps {
    posts: Post[];
    onPostCreated?: () => void;
    profileImage: string;
}

export const useActivityHandlers = ({
    posts,
    onPostCreated,
    profileImage
}: UseActivityHandlersProps) => {
    // ── Post UI state ──────────────────────────────────────────────
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updatePostId, setUpdatePostId] = useState<number | null>(null);
    const [updatePostTitle, setUpdatePostTitle] = useState('');
    const [deletingPostId, setDeletingPostId] = useState<string | null>(null);
    const [archivingPostId, setArchivingPostId] = useState<string | null>(null);
    const [postLikes, setPostLikes] = useState<PostLikeState>({});
    const [openCommentsIndex, setOpenCommentsIndex] = useState<number | null>(null);

    // ── Comment UI state ───────────────────────────────────────────
    const [commentText, setCommentText] = useState('');
    const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
    const [editCommentText, setEditCommentText] = useState('');
    const [openCommentMenuIndex, setOpenCommentMenuIndex] = useState<string | null>(null);
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyingToCommentId, setReplyingToCommentId] = useState<string | null>(null);
    const [replyText, setReplyText] = useState('');
    const [isDeletingCommentId, setIsDeletingCommentId] = useState<string | null>(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const {
        commentsByPost,
        isLoadingComments,
        isSubmittingComment,
        commentLikes,
        fetchCommentsByPost,
        createComment,
        createReply,
        updateComment,
        deleteComment,
        likeCommentToggle,
        formatCommentTime,
    } = useComments();

    // ── Sync postLikes from posts prop ────────────────────────────
    useEffect(() => {
        const likesMap: PostLikeState = {};
        posts.forEach(post => {
            const key = post.entryId || post.postId;
            likesMap[key] = {
                count: post.likes || 0,
                isLiked: post.isLiked || false,
            };
        });
        setPostLikes(likesMap);
    }, [posts]);

    // ── Post Handlers ─────────────────────────────────────────────
    const handleUpdatePost = async (postId: string, newTitle: string) => {
        try {
            await ProfileService.updatePost(postId, { title: newTitle });
            onPostCreated?.();
        } catch (error: any) {
            alert(error.message || 'Failed to update post');
        }
    };

    const handleDeletePost = async (postId: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return;
        try {
            setDeletingPostId(postId);
            await ProfileService.deletePost(postId, false);
            onPostCreated?.();
        } catch (error: any) {
            alert(error.message || 'Failed to delete post');
        } finally {
            setDeletingPostId(null);
            setOpenMenuId(null);
        }
    };

    const handleArchivePost = async (postId: string) => {
        try {
            setArchivingPostId(postId);
            await ProfileService.archivePost(postId);
            onPostCreated?.();
        } catch (error: any) {
            alert(error.message || 'Failed to archive post');
        } finally {
            setArchivingPostId(null);
        }
    };

    const handlePinPost = async (postId: string, currentPinState: boolean) => {
        try {
            await ProfileService.pinPost(postId, !currentPinState);
            onPostCreated?.();
        } catch (error: any) {
            alert(error.message || 'Failed to pin post');
        }
    };

    const handleSavePost = async (postId: string, currentSaveState: boolean) => {
        try {
            await ProfileService.savePost(postId, !currentSaveState);
            onPostCreated?.();
        } catch (error: any) {
            alert(error.message || 'Failed to save post');
        }
    };

    const handleLikeToggle = async (postId: string) => {
        const currentLike = postLikes[postId] || { count: 0, isLiked: false };
        const newIsLiked = !currentLike.isLiked;
        const newCount = newIsLiked ? currentLike.count + 1 : currentLike.count - 1;

        // Optimistic update
        setPostLikes(prev => ({ ...prev, [postId]: { count: newCount, isLiked: newIsLiked } }));

        try {
            if (newIsLiked) {
                await ProfileService.likePost(postId);
            } else {
                await ProfileService.unlikePost(postId);
            }
        } catch (error: any) {
            // Revert on failure
            setPostLikes(prev => ({ ...prev, [postId]: currentLike }));
            if (!error.message.includes('already liked') && !error.message.includes('not liked')) {
                alert(error.message || 'Failed to update like');
            }
        }
    };

    // ── Comment Handlers ──────────────────────────────────────────
    const toggleCommentsPanel = async (idx: number, postId: string) => {
        if (openCommentsIndex === idx) {
            setOpenCommentsIndex(null);
        } else {
            setOpenCommentsIndex(idx);
            if (postId && !commentsByPost[postId]) {
                await fetchCommentsByPost(postId);
            }
        }
    };

    const toggleCommentMenu = (commentId: string) => {
        setOpenCommentMenuIndex(prev => (prev === commentId ? null : commentId));
    };

    const handleCommentAction = async (action: string, commentId: string, text?: string) => {
        const postId = Object.keys(commentsByPost).find(pid =>
            commentsByPost[pid]?.some(c => c.commentId === commentId)
        );

        if (action === 'edit') {
            setEditingCommentId(commentId);
            setEditCommentText(text || '');
        } else if (action === 'delete') {
            if (!confirm('Delete this comment?') || !postId) return;
            try {
                setIsDeletingCommentId(commentId);
                await deleteComment(postId, commentId);
            } catch (error: any) {
                alert(error.message || 'Failed to delete comment');
            } finally {
                setIsDeletingCommentId(null);
            }
        }
        setOpenCommentMenuIndex(null);
    };

    const handleEditSubmit = async (commentId: string) => {
        if (!editCommentText.trim()) return;
        const postId = Object.keys(commentsByPost).find(pid =>
            commentsByPost[pid]?.some(c => c.commentId === commentId)
        );
        if (!postId) return;
        try {
            await updateComment(postId, commentId, editCommentText);
            setEditingCommentId(null);
            setEditCommentText('');
        } catch (error: any) {
            alert(error.message || 'Failed to update comment');
        }
    };

    const handleCommentSubmit = async (postId: string) => {
        if (!commentText.trim()) return;
        try {
            await createComment(postId, commentText);
            setCommentText('');
            setReplyingTo(null);
        } catch (error: any) {
            alert(error.message || 'Failed to post comment');
        }
    };

    const handleReplySubmit = async (postId: string, commentId: string) => {
        if (!replyText.trim()) return;
        try {
            await createReply(postId, commentId, replyText);
            setReplyText('');
            setReplyingToCommentId(null);
        } catch (error: any) {
            alert(error.message || 'Failed to post reply');
        }
    };

    const handleEmojiClick = (emoji: string) => {
        setCommentText(prev => prev + emoji);
        setShowEmojiPicker(false);
    };

    return {
        // Post state
        openMenuId, setOpenMenuId,
        showUpdateModal, setShowUpdateModal,
        updatePostId, setUpdatePostId,
        updatePostTitle, setUpdatePostTitle,
        deletingPostId,
        archivingPostId,
        postLikes,
        openCommentsIndex,

        // Comment state
        commentText, setCommentText,
        editingCommentId,
        editCommentText, setEditCommentText,
        openCommentMenuIndex,
        replyingTo, setReplyingTo,
        replyingToCommentId, setReplyingToCommentId,
        replyText, setReplyText,
        // ✅ FIXED: setIsDeletingCommentId ab return ho raha hai
        // (pehle sirf getter export tha, setter bhool gaya tha)
        isDeletingCommentId,
        setIsDeletingCommentId,
        showEmojiPicker, setShowEmojiPicker,

        // Comments hook data
        commentsByPost,
        isLoadingComments,
        isSubmittingComment,
        commentLikes,
        formatCommentTime,

        // Post handlers
        handleUpdatePost,
        handleDeletePost,
        handleArchivePost,
        handlePinPost,
        handleSavePost,
        handleLikeToggle,

        // Comment handlers
        toggleCommentsPanel,
        toggleCommentMenu,
        handleCommentAction,
        handleEditSubmit,
        handleCommentSubmit,
        handleReplySubmit,
        handleEmojiClick,
        likeCommentToggle,
    };
};