// src/hooks/analytics/useSearchAnalytics.ts

import { useState, useEffect, useCallback, useRef } from 'react';
import AnalyticsService from '@/lib/api/analytics.service';
import { SearchAppearance } from '@/types/analytics.types';
import { debounce } from 'lodash';

interface UseSearchAnalyticsOptions {
    minChars?: number;
    debounceMs?: number;
}

export const useSearchAnalytics = (options: UseSearchAnalyticsOptions = {}) => {
    const { minChars = 3, debounceMs = 500 } = options;

    const [appearances, setAppearances] = useState<SearchAppearance[]>([]);
    const [keywords, setKeywords] = useState<any[]>([]);
    const [count, setCount] = useState({
        total: 0,
        last7Days: 0,
        last30Days: 0
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Track which searches have been recorded
    const trackedSearchesRef = useRef<Set<string>>(new Set());
    const trackedAppearancesRef = useRef<Map<string, Set<string>>>(new Map());

    const fetchSearchAnalytics = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            // console.log('🔍 [useSearchAnalytics] Fetching...');

            const [countResponse, detailResponse, keywordsResponse] = await Promise.all([
                AnalyticsService.getSearchAppearancesCount(),
                AnalyticsService.getSearchAppearancesWithHighlights(1, 50),
                AnalyticsService.getSearchKeywords(10)
            ]);

            setCount(countResponse.data);
            setAppearances(detailResponse.data.appearances || []);
            setKeywords(keywordsResponse.data.topKeywords || []);

            // console.log('✅ [useSearchAnalytics] Loaded successfully');
        } catch (err: any) {
            console.error('❌ [useSearchAnalytics] Failed:', err);
            setError(err.message || 'Failed to load search analytics');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const trackAppearance = useCallback(async (
        userId: string,
        searchQuery: string,
        wasClicked: boolean = false,
        position?: number
    ) => {
        try {
            await AnalyticsService.recordSearchAppearance(
                userId,
                searchQuery,
                wasClicked,
                position
            );
            // console.log('✅ [useSearchAnalytics] Appearance tracked');
        } catch (error) {
            console.error('❌ [useSearchAnalytics] Track failed:', error);
        }
    }, []);

    const trackMultipleAppearances = useCallback(async (
        users: Array<{ userId: string }>,
        searchQuery: string
    ) => {
        const normalizedQuery = searchQuery.toLowerCase().trim();

        // Check minimum character requirement
        if (normalizedQuery.length < minChars) {
            // console.log('⚠️ [useSearchAnalytics] Query too short, skipping tracking');
            return;
        }

        const searchKey = `search:${normalizedQuery}`;
        const hasTrackedSearch = trackedSearchesRef.current.has(searchKey);

        // Skip if already tracked this exact search
        if (hasTrackedSearch) {
            // console.log('📦 [useSearchAnalytics] Already tracked this search');
            return;
        }

        trackedSearchesRef.current.add(searchKey);

        if (!trackedAppearancesRef.current.has(searchKey)) {
            trackedAppearancesRef.current.set(searchKey, new Set());
        }

        const trackedUsersForQuery = trackedAppearancesRef.current.get(searchKey)!;

        // Filter out already tracked users for this query
        const usersToTrack = users.filter(
            user => !trackedUsersForQuery.has(user.userId)
        );

        // console.log('🔍 [useSearchAnalytics] Tracking appearances:', {
        //     query: normalizedQuery,
        //     totalUsers: users.length,
        //     newUsersToTrack: usersToTrack.length
        // });

        // Track in parallel (non-blocking)
        const trackingPromises = usersToTrack.map((user, index) =>
            trackAppearance(user.userId, normalizedQuery, false, index + 1)
                .then(() => {
                    trackedUsersForQuery.add(user.userId);
                })
        );

        await Promise.allSettled(trackingPromises);
    }, [minChars, trackAppearance]);

    const clearTracking = useCallback(() => {
        trackedSearchesRef.current.clear();
        trackedAppearancesRef.current.clear();
        // console.log('🧹 [useSearchAnalytics] Tracking cleared');
    }, []);

    return {
        appearances,
        keywords,
        count,
        isLoading,
        error,
        fetchSearchAnalytics,
        trackAppearance,
        trackMultipleAppearances,
        clearTracking
    };
};