 // src/profile/hooks/usePostsData.ts
import { postsApi } from '@/lib/api/data/posts.api';
import { TransformedPost } from '@/types/profile.types';
import { useState, useCallback } from 'react';

export const usePostsData = () => {
    const [userPosts, setUserPosts] = useState<TransformedPost[]>([]);
    const [isLoadingPosts, setIsLoadingPosts] = useState(true);

    const fetchUserPosts = useCallback(async () => {
        try {
            setIsLoadingPosts(true);

            const posts = await postsApi.fetchUserPosts();
            setUserPosts(posts);

        } catch (error: any) {
            console.error('❌ [HOOK] Failed to fetch posts:', error);
        } finally {
            setIsLoadingPosts(false);
        }
    }, []);

    return {
        userPosts,
        isLoadingPosts,
        fetchUserPosts,
    };
};