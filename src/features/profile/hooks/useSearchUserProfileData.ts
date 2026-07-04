// src/hooks/data/useSearchUserProfileData.ts
import { useState, useCallback } from 'react';
import AuthService from '@/lib/api/auth.service';
import { profileApi } from '@/lib/api/data/profile.api';
import { UserProfileData } from '@/types/profile.types';

export const useSearchUserProfileData = (userId: string) => {
    const [userProfileData, setUserProfileData] = useState<UserProfileData | null>(null);
    const [profileImageUrl, setProfileImageUrl] = useState(
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdYRNQDghH1JvFXro2Yz3iWNmmFAubFZ-RGQ&s'
    );
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

            // Fetch cover photo
            if (data?.coverPhotoId) {
                try {
                    const coverUrl = await profileApi.fetchCoverPhoto(data.coverPhotoId);
                    setCoverPhotoId(data.coverPhotoId);

                    if (coverUrl) {
                        setBannerUrl(coverUrl);
                    }
                } catch (error) {
                    console.warn('⚠️ [SEARCH_USER_HOOK] Failed to load cover photo');
                }
            }

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