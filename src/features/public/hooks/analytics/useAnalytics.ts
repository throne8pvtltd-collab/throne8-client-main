// src/hooks/analytics/useAnalytics.ts

import { useState, useEffect, useCallback } from 'react';
import AnalyticsService from '@/lib/api/analytics.service';
import { AnalyticsSummary } from '@/types/analytics.types';

interface UseAnalyticsOptions {
    dateRange?: number;
    autoRefresh?: boolean;
    refreshInterval?: number;
}

export const useAnalytics = (options: UseAnalyticsOptions = {}) => {
    const {
        dateRange = 30,
        autoRefresh = false,
        refreshInterval = 60000 // 1 minute
    } = options;

    const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastFetchTime, setLastFetchTime] = useState(0);

    const fetchAnalytics = useCallback(async (forceRefresh = false) => {
        try {
            setIsLoading(true);
            setError(null);

            // console.log('📊 [useAnalytics] Fetching analytics...', { dateRange, forceRefresh });

            const response = await AnalyticsService.getAllAnalytics(dateRange, !forceRefresh);

            setAnalytics(response.data);
            setLastFetchTime(Date.now());

            // console.log('✅ [useAnalytics] Analytics loaded successfully');
        } catch (err: any) {
            console.error('❌ [useAnalytics] Failed to fetch:', err);
            setError(err.message || 'Failed to load analytics');
        } finally {
            setIsLoading(false);
        }
    }, [dateRange]);

    const refresh = useCallback(() => {
        fetchAnalytics(true);
    }, [fetchAnalytics]);

    const clearCache = useCallback(() => {
        AnalyticsService.clearAnalyticsCache();
        fetchAnalytics(true);
    }, [fetchAnalytics]);

    // Initial fetch
    useEffect(() => {
        fetchAnalytics();
    }, [fetchAnalytics]);

    // Auto-refresh
    useEffect(() => {
        if (!autoRefresh) return;

        const interval = setInterval(() => {
            // console.log('🔄 [useAnalytics] Auto-refreshing...');
            fetchAnalytics();
        }, refreshInterval);

        return () => clearInterval(interval);
    }, [autoRefresh, refreshInterval, fetchAnalytics]);

    return {
        analytics,
        isLoading,
        error,
        refresh,
        clearCache,
        lastFetchTime
    };
};