// lib/storage/token.storage.ts

interface UserData {
    userId: string;
    email: string;
    role: string;
}

interface TokenData {
    accessToken: string;
    refreshToken: string;
    expiresIn: string | number; // ✅ Accept both string and number
}

class TokenStorage {
    private static readonly ACCESS_TOKEN_KEY = 'throne8_access_token';
    private static readonly REFRESH_TOKEN_KEY = 'throne8_refresh_token';
    private static readonly USER_DATA_KEY = 'throne8_user_data';
    private static readonly TOKEN_EXPIRY_KEY = 'throne8_token_expiry';

    /**
     * 💾 Store tokens and user data after successful login
     */
    static setAuthData(tokens: TokenData, user: UserData): void {
        try {
            if (typeof window === 'undefined') {
                console.warn('⚠️ Not in browser environment, skipping storage');
                return;
            }

            // Store tokens
            localStorage.setItem(this.ACCESS_TOKEN_KEY, tokens.accessToken);
            localStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refreshToken);
            localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(user));

            // ✅ Handle both string ("15m") and number (900) formats
            let expiryMinutes: number;

            if (typeof tokens.expiresIn === 'string') {
                // String format: "15m" or "900"
                expiryMinutes = parseInt(tokens.expiresIn.replace(/\D/g, '')) || 15;
            } else {
                // Number format: 900 (seconds)
                expiryMinutes = Math.floor(tokens.expiresIn / 60) || 15;
            }

            const expiryTime = Date.now() + (expiryMinutes * 60 * 1000);
            localStorage.setItem(this.TOKEN_EXPIRY_KEY, expiryTime.toString());

            console.log('✅ [TokenStorage] Auth data stored successfully', {
                userId: user.userId,
                email: user.email,
                expiresIn: tokens.expiresIn,
                expiryMinutes,
                expiryTime: new Date(expiryTime).toLocaleString()
            });

        } catch (error) {
            console.error('❌ [TokenStorage] Failed to store auth data:', error);
            throw new Error('Failed to store authentication data');
        }
    }

    /**
     * 🔑 Get access token
     */
    static getAccessToken(): string | null {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem(this.ACCESS_TOKEN_KEY);
    }

    static updateRefreshToken(refreshToken: string): void {
        if (typeof window === 'undefined') return;
        localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
    }

    /**
     * 🔄 Get refresh token
     */
    static getRefreshToken(): string | null {
        if (typeof window === 'undefined') return null;

        try {
            const token = localStorage.getItem(this.REFRESH_TOKEN_KEY);
            if (!token) {
                console.log('ℹ️ [TokenStorage] No refresh token found');
            }
            return token;
        } catch (error) {
            console.error('❌ [TokenStorage] Error getting refresh token:', error);
            return null;
        }
    }

    /**
     * 👤 Get user data
     */
    static getUserData(): UserData | null {
        if (typeof window === 'undefined') return null;

        try {
            const userData = localStorage.getItem(this.USER_DATA_KEY);
            if (!userData) {
                console.log('ℹ️ [TokenStorage] No user data found');
                return null;
            }
            return JSON.parse(userData) as UserData;
        } catch (error) {
            console.error('❌ [TokenStorage] Error parsing user data:', error);
            return null;
        }
    }

    /**
     * ⏰ Check if access token is expired
     */
    static isTokenExpired(): boolean {
        if (typeof window === 'undefined') return true;

        try {
            const expiryTime = localStorage.getItem(this.TOKEN_EXPIRY_KEY);
            if (!expiryTime) return true;

            const isExpired = Date.now() >= parseInt(expiryTime);
            if (isExpired) {
                console.warn('⚠️ [TokenStorage] Token has expired');
            }
            return isExpired;
        } catch (error) {
            console.error('❌ [TokenStorage] Error checking token expiry:', error);
            return true;
        }
    }

    /**
     * ✅ Check if user is authenticated
     */
    static isAuthenticated(): boolean {
        if (typeof window === 'undefined') return false;
        const refreshToken = this.getRefreshToken();
        const userData = this.getUserData();
        return !!(refreshToken && userData);
    }

    // YE NAYI METHOD ADD KARO (isTokenExpired ke baad):
    static needsTokenRefresh(): boolean {
        if (typeof window === 'undefined') return false;
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) return false;
        return this.isTokenExpired();
    }

    /**
     * 🗑️ Clear all authentication data
     */
    static clearAuthData(): void {
        if (typeof window === 'undefined') return;

        try {
            localStorage.removeItem(this.ACCESS_TOKEN_KEY);
            localStorage.removeItem(this.REFRESH_TOKEN_KEY);
            localStorage.removeItem(this.USER_DATA_KEY);
            localStorage.removeItem(this.TOKEN_EXPIRY_KEY);
            console.log('✅ [TokenStorage] All auth data cleared');
        } catch (error) {
            console.error('❌ [TokenStorage] Error clearing auth data:', error);
        }
    }

    /**
     * 🔄 Update only access token
     */
    static updateAccessToken(accessToken: string, expiresIn: string | number): void {
        if (typeof window === 'undefined') return;

        try {
            localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);

            // Handle both formats
            let expiryMinutes: number;
            if (typeof expiresIn === 'string') {
                expiryMinutes = parseInt(expiresIn.replace(/\D/g, '')) || 15;
            } else {
                expiryMinutes = Math.floor(expiresIn / 60) || 15;
            }

            const expiryTime = Date.now() + (expiryMinutes * 60 * 1000);
            localStorage.setItem(this.TOKEN_EXPIRY_KEY, expiryTime.toString());

            console.log('✅ [TokenStorage] Access token updated');
        } catch (error) {
            console.error('❌ [TokenStorage] Error updating access token:', error);
        }
    }

    /**
     * 📊 Get auth summary
     */
    static getAuthSummary() {
        return {
            isAuthenticated: this.isAuthenticated(),
            hasAccessToken: !!this.getAccessToken(),
            hasRefreshToken: !!this.getRefreshToken(),
            userData: this.getUserData(),
            tokenExpired: this.isTokenExpired(),
        };
    }
}

export default TokenStorage;
export type { UserData, TokenData };