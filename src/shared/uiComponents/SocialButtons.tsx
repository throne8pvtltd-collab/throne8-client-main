'use client';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import config from '../../../tailwind.config';
export default function SocialButtons() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const handleGoogleLogin = () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api/v1';
      window.location.href = `${apiUrl}/auth/google`;
    } catch (error) {
      console.error('❌ [GOOGLE] OAuth initiation failed:', error);
      setApiError('Failed to initiate Google login. Please try again.');
    }
  };
  const handleGitHubLogin = () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api/v1';
      window.location.href = `${apiUrl}/auth/github`;
    } catch (error) {
      console.error('❌ [GITHUB] OAuth initiation failed:', error);
      setApiError('Failed to initiate GitHub login. Please try again.');
    }
  };
  return (
    <>
      <div className="flex items-center my-8">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-gray-500 text-sm">or continue with</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>
      {apiError && (
        <p className="text-red-500 text-sm text-center mb-3">{apiError}</p>
      )}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 sm:gap-3 py-3 sm:py-4 px-2 sm:px-3 border border-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-50 transition text-xs sm:text-sm"
        >
          <FcGoogle className="text-lg sm:text-2xl" />
          <span className="text-black font-medium hidden sm:inline">Google</span>
        </button>
        <button
          type="button"
          onClick={handleGitHubLogin}
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 sm:gap-3 py-3 sm:py-4 px-2 sm:px-3 border border-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-50 transition text-xs sm:text-sm"
        >
          <FaGithub className="text-lg sm:text-2xl text-gray-900" />
          <span className="text-black font-medium hidden sm:inline">GitHub</span>
        </button>
      </div>
    </>
  );
}