'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthService from '@/lib/api/auth.service';
import TokenStorage from '@/lib/store/token.storage';
import config from '@/config/env.config';

interface UseAuthReturn {
    user: {
        [x: string]: any;
        userId: string;
        email: string;
        role: string;
    } | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    logout: () => Promise<void>;
    refreshAuth: () => void;
}

export function useAuth(): UseAuthReturn {
    const router = useRouter();
    const [user, setUser] = useState<UseAuthReturn['user']>(null);
    const [isLoading, setIsLoading] = useState(true);

    const checkAuth = () => {
        try {
            const userData = TokenStorage.getUserData();
            const isAuth = AuthService.isAuthenticated();

            setUser(isAuth ? userData : null);
        } catch (error) {
            console.error('❌ [useAuth] Error checking auth:', error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const refreshAuth = () => {
       
        checkAuth();
    };

    const logout = async () => {
        try {
            await AuthService.logout();
            setUser(null);
            router.push('/login');
        } catch (error) {
            console.error('❌ [useAuth] Logout error:', error);
        }
    };

    return {
        user,
        isAuthenticated: !!user,
        isLoading,
        logout,
        refreshAuth
    };
}

export function useProtectedRoute() {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            await new Promise(resolve => setTimeout(resolve, 50));

            // ✅ refreshToken check karo, accessToken nahi
            const hasRefreshToken = !!TokenStorage.getRefreshToken();
            const hasUserData = !!TokenStorage.getUserData();
            const hasSession = hasRefreshToken && hasUserData;

            if (!hasSession) {
                router.replace('/login');
                return;
            }

            // ✅ AccessToken expire hua? Silent refresh karo
            if (TokenStorage.needsTokenRefresh()) {
                const refreshToken = TokenStorage.getRefreshToken();
                try {
                    const response = await fetch(
                        `${config?.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL}${config?.NEXT_PUBLIC_REFRESH_TOKEN_ENDPOINT || process.env.NEXT_PUBLIC_REFRESH_TOKEN_ENDPOINT}`,
                        {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ refreshToken }),
                        }
                    );

                   
                    if (!response.ok) {
                        TokenStorage.clearAuthData();
                        router.replace('/login');
                        return;
                    }

                    const data = await response.json();
                    const { accessToken, refreshToken: newRefreshToken, expiresIn } = data.data.tokens;
                    TokenStorage.updateAccessToken(accessToken, expiresIn);
                    TokenStorage.updateRefreshToken(newRefreshToken);
                    console.log('✅ [useProtectedRoute] Token refreshed successfully', data, {
                        accessToken,
                        expiresIn
                    });

                } catch {
                    // Network error — session valid maano, mat redirect karo
                }
            }

            setIsChecking(false);
        };

        checkAuth();
    }, [router]);

    return { isChecking };
}