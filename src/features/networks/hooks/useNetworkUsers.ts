import { useState, useCallback } from 'react';
import AuthService from '@/lib/api/auth.service';
import ConnectionService from '@/lib/api/connection.service';
import ProfileService from '@/lib/api/profile.service';

export const useNetworkUsers = () => {
    const [networkUsers, setNetworkUsers] = useState<any[]>([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    const fetchNetworkUsers = useCallback(async (userId: string) => {
        try {
            setIsLoadingUsers(true);
            setCurrentUserId(userId);

            // ✅ STEP 1: Fetch user's connections in parallel with users
            const [usersResponse, connectionsResponse] = await Promise.all([
                AuthService.getAllUsers({ limit: 100 }),
                ConnectionService.getUserConnections(userId).catch(() => ({ data: { data: [] } }))
            ]);

            const users = usersResponse.data.users;
            const connections = connectionsResponse.data.data || [];

            // ✅ STEP 2: Create Set of connected user IDs for fast lookup
            const connectedUserIds = new Set<string>();
            connections.forEach((conn: any) => {
                if (conn.fromUserId !== userId) connectedUserIds.add(conn.fromUserId);
                if (conn.toUserId !== userId) connectedUserIds.add(conn.toUserId);
            });

            // ✅ STEP 3: Filter out current user and connected users
            const userIds = users
                .map((user: any) => user.userId)
                .filter((id: string) => id !== userId && !connectedUserIds.has(id));

            // ✅ STEP 4: Fetch detailed profile data — SINGLE BULK CALL
            // (pehle yahan har user ke liye alag getUserProfileById call hota tha,
            // jisse 429 aata tha. Ab ek hi request mein sab fetch hote hain.)
            let usersData: any[] = [];
            if (userIds.length > 0) {
                try {
                    const bulkResponse = await AuthService.getUsersBulk(userIds);
                    usersData = bulkResponse.data?.users || [];
                } catch (err) {
                    console.warn('⚠️ Failed to fetch users in bulk:', err);
                    usersData = [];
                }
            }

            // ✅ STEP 5: Extract profile photo IDs
            const profilePhotoIds = usersData
                .map((user: any) => user.profilePhotoId)
                .filter(Boolean);

            // ✅ STEP 6: Fetch all profile photos (already bulk — no change)
            let profilePhotosMap: Record<string, string> = {};
            if (profilePhotoIds.length > 0) {
                try {
                    const photosResponse = await ProfileService.getMultipleProfilePhotosByIds(profilePhotoIds);
                    profilePhotosMap = photosResponse.data.photos.reduce((acc: Record<string, string>, photo: any) => {
                        acc[photo.photoId] = photo.cloudinarySecureUrl;
                        return acc;
                    }, {});
                } catch (error) {
                    console.warn('⚠️ Failed to fetch profile photos:', error);
                }
            }

            // ✅ STEP 7: Extract headline IDs
            const headlineIds = usersData
                .map((user: any) => user.headlineId)
                .filter(Boolean);

            // ✅ STEP 8: Fetch all headlines — SINGLE BULK CALL
            // (pehle yahan har headline ke liye alag getHeadlineById call hota tha)
            let headlinesMap: Record<string, string> = {};
            if (headlineIds.length > 0) {
                try {
                    const headlinesResponse = await ProfileService.getMultipleHeadlinesByIds(headlineIds);
                    const headlines = headlinesResponse.data?.headlines || [];
                    headlinesMap = headlines.reduce((acc: Record<string, string>, headline: any) => {
                        acc[headline.headlineId] = headline.title;
                        return acc;
                    }, {});
                } catch (error) {
                    console.warn('⚠️ Failed to fetch headlines:', error);
                }
            }

            // ✅ STEP 9: Transform data for UI
            const transformedUsers = usersData.map((user: any) => {
                const profileImageUrl = user.profilePhotoId
                    ? profilePhotosMap[user.profilePhotoId] || null
                    : null;

                const headlineText = user.headlineId
                    ? headlinesMap[user.headlineId] || null
                    : null;

                return {
                    id: user.userId,
                    name: `${user.firstName} ${user.lastName}`.trim(),
                    title: headlineText || '',
                    mutuals: 'Connect to see mutual connections',
                    image: profileImageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdYRNQDghH1JvFXro2Yz3iWNmmFAubFZ-RGQ&s',
                    location: user.location || '',
                };
            });

            setNetworkUsers(transformedUsers);

        } catch (error: any) {
            setNetworkUsers([]);
        } finally {
            setIsLoadingUsers(false);
        }
    }, []);

    return {
        networkUsers,
        isLoadingUsers,
        fetchNetworkUsers,
    };
};