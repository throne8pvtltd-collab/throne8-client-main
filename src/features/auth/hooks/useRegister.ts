// src/store/hooks/useRegister.ts

import { clearFormData, clearRegisterError, nextStep, previousStep, registerUser, resetRegisterState, setCurrentStep, updateFormData } from '@/hooks/auth';
import { useAppDispatch,useAppSelector } from '@/store/hooks';
import { RegistrationData } from '../interface';

export const useRegister = () => {
    const dispatch = useAppDispatch();

    const { loading, error, currentStep, formData, isComplete } = useAppSelector(
        (state) => state.register
    );

    // Actions
    const register = async (data: RegistrationData) => {
        return dispatch(registerUser(data)).unwrap();
    };

    const goToStep = (step: number) => {
        dispatch(setCurrentStep(step));
    };

    const goNext = () => {
        dispatch(nextStep());
    };

    const goBack = () => {
        dispatch(previousStep());
    };

    const saveFormData = (data: Partial<RegistrationData>) => {
        dispatch(updateFormData(data));
    };

    const clearForm = () => {
        dispatch(clearFormData());
    };

    const clearErrors = () => {
        dispatch(clearRegisterError());
    };

    const resetState = () => {
        dispatch(resetRegisterState());
    };

    return {
        // State
        loading,
        error,
        currentStep,
        formData,
        isComplete,

        // Actions
        register,
        goToStep,
        goNext,
        goBack,
        saveFormData,
        clearForm,
        clearErrors,
        resetState,
    };
};