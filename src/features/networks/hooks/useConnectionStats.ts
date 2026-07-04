import { useState, useEffect } from 'react';
import ConnectionService from '@/lib/api/connection.service';
import { useAuth } from '@/features/auth/hooks/useAuth';

interface ConnectionStats {
    totalConnections: number;
    following: number;
    followers: number;
}

export const useConnectionStats = () => {
    const [stats, setStats] = useState<ConnectionStats>({
        totalConnections: 0,
        following: 0,
        followers: 0
    });
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        if (user?.userId) {
            fetchStats();
        }
    }, [user]);

    const fetchStats = async () => {
        try {
            setIsLoading(true);
            const response = await ConnectionService.getConnectionStats(user!.userId);

            const statsData = response.data;

            setStats({
                totalConnections: statsData.totalConnections || 0,
                following: statsData.outgoingRequests || 0, // ✅ Pending sent requests
                followers: statsData.incomingRequests || 0, // ✅ Pending received requests
            });

        } catch (error: any) {
            console.error('❌ [STATS] Failed:', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const incrementFollowing = () => {
        setStats(prev => ({ ...prev, following: prev.following + 1 }));
    };

    const incrementFollowers = () => {
        setStats(prev => ({ ...prev, followers: prev.followers + 1 }));
    };

    const incrementConnections = () => {
        setStats(prev => ({ ...prev, totalConnections: prev.totalConnections + 1 }));
    };

    return {
        stats,
        isLoading,
        incrementFollowing,
        incrementFollowers,
        incrementConnections,
        refetch: fetchStats
    };
};