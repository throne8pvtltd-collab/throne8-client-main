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
            console.error("[FOLLOW_USER] Failed:", error);

            if (error.response?.status === 409) {
                throw new Error("Already following this user");
            }

            if (error.response?.status === 400) {
                throw new Error(
                    error.response?.data?.message || "Invalid request"
                );
            }

            throw new Error(
                error.response?.data?.message || "Failed to follow user"
            );
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
            console.error("[UNFOLLOW_USER] Failed:", error);
            throw new Error(
                error.response?.data?.message || "Failed to unfollow user"
            );
        }
    }

    /**
     * Check follow status
     * GET /api/v1/follow/status/:userId
     */
    static async checkFollowStatus(userId: string) {
        try {
            const { data } = await api.get(
                `${config?.NEXT_PUBLIC_FOLLOW_ENDPOINT || process.env.NEXT_PUBLIC_FOLLOW_ENDPOINT}/status/${userId}`
            );
            return data;
        } catch (error: any) {
            console.error("[CHECK_FOLLOW_STATUS] Failed:", error);
            return null;
        }
    }

    /**
<<<<<<< HEAD
     * 📊 GET FOLLOW COUNTS FOR A USER (followers + following)
=======
     * Get followers & following count
>>>>>>> 48414dc2f955f26a8de1551cd465d37c4bf20577
     * GET /api/v1/follow/counts/:userId
     */
    static async getFollowCounts(userId: string) {
        try {
            const { data } = await api.get(
                `${config?.NEXT_PUBLIC_FOLLOW_ENDPOINT || process.env.NEXT_PUBLIC_FOLLOW_ENDPOINT}/counts/${userId}`
            );
            return data;
        } catch (error: any) {
<<<<<<< HEAD
            console.error('[GET_FOLLOW_COUNTS] Failed:', error);
=======
            console.error("[GET_FOLLOW_COUNTS] Failed:", error);
>>>>>>> 48414dc2f955f26a8de1551cd465d37c4bf20577
            return null;
        }
    }

    /**
<<<<<<< HEAD
     * Get companies a user is following
=======
     * Get companies followed by user
>>>>>>> 48414dc2f955f26a8de1551cd465d37c4bf20577
     * GET /api/v1/follow/user/:userId/companies
     */
    static async getUserFollowingCompanies(userId: string) {
        try {
            const { data } = await api.get(
                `${config?.NEXT_PUBLIC_FOLLOW_ENDPOINT || process.env.NEXT_PUBLIC_FOLLOW_ENDPOINT}/user/${userId}/companies`
            );
            return data;
        } catch (error: any) {
<<<<<<< HEAD
            console.error('[GET_FOLLOWING_COMPANIES] Failed:', error);
            throw new Error(error.response?.data?.message || 'Failed to fetch followed companies');
=======
            console.error("[GET_FOLLOWING_COMPANIES] Failed:", error);
            throw new Error(
                error.response?.data?.message ||
                    "Failed to fetch followed companies"
            );
>>>>>>> 48414dc2f955f26a8de1551cd465d37c4bf20577
        }
    }
}

export default FollowService;