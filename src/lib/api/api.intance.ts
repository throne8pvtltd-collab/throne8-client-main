// src/lib/api/api.instance.ts
import config from "@/config/env.config";
import axios, { AxiosInstance } from "axios";
import TokenStorage from "@/lib/store/token.storage";

const api: AxiosInstance = axios.create({
    baseURL: config.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: config.NEXT_PUBLIC_API_TIMEOUT || Number(process.env.NEXT_PUBLIC_API_TIMEOUT),
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
});

// ==================== REQUEST INTERCEPTOR ====================
// हर request में access token लगाओ
api.interceptors.request.use(
    (config) => {
        const token = TokenStorage.getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ==================== RESPONSE INTERCEPTOR ====================
let isRefreshing = false;
let failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) reject(error);
        else resolve(token!);
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        // 401 आया और पहले retry नहीं हुआ
        if (error.response?.status === 401 && !originalRequest._retry) {

            // Refresh पहले से चल रहा है → queue में डालो
            if (isRefreshing) {
                return new Promise<string>((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                }).catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = TokenStorage.getRefreshToken();

            // Refresh token नहीं है → logout
            if (!refreshToken) {
                isRefreshing = false;
                TokenStorage.clearAuthData();
                window.location.href = '/login';
                return Promise.reject(error);
            }

            try {
                // नया token लो
                const baseURL = config.NEXT_PUBLIC_API_BASE_URL ||
                    process.env.NEXT_PUBLIC_API_BASE_URL;

                const refreshResponse = await axios.post(
                    `${baseURL}/auth/refresh-token`,
                    { refreshToken },
                    { headers: { 'Content-Type': 'application/json' } }
                );

                const { accessToken, refreshToken: newRefreshToken, expiresIn } =
                    refreshResponse.data.data.tokens;

                // Tokens save करो
                TokenStorage.updateAccessToken(accessToken, expiresIn);
                TokenStorage.updateRefreshToken(newRefreshToken);

                // Queue में pending requests को नया token दो
                processQueue(null, accessToken);

                // Original request retry
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return api(originalRequest);

            } catch (refreshError) {
                // Refresh fail → सब clear करो, login पर भेजो
                processQueue(refreshError, null);
                TokenStorage.clearAuthData();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;