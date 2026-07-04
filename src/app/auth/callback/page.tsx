// src/app/auth/callback/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import TokenStorage from '@/lib/store/token.storage';

function CallbackHandler() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const accessToken = searchParams.get('accessToken');
        const refreshToken = searchParams.get('refreshToken');
        const userId = searchParams.get('userId');
        const email = searchParams.get('email');
        const role = searchParams.get('role');
        const error = searchParams.get('error');

        if (error) {
            console.error('OAuth error:', error);
            router.replace('/login?error=' + error);
            return;
        }

        if (!accessToken || !refreshToken || !userId || !email || !role) {
            console.error('Missing tokens or user data');
            router.replace('/login?error=missing_tokens');
            return;
        }

        // ✅ Fix: non-null values pass karo — TypeScript happy
        TokenStorage.setAuthData(
            {
                accessToken,
                refreshToken,
                expiresIn: '15m'
            },
            {
                userId,   // ab guaranteed string hai
                email,
                role
            }
        );

        console.log('✅ Google OAuth success, redirecting to dashboard...');

        const isNewUser = searchParams.get('isNewUser') === 'true';
        if (isNewUser) {
            router.replace('/onboarding/o-auth');
        } else {
            router.replace('/dashboard');
        }

    }, [searchParams, router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a3728] mx-auto mb-4" />
                <p className="text-gray-600">Signing in...</p>
            </div>
        </div>
    );
}

// ✅ Suspense wrap karna zaroori hai — useSearchParams ke liye Next.js require karta hai
export default function AuthCallbackPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a3728]" />
            </div>
        }>
            <CallbackHandler />
        </Suspense>
    );
}