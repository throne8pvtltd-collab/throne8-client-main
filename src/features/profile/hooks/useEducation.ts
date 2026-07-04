// src/store/hooks/education/useEducation.ts

import { useAppDispatch, useAppSelector } from '../../../core/store/store.hooks';
import { EducationData } from '@/features/profile/components/home/UpdateEducationModal';
import {
    setSelectedEducation,
    clearEducationError
} from '@/hooks/profile/slices/educationSlice';
import { archiveEducation, createEducation, deleteEducation, fetchAllEducation, updateEducation } from '@/hooks/profile/thunks/educationThunks';

export const useEducation = () => {
    const dispatch = useAppDispatch();

    const {
        educationList,
        isLoadingEducation,
        educationError,
        selectedEducation,
    } = useAppSelector((state: any) => state.education);

    // Actions
    const loadEducation = () => dispatch(fetchAllEducation());
    
    const addEducation = (data: Omit<EducationData, 'educationId'>) =>
        dispatch(createEducation(data));

    const editEducation = (educationId: string, updates: Partial<EducationData>) =>
        dispatch(updateEducation({ educationId, updates }));

    const removeEducation = (educationId: string) =>
        dispatch(deleteEducation(educationId));

    const archiveEducationRecord = (educationId: string) =>
        dispatch(archiveEducation(educationId));

    const selectEducation = (education: EducationData | null) =>
        dispatch(setSelectedEducation(education));

    const clearError = () => dispatch(clearEducationError());

    return {
        // State
        educationList,
        isLoadingEducation,
        educationError,
        selectedEducation,

        // Actions
        loadEducation,
        addEducation,
        editEducation,
        removeEducation,
        archiveEducationRecord,
        selectEducation,
        clearError,
    };
};