// src/store/features/profile/thunks/index.ts

import { archiveEducation, createEducation, deleteEducation, fetchAllEducation, updateEducation } from "./educationThunks";
import {
    fetchUserProfile,
    uploadCoverPhoto,
    updateCoverPhoto,
    fetchUserPosts,
    fetchCoverPhotoUrl,
    fetchProfilePhotoUrl,
} from "./profileThunks";

import { createHeadline, updateUserProfile, uploadProfileImage } from "./profileUpdateThunks";

export {
    fetchUserProfile,
    fetchProfilePhotoUrl,
    fetchCoverPhotoUrl,
    uploadCoverPhoto,
    updateCoverPhoto,
    fetchUserPosts,

    updateUserProfile,
    createHeadline,
    uploadProfileImage,

    fetchAllEducation,
    createEducation,
    updateEducation,
    deleteEducation,
    archiveEducation,
};