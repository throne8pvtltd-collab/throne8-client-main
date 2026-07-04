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
}

export interface PostLikeState {
    [key: string]: { count: number; isLiked: boolean };
}


// Dummy data for profile viewers
export const dummyViewers = [
    {
        id: 1,
        name: 'Rahul Verma',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        headline: 'Senior Product Manager at Google',
        viewedAt: '2 hours ago',
        viewCount: 3
    },
    {
        id: 2,
        name: 'Priya Sharma',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        headline: 'UX Designer at Microsoft',
        viewedAt: '5 hours ago',
        viewCount: 1
    },
    {
        id: 3,
        name: 'Arjun Singh',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        headline: 'Marketing Director at Amazon',
        viewedAt: '1 day ago',
        viewCount: 2
    },
    {
        id: 4,
        name: 'Neha Kapoor',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        headline: 'Software Engineer at Meta',
        viewedAt: '2 days ago',
        viewCount: 1
    },
    {
        id: 5,
        name: 'Vikram Patel',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        headline: 'Data Scientist at Netflix',
        viewedAt: '3 days ago',
        viewCount: 4
    },
    {
        id: 6,
        name: 'Ananya Reddy',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
        headline: 'HR Manager at Apple',
        viewedAt: '4 days ago',
        viewCount: 1
    },
    {
        id: 7,
        name: 'Karan Malhotra',
        avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150',
        headline: 'Business Analyst at Tesla',
        viewedAt: '5 days ago',
        viewCount: 2
    },
    {
        id: 8,
        name: 'Isha Gupta',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        headline: 'Content Strategist at Adobe',
        viewedAt: '1 week ago',
        viewCount: 1
    }
];