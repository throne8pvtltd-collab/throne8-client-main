'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/core/store/store.hooks';
import { checkAuthStatus } from '@/hooks/auth';

export default function AuthProvider({
    children
}: {
    children: React.ReactNode
}) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkAuthStatus());
    }, [dispatch]);

    return <>{children}</>;
}