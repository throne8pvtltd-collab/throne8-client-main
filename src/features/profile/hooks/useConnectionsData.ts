// src/hooks/data/useConnectionsData.ts
import { useState, useCallback } from 'react';
import ConnectionService from '@/lib/api/connection.service';
import AuthService from '@/lib/api/auth.service';
import ProfileService from '@/lib/api/profile.service';

export const useConnectionsData = () => {
    const [followingList, setFollowingList] = useState<any[]>([]);
    const [followersList, setFollowersList] = useState<any[]>([]);
    const [isLoadingConnections, setIsLoadingConnections] = useState(true);
    const [totalConnections, setTotalConnections] = useState(0);

    const fetchConnectionsData = useCallback(async (currentUserId: string) => {
        try {
            setIsLoadingConnections(true);

            // ✅ STEP 1: Get all connections
            const connectionsResponse = await ConnectionService.getUserConnections(currentUserId);
            const connections = connectionsResponse.data.data || [];

            setTotalConnections(connections.length);

            // ✅ STEP 2: Separate following and followers, build connectionId map
            const followingUserIds: string[] = [];
            const followerUserIds: string[] = [];
            const connectionIdMap: Record<string, string> = {};

            connections.forEach((conn: any) => {
                const targetId = conn.fromUserId === currentUserId ? conn.toUserId : conn.fromUserId;
                connectionIdMap[targetId] = conn.connectionId;

                if (conn.fromUserId === currentUserId) {
                    followingUserIds.push(conn.toUserId);
                } else if (conn.toUserId === currentUserId) {
                    followerUserIds.push(conn.fromUserId);
                }
            });

            // ✅ STEP 3: Fetch user profiles for both lists
            const [followingProfiles, followerProfiles] = await Promise.all([
                fetchUserProfiles(followingUserIds, connectionIdMap),
                fetchUserProfiles(followerUserIds, connectionIdMap)
            ]);

            setFollowingList(followingProfiles);
            setFollowersList(followerProfiles);

        } catch (error: any) {
            console.error('❌ [CONNECTIONS] Failed to fetch:', error);
            setFollowingList([]);
            setFollowersList([]);
        } finally {
            setIsLoadingConnections(false);
        }
    }, []);

    // ✅ Helper function to fetch user profiles — ab bulk mein
    const fetchUserProfiles = async (userIds: string[], connectionIdMap: Record<string, string> = {}) => {
        if (userIds.length === 0) return [];

        try {
            // ✅ SINGLE BULK CALL (pehle yahan har userId ke liye alag call hota tha)
            let profiles: any[] = [];
            try {
                const bulkResponse = await AuthService.getUsersBulk(userIds);
                profiles = bulkResponse.data?.users || [];
            } catch (err) {
                console.warn('⚠️ Failed to fetch users in bulk:', err);
                return [];
            }

            // Extract profile photo IDs
            const profilePhotoIds = profiles
                .map(user => user.profilePhotoId)
                .filter(Boolean);

            // Fetch profile photos
            let profilePhotosMap: Record<string, string> = {};
            if (profilePhotoIds.length > 0) {
                const photosResponse = await ProfileService.getMultipleProfilePhotosByIds(profilePhotoIds);
                profilePhotosMap = photosResponse.data.photos.reduce((acc: Record<string, string>, photo: any) => {
                    acc[photo.photoId] = photo.cloudinarySecureUrl;
                    return acc;
                }, {});
            }

            // Extract headline IDs
            const headlineIds = profiles
                .map(user => user.headlineId)
                .filter(Boolean);

            // ✅ SINGLE BULK CALL (pehle yahan har headline ke liye alag call hota tha)
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

            // Transform to UI format
            return profiles.map(user => ({
                id: user.userId,
                connectionId: connectionIdMap[user.userId] || '',
                name: `${user.firstName} ${user.lastName}`.trim(),
                headline: user.headlineId ? headlinesMap[user.headlineId] || '' : '',
                image: user.profilePhotoId
                    ? profilePhotosMap[user.profilePhotoId] || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdYRNQDghH1JvFXro2Yz3iWNmmFAubFZ-RGQ&s'
                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdYRNQDghH1JvFXro2Yz3iWNmmFAubFZ-RGQ&s',
                isFollowing: true,
            }));

        } catch (error) {
            console.error('❌ Failed to fetch user profiles:', error);
            return [];
        }
    };

    return {
        followingList,
        followersList,
        totalConnections,
        isLoadingConnections,
        fetchConnectionsData,
    };
};