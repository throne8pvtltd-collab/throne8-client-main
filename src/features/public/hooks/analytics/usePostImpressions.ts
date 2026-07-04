// src/hooks/analytics/usePostImpressions.ts

import { useState, useEffect, useCallback } from 'react';
import AnalyticsService from '@/lib/api/analytics.service';
import { PostImpression } from '@/types/analytics.types';

interface UsePostImpressionsOptions {
    days?: number;
    postId?: string;
    autoLoad?: boolean;
}

export const usePostImpressions = (options: UsePostImpressionsOptions = {}) => {
    const { days = 30, postId, autoLoad = true } = options;

    const [impressions, setImpressions] = useState<PostImpression[]>([]);
    const [timeline, setTimeline] = useState<any>(null);
    const [stats, setStats] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchImpressions = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            // console.log('📊 [usePostImpressions] Fetching...', { days, postId });

            // Fetch in parallel
            const [detailResponse, timelineResponse] = await Promise.all([
                AnalyticsService.getPostImpressionsDetail(1, 50),
                AnalyticsService.getPostImpressionsTimeline(days, postId)
            ]);

            setImpressions(detailResponse.data.impressions || []);
            setTimeline(timelineResponse.data);

            // If specific post, get stats
            if (postId) {
                const statsResponse = await AnalyticsService.getPostImpressionStats(postId);
                setStats(statsResponse.data);
            }

            // console.log('✅ [usePostImpressions] Loaded successfully');
        } catch (err: any) {
            console.error('❌ [usePostImpressions] Failed:', err);
            setError(err.message || 'Failed to load impressions');
        } finally {
            setIsLoading(false);
        }
    }, [days, postId]);

    const trackImpression = useCallback(async (
        trackPostId: string,
        postOwnerId: string,
        source: string
    ) => {
        try {
            await AnalyticsService.recordPostImpressionSmart(
                trackPostId,
                postOwnerId,
                source
            );
            // console.log('✅ [usePostImpressions] Impression tracked');
        } catch (error) {
            console.error('❌ [usePostImpressions] Track failed:', error);
        }
    }, []);

    useEffect(() => {
        if (autoLoad) {
            fetchImpressions();
        }
    }, [autoLoad, fetchImpressions]);

    return {
        impressions,
        timeline,
        stats,
        isLoading,
        error,
        fetchImpressions,
        trackImpression
    };
};