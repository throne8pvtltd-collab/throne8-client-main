// src/store/features/auth/slices/index.ts

import { resetLoginState, setRememberMe } from './loginSlice';
import { clearError, clearFormData, nextStep, previousStep, resetRegisterState, setCurrentStep, updateFormData } from './registerSlice';

export { default as registerReducer } from './registerSlice';
export {
  setCurrentStep,
  nextStep,
  previousStep,
  updateFormData,
  clearFormData,
  clearError as clearRegisterError,
  resetRegisterState,
};
export { default as loginReducer } from './loginSlice';
export { clearError, setRememberMe, resetLoginState };