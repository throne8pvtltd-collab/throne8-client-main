'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, AlertCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { ForgotPasswordFormData, forgotPasswordSchema } from '../validators';

// ==================== VALIDATION SCHEMA ====================


interface ForgotPasswordFormProps {
  onEmailSubmit: (email: string) => Promise<void>;
  isLoading?: boolean;
}

export default function ForgotPasswordForm({ onEmailSubmit, isLoading = false }: ForgotPasswordFormProps) {
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setApiError(null);
      setSuccessMessage(null);
      await onEmailSubmit(data.email);
      setSuccessMessage('OTP sent to your email. Please check your inbox.');
      reset();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send OTP. Please try again.';
      setApiError(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
      {/* Email Input */}
      <div className="relative">
        <label htmlFor="email" className="block text-sm font-medium text-[#4a3728] mb-2">
          Registered Email
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#745842]" />
          <input
            id="email"
            type="email"
            placeholder="Enter your registered email"
            className={`w-full pl-12 pr-4 py-3 rounded-xl text-[#4a3728] border-2 outline-none transition-all
              ${errors.email 
                ? 'border-red-500 focus:border-red-600 bg-red-50' 
                : 'border-[#e0d8cf] focus:border-[#8b7355] bg-white'
              }`}
            {...register('email')}
            disabled={isSubmitting || isLoading}
          />
        </div>
        {errors.email && (
          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.email.message}
          </p>
        )}
      </div>

      {/* API Error Message */}
      {apiError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{apiError}</p>
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
          <Mail className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-green-700">{successMessage}</p>
        </div>
      )}

      {/* Send OTP Button */}
      <button
        type="submit"
        disabled={isSubmitting || isLoading}
        className="w-full py-3 px-4 bg-gradient-to-r from-[#4a3728] to-[#8b7355] text-white font-semibold rounded-xl
                   hover:opacity-90 transition-all shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed
                   flex items-center justify-center gap-2"
      >
        {isSubmitting || isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending OTP...
          </>
        ) : (
          'Send OTP'
        )}
      </button>

      {/* Info Text */}
      <p className="text-xs text-[#745842] text-center">
        We'll send a one-time password to your registered email address
      </p>
    </form>
  );
}
