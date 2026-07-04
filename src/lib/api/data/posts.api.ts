// src/profile/api/posts.api.ts
import AuthService from '@/lib/api/auth.service';
import { TransformedPost } from '@/types/profile.types';
import { calculateTimeAgo } from '@/shared/utils/time.util';
import ProfileService from '../profile.service';

export const postsApi = {
    async fetchUserPosts(): Promise<TransformedPost[]> {
        const response = await ProfileService.getAllUserPosts(false);

        return response.data.posts.map((post: any) => ({
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
    }
};