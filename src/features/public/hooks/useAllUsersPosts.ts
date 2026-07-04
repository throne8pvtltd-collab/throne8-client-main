// src/hooks/home/useAllUsersPosts.ts
import { useState, useCallback } from 'react';
import { transformApiPostToFeedPost } from '@/shared/utils/postTransformers';
import ProfileService from '@/lib/api/profile.service';
import AuthService from '@/lib/api/auth.service';

export const useAllUsersPosts = () => {
    const [allPosts, setAllPosts] = useState<any[]>([]);
    const [isLoadingAllPosts, setIsLoadingAllPosts] = useState(true);

    const fetchAllUsersPosts = useCallback(async () => {
        try {
            setIsLoadingAllPosts(true);
            // console.log('🔄 [HOOK] Fetching all posts for home feed...');

            // ✅ Step 1: GET ALL POSTS FROM DATABASE
            const response = await ProfileService.getAllPostsForHomeFeed(false);
            const posts = response.data.posts;

            // console.log(`✅ [HOOK] Fetched ${posts.length} total posts from database`);

            // ✅ Step 2: Extract all unique user IDs
            const uniqueUserIds = [...new Set(posts.map((post: any) => post.userId))];
            // console.log(`👥 Found ${uniqueUserIds.length} unique users`);

            // ✅ Step 3: Fetch all user data in parallel
            const usersDataPromises = uniqueUserIds.map(userId => {
                const userIdString = String(userId);
                return AuthService.getUserProfileById(userIdString).catch(err => {
                    console.warn(`⚠️ Failed to fetch user ${userIdString}:`, err);
                    return null;
                });
            });
            const usersDataResponses = await Promise.all(usersDataPromises);
            const usersData = usersDataResponses
                .filter(res => res !== null)
                .reduce((acc, res) => {
                    acc[res.data.userId] = res.data;
                    return acc;
                }, {} as Record<string, any>);

            // ✅ Step 4: Extract all profile photo IDs
            const profilePhotoIds = Object.values(usersData)
                .map((user: any) => user.profilePhotoId)
                .filter(Boolean);

            // console.log(`📸 Found ${profilePhotoIds.length} profile photo IDs`);

            // ✅ Step 5: Fetch ALL profile photos in ONE API call
            let profilePhotosMap: Record<string, string> = {};
            if (profilePhotoIds.length > 0) {
                try {
                    const photosResponse = await ProfileService.getMultipleProfilePhotosByIds(profilePhotoIds);
                    const photos = photosResponse.data.photos;

                    // Create a map: photoId -> cloudinarySecureUrl
                    profilePhotosMap = photos.reduce((acc: Record<string, string>, photo: any) => {
                        acc[photo.photoId] = photo.cloudinarySecureUrl;
                        return acc;
                    }, {});

                    // console.log(`✅ Fetched ${Object.keys(profilePhotosMap).length} profile images in single call`);
                } catch (error) {
                    console.warn('⚠️ Failed to fetch profile photos:', error);
                }
            }

            // ✅ Step 6: Extract all headline IDs
            const headlineIds = Object.values(usersData)
                .map((user: any) => user.headlineId)
                .filter(Boolean);

            // console.log(`📰 Found ${headlineIds.length} headline IDs`);

            // ✅ Step 7: Fetch all headlines in parallel
            let headlinesMap: Record<string, string> = {};
            if (headlineIds.length > 0) {
                const headlinePromises = headlineIds.map(headlineId =>
                    ProfileService.getHeadlineById(headlineId).catch(() => null)
                );
                const headlineResponses = await Promise.all(headlinePromises);
                headlinesMap = headlineResponses
                    .filter(res => res !== null)
                    .reduce((acc, res) => {
                        acc[res.data.headlineId] = res.data.title;
                        return acc;
                    }, {} as Record<string, string>);

                // console.log(`✅ Fetched ${Object.keys(headlinesMap).length} headlines`);
            }

            // ✅ Step 8: Transform posts with cached data
            const transformedPosts = posts.map((post: any) => {
                const userData = usersData[post.userId];
                if (!userData) {
                    console.warn(`⚠️ No user data for post ${post.postId}`);
                    return null;
                }

                const profileImageUrl = userData.profilePhotoId
                    ? profilePhotosMap[userData.profilePhotoId] || null
                    : null;

                const headlineText = userData.headlineId
                    ? headlinesMap[userData.headlineId] || null
                    : null;

                return transformApiPostToFeedPost(post, userData, profileImageUrl, headlineText);
            }).filter((p: null) => p !== null);

            setAllPosts(transformedPosts);
            // console.log(`✅ [HOOK] Successfully transformed ${transformedPosts.length} posts for home feed`);

        } catch (error: any) {
            console.error('❌ [HOOK] Failed to fetch home feed posts:', error);
            setAllPosts([]);
        } finally {
            setIsLoadingAllPosts(false);
        }
    }, []);

    return {
        allPosts,
        isLoadingAllPosts,
        fetchAllUsersPosts,
    };
};