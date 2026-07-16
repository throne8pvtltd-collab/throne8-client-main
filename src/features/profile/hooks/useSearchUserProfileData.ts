// src/hooks/data/useSearchUserProfileData.ts
import { useState, useCallback } from 'react';
import AuthService from '@/lib/api/auth.service';
import { profileApi } from '@/lib/api/data/profile.api';
import { UserProfileData } from '@/types/profile.types';

export const useSearchUserProfileData = (userId: string) => {
    const [userProfileData, setUserProfileData] = useState<UserProfileData | null>(null);
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [bannerUrl, setBannerUrl] = useState('');
    const [coverPhotoId, setCoverPhotoId] = useState<string>('');
    const [aboutId, setAboutId] = useState<string>('');
    const [headlineId, setHeadlineId] = useState<string>('');
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);
    const [profileError, setProfileError] = useState<string | null>(null);

    const fetchUserProfileById = useCallback(async () => {
        if (!userId) {
            setProfileError('User ID is required');
            setIsLoadingProfile(false);
            return;
        }

        try {
            setIsLoadingProfile(true);
            setProfileError(null);

            // ✅ Naye userId ke liye fetch shuru hote hi purana/stale data clear karo,
            // warna jab tak naya data na aaye purani profile ka banner/photo dikhta reh sakta hai
            setUserProfileData(null);
            setProfileImageUrl('');
            setBannerUrl('');
            setCoverPhotoId('');
            setAboutId('');
            setHeadlineId('');

            // ✅ getUserProfileById use karo
            const response = await AuthService.getUserProfileById(userId);
            const data = response.data;

            setUserProfileData(data);

            // Fetch profile photo
            if (data?.profilePhotoId) {
                try {
                    const photoUrl = await profileApi.fetchProfilePhoto(data.profilePhotoId);
                    if (photoUrl) {
                        setProfileImageUrl(photoUrl);
                    }
                } catch (error) {
                    console.warn('⚠️ [SEARCH_USER_HOOK] Failed to load profile photo');
                }
            }

            // Fetch cover photo — sirf tab jab is user ka apna coverPhotoId ho
            if (data?.coverPhotoId) {
                try {
                    const coverUrl = await profileApi.fetchCoverPhoto(data.coverPhotoId);
                    setCoverPhotoId(data.coverPhotoId);

                    if (coverUrl) {
                        setBannerUrl(coverUrl);
                    }
                } catch (error) {
                    console.warn('⚠️ [SEARCH_USER_HOOK] Failed to load cover photo');
                    // ✅ Fetch fail hone par bhi bannerUrl empty hi rahega — koi fallback nahi
                }
            }
            // ✅ Agar coverPhotoId nahi hai (user ne upload nahi kiya),
            // to bannerUrl upar reset kiya hua '' hi rahega — yahi expected behaviour hai

            // Set IDs
            if (data?.headlineId) {
                setHeadlineId(data.headlineId);
            }

            if (data?.aboutId) {
                setAboutId(data.aboutId);
            }

        } catch (error: any) {
            console.error('❌ [SEARCH_USER_HOOK] Failed to fetch profile:', error);
            setProfileError(error.message || 'Failed to load profile data');
        } finally {
            setIsLoadingProfile(false);
        }
    }, [userId]);

    return {
        userProfileData,
        profileImageUrl,
        bannerUrl,
        coverPhotoId,
        aboutId,
        headlineId,
        isLoadingProfile,
        profileError,
        fetchUserProfileById,
        setProfileImageUrl,
        setBannerUrl,
    };
};