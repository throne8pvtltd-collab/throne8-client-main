// src/store/features/auth/slices/loginSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser, logoutUser, checkAuthStatus } from '../thunks';
import { LoginState } from '@/features/auth/interface';

const initialState: LoginState = {
    loading: false,
    error: null,
    user: null,
    isAuthenticated: false,
    rememberMe: false,
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        // Manual actions
        clearError: (state) => {
            state.error = null;
        },
        setRememberMe: (state, action: PayloadAction<boolean>) => {
            state.rememberMe = action.payload;
        },
        resetLoginState: () => initialState,
    },
    extraReducers: (builder) => {
        // ==================== LOGIN ====================
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.user = action.payload.data.user;
                state.isAuthenticated = true;
                // console.log('✅ [SLICE] Login state updated:', state.user?.email);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Login failed';
                state.user = null;
                state.isAuthenticated = false;
                console.error('❌ [SLICE] Login failed:', state.error);
            });

        // ==================== LOGOUT ====================
        builder
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                // Reset to initial state
                Object.assign(state, initialState);
                // console.log('✅ [SLICE] Logout state reset');
            })
            .addCase(logoutUser.rejected, (state, action) => {
                // Still reset state even on error
                Object.assign(state, initialState);
                console.error('❌ [SLICE] Logout error (state cleared):', action.payload);
            });

        // ==================== CHECK AUTH STATUS ====================
        builder
            .addCase(checkAuthStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkAuthStatus.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.user = action.payload;
                    state.isAuthenticated = true;
                    // console.log('✅ [SLICE] Auth restored:', state.user?.email);
                } else {
                    state.isAuthenticated = false;
                    state.user = null;
                }
            })
            .addCase(checkAuthStatus.rejected, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
            });
    },
});

export const { clearError, setRememberMe, resetLoginState } = loginSlice.actions;
export default loginSlice.reducer;