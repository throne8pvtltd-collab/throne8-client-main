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
        // FIX: post.images can be UNDEFINED (not just empty array) when a post
        // only has videos/documents (e.g. "Motivation video" post). Doing
        // post.images[0] on undefined throws and silently kills the whole
        // .map(), which made fetchUserPosts fail and show "No posts yet"
        // even though the backend returned valid posts. Using optional
        // chaining on the array itself (post.images?.[0]) fixes this, and
        // we fall back to the first video's thumbnail-worthy url if needed.
        image: post.images?.[0]?.cloudinarySecureUrl
            || post.videos?.[0]?.cloudinarySecureUrl
            || '',
        likes: post.likesCount || 0,
        isLiked: post.isLikedByCurrentUser || false,
        comments: post.commentsCount || 0,
        reposts: 0,
        time: calculateTimeAgo(post.createdAt),
        // FIX: default to [] instead of leaving undefined, so any component
        // doing images.length / images.map() downstream doesn't also crash.
        images: post.images || [],
        videos: post.videos || [],
        documents: post.documents || [],
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