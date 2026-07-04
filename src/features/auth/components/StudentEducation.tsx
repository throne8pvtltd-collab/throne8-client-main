'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { studentEducationSchema, StudentEducationFormData } from '../schema';

interface Props {
  onNext: (data: any) => void;
  onBack: () => void;
}


export default function StudentEducation({ onNext, onBack }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<StudentEducationFormData>({
    resolver: zodResolver(studentEducationSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const isFormValid = isValid;

  const onSubmit = (data: StudentEducationFormData) => {
    onNext({
      collegeName: data.collegeName,
      degree: data.degree,
      fieldOfStudy: data.fieldOfStudy,
      graduationYear: data.graduationYear,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="">
        <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#4a3728] to-[#8b7355]">
          Education
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">College/School Name</label>
            <input
              {...register('collegeName')}
              type="text"
              placeholder="College/School Name"
              className={`w-full text-black px-5 py-4 rounded-xl border ${errors.collegeName ? 'border-red-500' : 'border-[#4a3728]'
                } focus:outline-none focus:ring-2 ${errors.collegeName ? 'focus:ring-red-500' : 'focus:ring-[#4a3728]'
                } transition`}
            />
            {errors.collegeName && (
              <p className="text-red-500 text-sm mt-2">• {errors.collegeName.message}</p>
            )}
          </div>

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">Degree (e.g. B.Tech)</label>
            <input
              {...register('degree')}
              type="text"
              placeholder="B.Tech, B.Sc, B.Com"
              className={`w-full text-black px-5 py-4 rounded-xl border ${errors.degree ? 'border-red-500' : 'border-[#4a3728]'
                } focus:outline-none focus:ring-2 ${errors.degree ? 'focus:ring-red-500' : 'focus:ring-[#4a3728]'
                } transition`}
            />
            {errors.degree && (
              <p className="text-red-500 text-sm mt-2">• {errors.degree.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Field of Study</label>

            <input
              {...register('fieldOfStudy')}
              type="text"
              placeholder="Computer Science, Commerce"
              className={`w-full text-black px-5 py-4 rounded-xl border ${errors.fieldOfStudy ? 'border-red-500' : 'border-[#4a3728]'
                } focus:outline-none focus:ring-2 ${errors.fieldOfStudy ? 'focus:ring-red-500' : 'focus:ring-[#4a3728]'
                } transition`}
            />
            {errors.fieldOfStudy && (
              <p className="text-red-500 text-sm mt-2">• {errors.fieldOfStudy.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
            <input
              {...register('graduationYear')}
              type="text"
              placeholder="2025"
              maxLength={4}
              className={`w-full text-black px-5 py-4 rounded-xl border ${errors.graduationYear ? 'border-red-500' : 'border-[#4a3728]'
                } focus:outline-none focus:ring-2 ${errors.graduationYear ? 'focus:ring-red-500' : 'focus:ring-[#4a3728]'
                } transition`}
            />
            {errors.graduationYear && (
              <p className="text-red-500 text-sm mt-2">• {errors.graduationYear.message}</p>
            )}
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={onBack}
              className="px-8 py-4 border border-gray-300 bg-gradient-to-r from-[#4a3728] to-[#8b7355] text-white rounded-xl font-semibold hover:bg-gray-50 transition"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`px-8 py-4 rounded-xl font-semibold transition shadow-lg
                ${isFormValid
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
    </div>
  );
}