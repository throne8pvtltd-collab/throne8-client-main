// src/hooks/data/useEducationData.ts

import { useState, useCallback } from 'react';
import AuthService from '@/lib/api/auth.service';
import ProfileService from '@/lib/api/profile.service';

export const useEducationData = () => {
    const [educationList, setEducationList] = useState<any[]>([]);
    const [isLoadingEducation, setIsLoadingEducation] = useState(true);
    const [educationError, setEducationError] = useState<string | null>(null);

    const fetchEducationData = useCallback(async () => {
        try {
            setIsLoadingEducation(true);
            setEducationError(null);

            const response = await ProfileService.getAllEducation(false);


            if (response?.data?.educationList) {
                setEducationList(response.data.educationList);

            }
        } catch (error: any) {
            console.error('❌ [HOOK] Failed to fetch education:', error);
            setEducationError(error.message || 'Failed to load education data');
        } finally {
            setIsLoadingEducation(false);
        }
    }, []);

    return {
        educationList,
        isLoadingEducation,
        educationError,
        fetchEducationData,
    };
};