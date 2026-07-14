import config from "@/config/env.config";
import api from "./api.intance";

class FollowService {
    /**
     * Follow a user
     * POST /api/v1/follow
     */
    static async followUser(followingId: string) {
        try {
            const { data } = await api.post(
                `${config?.NEXT_PUBLIC_FOLLOW_ENDPOINT || process.env.NEXT_PUBLIC_FOLLOW_ENDPOINT}`,
                { followingId }
            );
            return data;
        } catch (error: any) {
            console.error('[FOLLOW_USER] Failed:', error);

            if (error.response?.status === 409) {
                throw new Error('Already following this user');
            }
            if (error.response?.status === 400) {
                throw new Error(error.response?.data?.message || 'Invalid request');
            }

            throw new Error(error.response?.data?.message || 'Failed to follow user');
        }
    }

    /**
     * Unfollow a user
     * DELETE /api/v1/follow/:userId
     */
    static async unfollowUser(followingId: string) {
        try {
            const { data } = await api.delete(
                `${config?.NEXT_PUBLIC_FOLLOW_ENDPOINT || process.env.NEXT_PUBLIC_FOLLOW_ENDPOINT}/${followingId}`
            );
            return data;
        } catch (error: any) {
            console.error('[UNFOLLOW_USER] Failed:', error);
            throw new Error(error.response?.data?.message || 'Failed to unfollow user');
        }
    }

    /**
     * Check follow status between current user and target user
     * GET /api/v1/follow/status/:userId
     */
    static async checkFollowStatus(userId: string) {
        try {
            const { data } = await api.get(
                `${config?.NEXT_PUBLIC_FOLLOW_ENDPOINT || process.env.NEXT_PUBLIC_FOLLOW_ENDPOINT}/status/${userId}`
            );
            return data;
        } catch (error: any) {
            console.error('[CHECK_FOLLOW_STATUS] Failed:', error);
            // Non-fatal: caller should treat this as "not following"
            return null;
        }
    }
}

export default FollowService;