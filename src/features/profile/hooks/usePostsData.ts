// src/profile/hooks/usePostsData.ts
import { postsApi } from '@/lib/api/data/posts.api';
import { TransformedPost } from '@/types/profile.types';
import { useState, useCallback } from 'react';

export const usePostsData = (userId?: string) => {
    const [userPosts, setUserPosts] = useState<TransformedPost[]>([]);
    const [isLoadingPosts, setIsLoadingPosts] = useState(true);

    // FIX: ab yeh target userId leta hai. Agar userId diya hai (dusre user ki
    // profile), to usi user ke posts fetch honge — apne login user ke nahi.
    const fetchUserPosts = useCallback(async (targetUserId?: string) => {
        const idToFetch = targetUserId ?? userId;

        if (!idToFetch) {
            console.warn('⚠️ [HOOK] fetchUserPosts called without a userId');
            setIsLoadingPosts(false);
            return;
        }

        try {
            setIsLoadingPosts(true);

            // ✅ Naya userId ke liye purana data clear karo, warna jab tak
            // naya data na aaye, purani profile ke posts dikhte reh sakte hain
            setUserPosts([]);

            const posts = await postsApi.fetchUserPosts(idToFetch);
            setUserPosts(posts);

        } catch (error: any) {
            console.error('❌ [HOOK] Failed to fetch posts:', error);
            setUserPosts([]);
        } finally {
            setIsLoadingPosts(false);
        }
    }, [userId]);

    return {
        userPosts,
        isLoadingPosts,
        fetchUserPosts,
    };
};