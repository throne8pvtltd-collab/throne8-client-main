'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FresherEducationFormData, fresherEducationSchema } from '../schema';

interface Props {
  onNext: (data: any) => void;
  onBack: () => void;
}


export default function FresherEducationRole({ onNext, onBack }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FresherEducationFormData>({
    resolver: zodResolver(fresherEducationSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  // Next button enable only when required fields are filled
  const isFormValid = isValid;
  const onSubmit = (data: FresherEducationFormData) => {
    onNext({
      highestEducation: data.highestEducation,
      preferredRole: data.preferredRole,
      cgpa: data.cgpa || null,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-8">
        <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#4a3728] to-[#8b7355]">
          Education & Role
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Highest Education (e.g. B.Tech CSE) *
            </label>
            <input
              {...register('highestEducation')}
              type="text"
              placeholder="B.Tech CSE, B.Com, 12th Pass"
              className={`w-full px-5 py-4 text-black rounded-xl border ${errors.highestEducation ? 'border-red-500' : 'border-[#4a3728]'
                } focus:outline-none focus:ring-2 ${errors.highestEducation ? 'focus:ring-red-500' : 'focus:ring-[#4a3728]'
                } transition`}
            />
            {errors.highestEducation && (
              <p className="text-red-500 text-sm mt-2">• {errors.highestEducation.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Job Role *
            </label>
            <input
              {...register('preferredRole')}
              type="text"
              placeholder="Software Developer, Data Analyst"
              className={`w-full px-5 py-4 text-black rounded-xl border ${errors.preferredRole ? 'border-red-500' : 'border-[#4a3728]'
                } focus:outline-none focus:ring-2 ${errors.preferredRole ? 'focus:ring-red-500' : 'focus:ring-[#4a3728]'
                } transition`}
            />
            {errors.preferredRole && (
              <p className="text-red-500 text-sm mt-2">• {errors.preferredRole.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CGPA / Percentage (optional)
            </label>
            <input
              {...register('cgpa')}
              type="text"
              placeholder="8.5 or 85%"
              className={`w-full px-5 py-4 text-black rounded-xl border ${errors.cgpa ? 'border-red-500' : 'border-[#4a3728]'
                } focus:outline-none focus:ring-2 ${errors.cgpa ? 'focus:ring-red-500' : 'focus:ring-[#4a3728]'
                } transition`}
            />
            {errors.cgpa && (
              <p className="text-red-500 text-sm mt-2">• {errors.cgpa.message}</p>
            )}
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={onBack}
              className="px-8 py-4 bg-gradient-to-r from-[#4a3728] to-[#8b7355] text-white border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className={`
        px-8 py-4 rounded-xl font-semibold transition shadow-lg
        ${isValid
                  ? 'bg-gradient-to-r from-[#4a3728] to-[#8b7355] text-white hover:opacity-90'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
      `}
            >
              Next
            </button>
          </div>
        </form>


      </div>
    </div >
  );
}