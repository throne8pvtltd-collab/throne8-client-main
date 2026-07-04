// src/store/features/profile/thunks/educationThunks.ts

import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '@/lib/api/auth.service';
import ProfileService from '@/lib/api/profile.service';

/**
 * 📚 Fetch All Education Records
 */
export const fetchAllEducation = createAsyncThunk(
    'education/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            // console.log('📚 [THUNK] Fetching all education...');
            const response = await ProfileService.getAllEducation(false);
            return response.data.educationList || [];
        } catch (error: any) {
            console.error('❌ [THUNK] Education fetch failed:', error);
            return rejectWithValue(error.message || 'Failed to fetch education');
        }
    }
);

/**
 * ➕ Create Education
 */
export const createEducation = createAsyncThunk(
    'education/create',
    async (educationData: {
        schoolCollegeName: string;
        degree: string;
        degreeType: string;
        specialization?: string;
        startDate: string;
        endDate?: string | null;
        description?: string;
        educationType?: string;
        gradeType?: string;
        gradeValue?: string;
        location?: string;
    }, { rejectWithValue }) => {
        try {
            // console.log('➕ [THUNK] Creating education...');
            const response = await ProfileService.createEducation(educationData);
            return response.data.education;
        } catch (error: any) {
            console.error('❌ [THUNK] Education creation failed:', error);
            return rejectWithValue(error.message || 'Failed to create education');
        }
    }
);

/**
 * 🔄 Update Education
 */
export const updateEducation = createAsyncThunk(
    'education/update',
    async ({ educationId, updates }: {
        educationId: string;
        updates: Partial<{
            schoolCollegeName: string;
            degree: string;
            degreeType: string;
            specialization?: string;
            startDate: string;
            endDate?: string | null;
            description?: string;
            educationType?: string;
            gradeType?: string;
            gradeValue?: string;
            location?: string;
        }>;
    }, { rejectWithValue }) => {
        try {
            // console.log('🔄 [THUNK] Updating education...');
            const response = await ProfileService.updateEducation(educationId, updates);
            return response.data.education;
        } catch (error: any) {
            console.error('❌ [THUNK] Education update failed:', error);
            return rejectWithValue(error.message || 'Failed to update education');
        }
    }
);

/**
 * 🗑️ Delete Education
 */
export const deleteEducation = createAsyncThunk(
    'education/delete',
    async (educationId: string, { rejectWithValue }) => {
        try {
            // console.log('🗑️ [THUNK] Deleting education...');
            await ProfileService.deleteEducation(educationId);
            return educationId;
        } catch (error: any) {
            console.error('❌ [THUNK] Education deletion failed:', error);
            return rejectWithValue(error.message || 'Failed to delete education');
        }
    }
);

/**
 * 📦 Archive Education
 */
export const archiveEducation = createAsyncThunk(
    'education/archive',
    async (educationId: string, { rejectWithValue }) => {
        try {
            // console.log('📦 [THUNK] Archiving education...');
            await ProfileService.archiveEducation(educationId);
            return educationId;
        } catch (error: any) {
            console.error('❌ [THUNK] Education archiving failed:', error);
            return rejectWithValue(error.message || 'Failed to archive education');
        }
    }
);