// src/store/features/profile/index.ts

import {
    fetchUserProfile,
    uploadCoverPhoto,
    updateCoverPhoto,
    fetchUserPosts,
    fetchCoverPhotoUrl,
    fetchProfilePhotoUrl,
    createHeadline,
    updateUserProfile,
    uploadProfileImage,
    archiveEducation,

    fetchAllEducation,
    createEducation,
    updateEducation,
    deleteEducation,
} from './thunks';

// Thunks
export {
    fetchUserProfile,
    uploadCoverPhoto,
    updateCoverPhoto,
    fetchUserPosts,
    fetchProfilePhotoUrl,
    fetchCoverPhotoUrl,
    updateUserProfile,
    createHeadline,
    uploadProfileImage,

    fetchAllEducation,
    createEducation,
    updateEducation,
    deleteEducation,
    archiveEducation,
};

// Slice
export {
    profileReducer,
    setProfileImageUrl,
    setBannerUrl,
    clearProfileError,
    resetProfileState,
} from './slices';