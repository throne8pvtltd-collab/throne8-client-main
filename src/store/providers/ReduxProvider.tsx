// src/store/providers/ReduxProvider.tsx

'use client';

import { Provider } from 'react-redux';
import { store } from '../../core/store/store';
import { useEffect } from 'react';
import { checkAuthStatus } from '../../hooks/auth';

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Check auth status on app load
        store.dispatch(checkAuthStatus());
    }, []);

    return <Provider store={store}>{children}</Provider>;
}