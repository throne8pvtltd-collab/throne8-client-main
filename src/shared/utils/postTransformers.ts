import { calculateTimeAgo } from './time.util';

export const transformApiPostToFeedPost = (
    apiPost: any,
    userData?: any,
    profileImageUrl?: string | null,
    headlineText?: string | null
) => {
    return {
        user: userData ? `${userData.firstName} ${userData.lastName}`.trim() : 'Unknown User',
        avatar: profileImageUrl || userData?.profilePhotoUrl || '',
        role: headlineText || userData?.headline || '',
        time: calculateTimeAgo(apiPost.createdAt),
        content: apiPost.content || apiPost.text || '',
        image: apiPost.images?.[0]?.cloudinarySecureUrl || apiPost.image || '',
        likes: apiPost.likesCount || apiPost.likes || 0,
        likesCount: apiPost.likesCount || apiPost.likes || 0,
        comments: apiPost.commentsCount || apiPost.comments || 0,
        commentsCount: apiPost.commentsCount || apiPost.comments || 0,
        shares: apiPost.sharesCount || apiPost.reposts || 0,
        postId: apiPost.entryId || apiPost.postId,
        entryId: apiPost.entryId,
        userId: apiPost.userId,
        isLiked: apiPost.isLiked || apiPost.isLikedByCurrentUser || false,
        isLikedByCurrentUser: apiPost.isLiked || apiPost.isLikedByCurrentUser || false,
        images: apiPost.images || [],
        videos: apiPost.videos || [],
        documents: apiPost.documents || [],
        connectionStatus: apiPost.connectionStatus || 'none',
        likedByConnections: apiPost.likedByConnections || [],                     
        likedByConnectionsAvatars: apiPost.likedByConnectionsAvatars || [],       
        likedByConnectionsCount: apiPost.likedByConnectionsCount || 0,            
        likedByConnectionsFull: apiPost.likedByConnectionsFull || [],             
        commentedByConnections: apiPost.commentedByConnections || [],             
        commentedByConnectionsAvatars: apiPost.commentedByConnectionsAvatars || [],
        commentedByConnectionsCount: apiPost.commentedByConnectionsCount || 0,
        commentedByConnectionsFull: apiPost.commentedByConnectionsFull || [],
    };
};