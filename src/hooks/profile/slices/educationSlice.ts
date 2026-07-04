// src/store/features/profile/slices/educationSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    fetchAllEducation,
    createEducation,
    updateEducation,
    deleteEducation,
    archiveEducation,
} from '../thunks';
import { EducationData, EducationState } from '@/features/profile/types/education.types';

const initialState: EducationState = {
    educationList: [],
    isLoadingEducation: false,
    educationError: null,
    selectedEducation: null,
};

const educationSlice = createSlice({
    name: 'education',
    initialState,
    reducers: {
        setSelectedEducation: (state, action: PayloadAction<EducationData | null>) => {
            state.selectedEducation = action.payload;
        },
        clearEducationError: (state) => {
            state.educationError = null;
        },
        resetEducationState: () => initialState,
    },
    extraReducers: (builder) => {
        // ==================== FETCH ALL EDUCATION ====================
        builder
            .addCase(fetchAllEducation.pending, (state) => {
                state.isLoadingEducation = true;
                state.educationError = null;
            })
            .addCase(fetchAllEducation.fulfilled, (state, action) => {
                state.isLoadingEducation = false;
                state.educationList = action.payload;
                // console.log('✅ [SLICE] Education list loaded');
            })
            .addCase(fetchAllEducation.rejected, (state, action) => {
                state.isLoadingEducation = false;
                state.educationError = action.payload as string;
            });

        // ==================== CREATE EDUCATION ====================
        builder
            .addCase(createEducation.pending, (state) => {
                state.isLoadingEducation = true;
            })
            .addCase(createEducation.fulfilled, (state, action) => {
                state.isLoadingEducation = false;
                state.educationList.push(action.payload);
                // console.log('✅ [SLICE] Education created');
            })
            .addCase(createEducation.rejected, (state, action) => {
                state.isLoadingEducation = false;
                state.educationError = action.payload as string;
            });

        // ==================== UPDATE EDUCATION ====================
        builder
            .addCase(updateEducation.pending, (state) => {
                state.isLoadingEducation = true;
            })
            .addCase(updateEducation.fulfilled, (state, action) => {
                state.isLoadingEducation = false;
                const index = state.educationList.findIndex(
                    (edu) => edu.educationId === action.payload.educationId
                );
                if (index !== -1) {
                    state.educationList[index] = action.payload;
                }
                // console.log('✅ [SLICE] Education updated');
            })
            .addCase(updateEducation.rejected, (state, action) => {
                state.isLoadingEducation = false;
                state.educationError = action.payload as string;
            });

        // ==================== DELETE EDUCATION ====================
        builder
            .addCase(deleteEducation.pending, (state) => {
                state.isLoadingEducation = true;
            })
            .addCase(deleteEducation.fulfilled, (state, action) => {
                state.isLoadingEducation = false;
                state.educationList = state.educationList.filter(
                    (edu) => edu.educationId !== action.payload
                );
                // console.log('✅ [SLICE] Education deleted');
            })
            .addCase(deleteEducation.rejected, (state, action) => {
                state.isLoadingEducation = false;
                state.educationError = action.payload as string;
            });

        // ==================== ARCHIVE EDUCATION ====================
        builder
            .addCase(archiveEducation.pending, (state) => {
                state.isLoadingEducation = true;
            })
            .addCase(archiveEducation.fulfilled, (state, action) => {
                state.isLoadingEducation = false;
                state.educationList = state.educationList.filter(
                    (edu) => edu.educationId !== action.payload
                );
                // console.log('✅ [SLICE] Education archived');
            })
            .addCase(archiveEducation.rejected, (state, action) => {
                state.isLoadingEducation = false;
                state.educationError = action.payload as string;
            });
    },
});

export const {
    setSelectedEducation,
    clearEducationError,
    resetEducationState,
} = educationSlice.actions;

export default educationSlice.reducer;