// src/profile/hooks/usePostsData.ts
import { postsApi } from '@/lib/api/data/posts.api';
import { TransformedPost } from '@/types/profile.types';
import { useState, useCallback } from 'react';

export const usePostsData = (userId?: string) => {
    const [userPosts, setUserPosts] = useState<TransformedPost[]>([]);
    const [isLoadingPosts, setIsLoadingPosts] = useState(true);
    // FIX: naya state — batata hai ki fetch fail hua ya genuinely posts nahi hain
    const [postsError, setPostsError] = useState<string | null>(null);

    const fetchUserPosts = useCallback(async (targetUserId?: string) => {
        const idToFetch = targetUserId ?? userId;

        if (!idToFetch) {
            console.warn('⚠️ [HOOK] fetchUserPosts called without a userId');
            setIsLoadingPosts(false);
            return;
        }

        try {
            setIsLoadingPosts(true);
            setPostsError(null);
            setUserPosts([]); // naya userId ke liye purana data clear karo

            const posts = await postsApi.fetchUserPosts(idToFetch);
            setUserPosts(posts);

        } catch (error: any) {
            console.error('❌ [HOOK] Failed to fetch posts:', error);

            // FIX: rate-limit (429) ya kisi bhi fetch failure ko ALAG track karo,
            // taaki UI "No posts yet" na dikhaye — balki "failed to load, retry" dikhaye
            const isRateLimited = error?.response?.status === 429
                || error?.message?.toLowerCase().includes('too many');

            setPostsError(
                isRateLimited
                    ? 'Too many requests — please refresh in a moment.'
                    : 'Failed to load posts. Please try again.'
            );
            setUserPosts([]); // UI still empty rahega, but ab error bhi pata chalega
        } finally {
            setIsLoadingPosts(false);
        }
    }, [userId]);

    return {
        userPosts,
        isLoadingPosts,
        postsError,
        fetchUserPosts,
    };
};