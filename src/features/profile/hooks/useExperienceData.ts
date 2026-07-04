// src/hooks/data/useExperienceData.ts

import { useState, useCallback } from 'react';
import AuthService from '@/lib/api/auth.service';
import ProfileService from '@/lib/api/profile.service';

export const useExperienceData = () => {
    const [experienceList, setExperienceList] = useState<any[]>([]);
    const [isLoadingExperience, setIsLoadingExperience] = useState(true);
    const [experienceError, setExperienceError] = useState<string | null>(null);

    const fetchExperienceData = useCallback(async (experienceIds: string[]) => {
        if (!experienceIds || experienceIds.length === 0) {
            setIsLoadingExperience(false);
            return;
        }

        try {
            setIsLoadingExperience(true);
            setExperienceError(null);

            // ✅ Fetch each experience by ID
            const fetchPromises = experienceIds.map(id => ProfileService.getExperienceById(id));
            const responses = await Promise.all(fetchPromises);

            // ✅ Transform API data
            const transformedExperiences = responses.map((response: any) => {
                const exp = response.data.experience;
                return {
                    experienceId: exp.experienceId,
                    company: exp.companyName,
                    position: exp.currentPosition,
                    period: exp.duration || formatPeriod(exp.startDate, exp.endDate),
                    current: exp.currentlyWorking,
                    description: exp.description,
                    achievements: exp.keyAchievements || [],
                    startDate: exp.startDate,
                    endDate: exp.endDate
                };
            });

            // ✅ Sort by start date (most recent first)
            transformedExperiences.sort((a, b) =>
                (b.startDate || '9999').localeCompare(a.startDate || '9999')
            );

            setExperienceList(transformedExperiences);
        } catch (error: any) {
            console.error('❌ [HOOK] Failed to fetch experience:', error);
            setExperienceError(error.message || 'Failed to load experience data');
        } finally {
            setIsLoadingExperience(false);
        }
    }, []);

    const formatPeriod = (start: string, end?: string) => {
        const startYear = new Date(start).getFullYear();
        const endYear = end ? new Date(end).getFullYear() : 'Present';
        return `${startYear} - ${endYear}`;
    };

    return {
        experienceList,
        isLoadingExperience,
        experienceError,
        fetchExperienceData,
    };
};