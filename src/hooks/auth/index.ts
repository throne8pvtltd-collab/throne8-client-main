// src/store/features/auth/index.ts

import { checkAuthStatus, loginUser, logoutUser } from './thunks';
import { registerUser } from './thunks/registerThunks';

// Thunks
export {
    registerUser,
    loginUser,
    logoutUser,
    checkAuthStatus
};

// Slice
export {
    loginReducer, clearError, setRememberMe, resetLoginState,
    setCurrentStep,     
    nextStep,           
    previousStep,       
    updateFormData,     
    clearFormData,      
    clearRegisterError, 
    resetRegisterState, 
} from './slices';