// src/profile/api/posts.api.ts
import AuthService from '@/lib/api/auth.service';
import { TransformedPost } from '@/types/profile.types';
import { calculateTimeAgo } from '@/shared/utils/time.util';
import ProfileService from '../profile.service';

// Shared transformer — keeps the exact same shape both flows had before
const transformPosts = (rawPosts: any[]): TransformedPost[] => {
    return rawPosts.map((post: any) => ({
        postId: post.postId,
        title: post.title,
        text: post.content,
        image: post.images[0]?.cloudinarySecureUrl || '',
        likes: post.likesCount || 0,
        isLiked: post.isLikedByCurrentUser || false,
        comments: 0,
        reposts: 0,
        time: calculateTimeAgo(post.createdAt),
        images: post.images,
        videos: post.videos,
        documents: post.documents,
        createdAt: post.createdAt,
        isPinned: post.isPinned || false,
        isSaved: post.isSaved || false,
        isArchived: post.isArchived || false,
    }));
};

export const postsApi = {
    /**
     * Fetch posts.
     * - No userId (or your own userId) → your OWN posts (via /get-all/posts,
     *   which is auth-token scoped — includes archived if you ask for it).
     * - A different userId → that user's PUBLIC posts (via /posts/user/:userId).
     *
     * @param userId  Target user's id. Omit for "my own posts".
     */
    async fetchUserPosts(userId?: string): Promise<TransformedPost[]> {
        const response = userId
            ? await ProfileService.getAllUserPostsByUserId(userId, false)
            : await ProfileService.getAllUserPosts(false);

        return transformPosts(response.data.posts);
    }
};