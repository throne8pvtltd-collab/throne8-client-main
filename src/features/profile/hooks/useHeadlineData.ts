// src/profile/hooks/useHeadlineData.ts
import { profileApi } from '@/lib/api/data/profile.api';
import { HeadlineData } from '@/types/profile.types';
import { useState, useCallback } from 'react';

export const useHeadlineData = (headlineId: string) => {
    const [headlineData, setHeadlineData] = useState<HeadlineData | null>(null);
    const [isLoadingHeadline, setIsLoadingHeadline] = useState(true);

    const fetchHeadlineData = useCallback(async () => {
        if (!headlineId) {

            setIsLoadingHeadline(false);
            return;
        }

        try {
            setIsLoadingHeadline(true);


            const data = await profileApi.fetchHeadline(headlineId);

            if (data) {
                setHeadlineData(data);

            }
        } catch (error: any) {
            console.error('❌ [HOOK] Failed to fetch headline:', error);
            if (!error.message.includes('not found')) {
                console.warn('Headline section not created yet');
            }
        } finally {
            setIsLoadingHeadline(false);
        }
    }, [headlineId]);

    return {
        headlineData,
        isLoadingHeadline,
        fetchHeadlineData,
    };
};