// lib/api/analytics.service.ts - WITH TRACKING METHODS
import { api } from './auth.service';

class AnalyticsService {
    // ==================== TRACKING METHODS (NEW) ====================

    /**
     * 🔍 Record Search Appearance (When user appears in search)
     * This is called when someone searches and this user shows in results
     */
    static async recordSearchAppearance(
        searchedUserId: string,
        searchQuery: string,
        wasClicked: boolean = false,
        position?: number
    ): Promise<any> {
        try {
            // console.log('🔍 [ANALYTICS] Recording search appearance:', {
            //     searchedUserId,
            //     searchQuery,
            //     wasClicked,
            //     position
            // });

            const { data } = await api.post('/api/v1/profile/analytics/record-search', {
                searchedUserId,
                searchQuery,
                wasClicked,
                position
            });

            // console.log('✅ [ANALYTICS] Search appearance recorded');
            return data;
        } catch (error: any) {
            console.error('❌ [ANALYTICS] Failed to record search appearance:', error);
            // Don't throw - this is non-critical tracking
            return null;
        }
    }

    /**
     * 👁️ Record Profile View (When someone views a profile)
     */
    static async recordProfileView(
        profileOwnerId: string,
        viewerData?: {
            viewerId?: string;
            viewerName?: string;
            viewerHeadline?: string;
        }
    ): Promise<any> {
        try {
            // console.log('👁️ [ANALYTICS] Recording profile view:', {
            //     profileOwnerId,
            //     viewerData
            // });

            const { data } = await api.post('/api/v1/profile/analytics/record-profile-view', {
                profileOwnerId,
                ...viewerData
            });

            // console.log('✅ [ANALYTICS] Profile view recorded');
            return data;
        } catch (error: any) {
            console.error('❌ [ANALYTICS] Failed to record profile view:', error);
            // Don't throw - this is non-critical tracking
            return null;
        }
    }

    // ==================== EXISTING GET METHODS ====================

    /**
     * 1️⃣ Toggle Analytics Privacy
     * PUT /api/v1/profile/analytics/privacy
     */
    static async togglePrivacy(isPrivate: boolean): Promise<any> {
        try {
            // console.log('🔐 [ANALYTICS] Toggling privacy:', isPrivate);
            const { data } = await api.put('/api/v1/profile/analytics/privacy', { isPrivate });
            // console.log('✅ [ANALYTICS] Privacy toggled successfully');
            return data;
        } catch (error: any) {
            console.error('❌ [ANALYTICS] Toggle privacy failed:', error);
            throw error;
        }
    }

    /**
     * 2️⃣ Get Profile Views Count
     * GET /api/v1/profile/analytics/profile-views/count
     */
    static async getProfileViewsCount(dateRange: number = 90): Promise<any> {
        try {
            // console.log('👀 [ANALYTICS] Fetching profile views count...');
            const { data } = await api.get('/api/v1/profile/analytics/profile-views/count', {
                params: { dateRange }
            });
            // console.log('✅ [ANALYTICS] Profile views fetched:', data);
            return data;
        } catch (error: any) {
            console.error('❌ [ANALYTICS] Failed to fetch profile views:', error);
            throw error;
        }
    }

    /**
     * 3️⃣ Get Profile Views Detail (Who Viewed)
     * GET /api/v1/profile/analytics/profile-views/detail
     */
    static async getProfileViewsDetail(
        isPremium: boolean = false,
        page: number = 1,
        limit: number = 10
    ): Promise<any> {
        try {
            // console.log('👥 [ANALYTICS] Fetching profile views detail...');
            const { data } = await api.get('/api/v1/profile/analytics/profile-views/detail', {
                params: { isPremium, page, limit }
            });
            // console.log('✅ [ANALYTICS] Profile views detail fetched');
            return data;
        } catch (error: any) {
            console.error('❌ [ANALYTICS] Failed to fetch profile views detail:', error);
            throw error;
        }
    }

    /**
 * 📈 Get Profile Views % Change
 * GET /api/v1/profile/analytics/profile-views/change
 */
static async getProfileViewsChange(days: number = 30): Promise<any> {
    try {
        const { data } = await api.get('/api/v1/profile/analytics/profile-views/change', {
            params: { days }
        });
        return data;
    } catch (error: any) {
        console.error('❌ [ANALYTICS] Failed to fetch profile views change:', error);
        throw error;
    }
}
    /**
     * 4️⃣ Get Post Impressions Count
     * GET /api/v1/profile/analytics/post-impressions/count
     */
    static async getPostImpressionsCount(limit: number = 20): Promise<any> {
        try {
            // console.log('📊 [ANALYTICS] Fetching post impressions count...');
            const { data } = await api.get('/api/v1/profile/analytics/post-impressions/count', {
                params: { limit }
            });
            // console.log('✅ [ANALYTICS] Post impressions count fetched');
            return data;
        } catch (error: any) {
            console.error('❌ [ANALYTICS] Failed to fetch post impressions:', error);
            throw error;
        }
    }

    /**
     * 5️⃣ Get Post Impressions Detail
     * GET /api/v1/profile/analytics/post-impressions/detail
     */
    static async getPostImpressionsDetail(page: number = 1, limit: number = 50): Promise<any> {
        try {
            // console.log('📈 [ANALYTICS] Fetching post impressions detail...');
            const { data } = await api.get('/api/v1/profile/analytics/post-impressions/detail', {
                params: { page, limit }
            });
            // console.log('✅ [ANALYTICS] Post impressions detail fetched');
            return data;
        } catch (error: any) {
            console.error('❌ [ANALYTICS] Failed to fetch post impressions detail:', error);
            throw error;
        }
    }

    /**
     * 6️⃣ Get Post Impressions by Timeframe
     * GET /api/v1/profile/analytics/post-impressions/timeframe
     */
    static async getPostImpressionsByTimeframe(days: number = 7): Promise<any> {
        try {
            // console.log('📅 [ANALYTICS] Fetching post impressions timeframe...');
            const { data } = await api.get('/api/v1/profile/analytics/post-impressions/timeframe', {
                params: { days }
            });
            // console.log('✅ [ANALYTICS] Post impressions timeframe fetched');
            return data;
        } catch (error: any) {
            console.error('❌ [ANALYTICS] Failed to fetch post impressions timeframe:', error);
            throw error;
        }
    }

    /**
     * 7️⃣ Get Search Appearances Count
     * GET /api/v1/profile/analytics/search-appearances/count
     */
    static async getSearchAppearancesCount(): Promise<any> {
        try {
            // console.log('🔍 [ANALYTICS] Fetching search appearances count...');
            const { data } = await api.get('/api/v1/profile/analytics/search-appearances/count');
            // console.log('✅ [ANALYTICS] Search appearances count fetched');
            return data;
        } catch (error: any) {
            console.error('❌ [ANALYTICS] Failed to fetch search appearances:', error);
            throw error;
        }
    }

    /**
     * 8️⃣ Get Search Appearances Detail
     * GET /api/v1/profile/analytics/search-appearances/detail
     */
    static async getSearchAppearancesDetail(page: number = 1, limit: number = 50): Promise<any> {
        try {
            // console.log('🔎 [ANALYTICS] Fetching search appearances detail...');
            const { data } = await api.get('/api/v1/profile/analytics/search-appearances/detail', {
                params: { page, limit }
            });
            // console.log('✅ [ANALYTICS] Search appearances detail fetched');
            return data;
        } catch (error: any) {
            console.error('❌ [ANALYTICS] Failed to fetch search appearances detail:', error);
            throw error;
        }
    }

    /**
     * 9️⃣ Get All Analytics Summary
     * GET /api/v1/profile/analytics/all
     */
    static async getAllAnalytics(dateRange: number = 30): Promise<any> {
        try {
            // console.log('📊 [ANALYTICS] Fetching all analytics summary...');
            const { data } = await api.get('/api/v1/profile/analytics/all', {
                params: { dateRange }
            });
            // console.log('✅ [ANALYTICS] All analytics fetched:', data);
            return data;
        } catch (error: any) {
            console.error('❌ [ANALYTICS] Failed to fetch all analytics:', error);
            throw error;
        }
    }

    /**
     * 🔟 Get Who Viewed Profile (Same as #3)
     * GET /api/v1/profile/analytics/who-viewed
     */
    static async getWhoViewedProfile(
        isPremium: boolean = false,
        page: number = 1,
        limit: number = 20
    ): Promise<any> {
        try {
            // console.log('👁️ [ANALYTICS] Fetching who viewed profile...');
            const { data } = await api.get('/api/v1/profile/analytics/who-viewed', {
                params: { isPremium, page, limit }
            });
            // console.log('✅ [ANALYTICS] Who viewed profile fetched');
            return data;
        } catch (error: any) {
            console.error('❌ [ANALYTICS] Failed to fetch who viewed:', error);
            throw error;
        }
    }

    /**
     * 1️⃣1️⃣ Get Viewer Demographics
     * GET /api/v1/profile/analytics/demographics
     */
    static async getViewerDemographics(): Promise<any> {
        try {
            // console.log('👥 [ANALYTICS] Fetching viewer demographics...');
            const { data } = await api.get('/api/v1/profile/analytics/demographics');
            // console.log('✅ [ANALYTICS] Viewer demographics fetched');
            return data;
        } catch (error: any) {
            console.error('❌ [ANALYTICS] Failed to fetch demographics:', error);
            throw error;
        }
    }

    /**
     * 1️⃣2️⃣ Get Search Keywords
     * GET /api/v1/profile/analytics/search-keywords
     */
    static async getSearchKeywords(limit: number = 10): Promise<any> {
        try {
            // console.log('🔑 [ANALYTICS] Fetching search keywords...');
            const { data } = await api.get('/api/v1/profile/analytics/search-keywords', {
                params: { limit }
            });
            // console.log('✅ [ANALYTICS] Search keywords fetched');
            return data;
        } catch (error: any) {
            console.error('❌ [ANALYTICS] Failed to fetch search keywords:', error);
            throw error;
        }
    }

    /**
     * 1️⃣3️⃣ Get Analytics by Date Range
     * GET /api/v1/profile/analytics/date-range
     */
    static async getAnalyticsByDateRange(startDate: string, endDate: string): Promise<any> {
        try {
            // console.log('📅 [ANALYTICS] Fetching analytics by date range...');
            const { data } = await api.get('/api/v1/profile/analytics/date-range', {
                params: { startDate, endDate }
            });
            // console.log('✅ [ANALYTICS] Analytics by date range fetched');
            return data;
        } catch (error: any) {
            console.error('❌ [ANALYTICS] Failed to fetch analytics by date range:', error);
            throw error;
        }
    }

    /**
     * 1️⃣4️⃣ Export Analytics
     * GET /api/v1/profile/analytics/export
     */
    static async exportAnalytics(format: 'csv' | 'excel' = 'csv'): Promise<any> {
        try {
            // console.log('📥 [ANALYTICS] Exporting analytics...');
            const { data } = await api.get('/api/v1/profile/analytics/export', {
                params: { format }
            });
            // console.log('✅ [ANALYTICS] Analytics exported');
            return data;
        } catch (error: any) {
            console.error('❌ [ANALYTICS] Failed to export analytics:', error);
            throw error;
        }
    }

    /**
     * 1️⃣5️⃣ Get Analytics Graphs Data
     * GET /api/v1/profile/analytics/graphs
     */
    static async getAnalyticsGraphData(days: number = 30): Promise<any> {
        try {
            // console.log('📊 [ANALYTICS] Fetching analytics graph data...');
            const { data } = await api.get('/api/v1/profile/analytics/graphs', {
                params: { days }
            });
            // console.log('✅ [ANALYTICS] Analytics graph data fetched');
            return data;
        } catch (error: any) {
            console.error('❌ [ANALYTICS] Failed to fetch graph data:', error);
            throw error;
        }
    }

    /**
 * 🔥 SMART POST IMPRESSION (Time-based, 10-min cooldown)
 */
    static async recordPostImpressionSmart(postId: string, postOwnerId: string, source: string) {
        try {
            const { data } = await api.post('/api/v1/profile/analytics/record-post-impression-smart', {
                postId,
                postOwnerId,
                source
            });
            return data;
        } catch (error: any) {
            console.error('❌ Record post impression failed:', error);
            // Don't throw - non-critical
            return null;
        }
    }

    /**
     * 📊 GET POST IMPRESSIONS TIMELINE (for graphs)
     */
    static async getPostImpressionsTimeline(days: number = 30, postId?: string) {
        try {
            const { data } = await api.get('/api/v1/profile/analytics/post-impressions/timeline', {
                params: { days, postId }
            });
            return data;
        } catch (error: any) {
            console.error('❌ Get impressions timeline failed:', error);
            throw error;
        }
    }

    /**
     * 📈 GET POST IMPRESSION STATS (detailed breakdown)
     */
    static async getPostImpressionStats(postId: string) {
        try {
            const { data } = await api.get(`/api/v1/profile/analytics/post/${postId}/impression-stats`);
            return data;
        } catch (error: any) {
            console.error('❌ Get post stats failed:', error);
            throw error;
        }
    }
}

export default AnalyticsService;