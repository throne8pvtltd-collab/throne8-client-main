// src/store/features/profile/slices/index.ts

import { clearEducationError, resetEducationState, setSelectedEducation } from './educationSlice';
import { clearProfileError, resetProfileState, setBannerUrl, setProfileImageUrl } from './profileSlice';

export { default as profileReducer } from './profileSlice';
export { default as educationReducer } from './educationSlice';

export {
    setProfileImageUrl,
    setBannerUrl,
    clearProfileError,
    resetProfileState,

    setSelectedEducation,
    clearEducationError,
    resetEducationState,
};