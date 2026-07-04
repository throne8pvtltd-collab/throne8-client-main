'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AlertCircle, Eye, EyeOff, Loader2, Lock, X } from 'lucide-react';
import { useState } from 'react';

// ==================== VALIDATION SCHEMA ====================
const updatePasswordSchema = z.object({
  newPassword: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(128, { message: 'Password is too long (max 128 characters)' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter (A-Z)'
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter (a-z)'
    })
    .regex(/[0-9]/, {
      message: 'Password must contain at least one number (0-9)'
    })
    .regex(/[@$!%*?&#^()_+\-=\[\]{}|;:,.<>]/, {
      message: 'Password must contain at least one special character (@$!%*?&#^()_+-=[]{}|;:,.<>)'
    })
    .refine((pwd) => !/\s/.test(pwd), {
      message: 'Password cannot contain spaces'
    })
    .refine((pwd) => !pwd.toLowerCase().includes('password'), {
      message: 'Password cannot contain the word "password"',
    })
    .refine((pwd) => !pwd.toLowerCase().includes('123'), {
      message: 'Avoid common sequences like "123"',
    }),

  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>;

interface UpdatePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPasswordUpdate: (password: string) => Promise<void>;
  email?: string;
}

export default function UpdatePasswordModal({
  isOpen,
  onClose,
  onPasswordUpdate,
  email,
}: UpdatePasswordModalProps) {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
    mode: 'onChange',
  });

  const newPassword = watch('newPassword');

  const onSubmit = async (data: UpdatePasswordFormData) => {
    try {
      setApiError(null);
      await onPasswordUpdate(data.newPassword);
      reset();
      // Modal will be closed by parent component
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update password. Please try again.';
      setApiError(errorMessage);
    }
  };

  if (!isOpen) return null;

  const passwordStrength = newPassword ? (
    newPassword.length >= 8 &&
    /[A-Z]/.test(newPassword) &&
    /[a-z]/.test(newPassword) &&
    /[0-9]/.test(newPassword) &&
    /[@$!%*?&#^()_+\-=\[\]{}|;:,.<>]/.test(newPassword)
      ? 'strong'
      : 'weak'
  ) : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#4a3728] to-[#8b7355] rounded-full flex items-center justify-center">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-[#4a3728]">Set New Password</h2>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="text-[#4a3728]/50 hover:text-[#4a3728] transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Email Info */}
        {email && (
          <p className="text-sm text-[#745842] mb-4 pb-4 border-b border-[#e0d8cf]">
            Updating password for <span className="font-semibold">{email}</span>
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* New Password Input */}
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-[#4a3728] mb-2">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#745842]" />
              <input
                id="newPassword"
                type={showNewPassword ? 'text' : 'password'}
                placeholder="Enter new password"
                className={`w-full pl-12 pr-12 py-3 text-[#4a3728] rounded-lg border-2 outline-none transition-all
                  ${errors.newPassword 
                    ? 'border-red-500 focus:border-red-600 bg-red-50' 
                    : 'border-[#e0d8cf] focus:border-[#8b7355] bg-white'
                  }`}
                {...register('newPassword')}
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                disabled={isSubmitting}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#745842] hover:text-[#4a3728] transition-colors disabled:opacity-50"
              >
                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.newPassword.message}
              </p>
            )}

            {/* Password Strength Indicator */}
            {newPassword && (
              <div className="mt-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-[#745842]">Password Strength:</span>
                  <span className={`text-xs font-semibold ${
                    passwordStrength === 'strong' ? 'text-green-600' : 'text-orange-600'
                  }`}>
                    {passwordStrength === 'strong' ? 'Strong' : 'Weak'}
                  </span>
                </div>
                <div className="h-2 bg-[#e0d8cf] rounded-full overflow-hidden">
                  <div className={`h-full transition-all ${
                    passwordStrength === 'strong' ? 'bg-green-500 w-full' : 'bg-orange-500 w-1/2'
                  }`} />
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#4a3728] mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#745842]" />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                className={`w-full pl-12 pr-12 py-3 text-[#4a3728] rounded-lg border-2 outline-none transition-all
                  ${errors.confirmPassword 
                    ? 'border-red-500 focus:border-red-600 bg-red-50' 
                    : 'border-[#e0d8cf] focus:border-[#8b7355] bg-white'
                  }`}
                {...register('confirmPassword')}
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isSubmitting}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#745842] hover:text-[#4a3728] transition-colors disabled:opacity-50"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.confirmPassword.message}
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

          {/* Password Requirements */}
          <div className="p-3 bg-[#f6ede8] border border-[#e0d8cf] rounded-lg">
            <p className="text-xs font-semibold text-[#4a3728] mb-2">Password must contain:</p>
            <ul className="text-xs text-[#745842] space-y-1">
              <li className={`flex items-center gap-2 ${newPassword && /[A-Z]/.test(newPassword) ? 'text-green-600' : ''}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${newPassword && /[A-Z]/.test(newPassword) ? 'bg-green-600' : 'bg-[#e0d8cf]'}`}></span>
                At least one uppercase letter (A-Z)
              </li>
              <li className={`flex items-center gap-2 ${newPassword && /[a-z]/.test(newPassword) ? 'text-green-600' : ''}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${newPassword && /[a-z]/.test(newPassword) ? 'bg-green-600' : 'bg-[#e0d8cf]'}`}></span>
                At least one lowercase letter (a-z)
              </li>
              <li className={`flex items-center gap-2 ${newPassword && /[0-9]/.test(newPassword) ? 'text-green-600' : ''}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${newPassword && /[0-9]/.test(newPassword) ? 'bg-green-600' : 'bg-[#e0d8cf]'}`}></span>
                At least one number (0-9)
              </li>
              <li className={`flex items-center gap-2 ${newPassword && /[@$!%*?&#^()_+\-=\[\]{}|;:,.<>]/.test(newPassword) ? 'text-green-600' : ''}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${newPassword && /[@$!%*?&#^()_+\-=\[\]{}|;:,.<>]/.test(newPassword) ? 'bg-green-600' : 'bg-[#e0d8cf]'}`}></span>
                At least one special character
              </li>
              <li className={`flex items-center gap-2 ${newPassword && newPassword.length >= 8 ? 'text-green-600' : ''}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${newPassword && newPassword.length >= 8 ? 'bg-green-600' : 'bg-[#e0d8cf]'}`}></span>
                Minimum 8 characters
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 border-2 border-[#e0d8cf] text-[#4a3728] rounded-lg
                         hover:bg-[#f6ede8] transition-colors disabled:opacity-50 font-medium text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-[#4a3728] to-[#8b7355] text-white rounded-lg
                         hover:opacity-90 transition-all disabled:opacity-60 font-medium text-sm flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Password'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
