// src/profile/components/types.ts

export interface Post {
    entryId: string;
    isLiked: boolean;
    isPinned: boolean;
    isSaved: boolean;
    postId: string;
    text: string;
    image: string;
    images?: Array<{
        mediaId?: string;
        cloudinarySecureUrl: string;
        cloudinaryUrl?: string;
        format?: string;
        width?: number;
        height?: number;
        fileSize?: number;
        originalName?: string;
        mimeType?: string;
    }>;
    videos?: Array<{
        mediaId?: string;
        cloudinarySecureUrl: string;
        cloudinaryUrl?: string;
        format?: string;
        duration?: number;
        fileSize?: number;
        originalName?: string;
        mimeType?: string;
    }>;
    documents?: Array<{
        mediaId?: string;
        cloudinarySecureUrl: string;
        cloudinaryUrl?: string;
        format?: string;
        fileSize?: number;
        originalName?: string;
        mimeType?: string;
    }>;
    likes: number;
    likesCount?: number;
    comments: number;
    commentsCount?: number;
    reposts: number;
    time: string;
    title?: string;
    createdAt?: string;
}

export interface Comment {
    author: string;
    avatar: string;
    text: string;
    likes: number;
    time: string;
}

export interface Video {
    title: string;
    thumbnail: string;
    views: number;
    duration: string;
    time: string;
}

export interface Image {
    src: string;
    caption: string;
    likes: number;
    time: string;
}

export interface Document {
    title: string;
    type: string;
    size: string;
    downloads: number;
    time: string;
}

export interface ActivitySectionProps {
    posts: Post[];
    onPostCreated?: () => void;
    isLoading?: boolean;
    profileImage?: string;
    fullName?: string;
    headline?: string;
    followers: number;
    currentUserId?: string;

    userReposts?: any[];
    isLoadingReposts?: boolean;
    onCreateRepost?: (entryId: string, type: 'repost' | 'quote', thoughtText?: string) => Promise<any>;
    onDeleteRepost?: (repostId: string) => Promise<any>;
}

export interface PostLikeState {
    [key: string]: { count: number; isLiked: boolean };
}