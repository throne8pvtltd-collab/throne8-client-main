'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalDetailsSchema, PersonalDetailsFormData } from '../schema';

interface Props {
  onNext: (data: any) => void;
  onBack: () => void;
}

export default function PersonalDetails({ onNext, onBack }: Props) {
  // State to track each field
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PersonalDetailsFormData>({
    resolver: zodResolver(personalDetailsSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const isFormValid = isValid;

  // Next button enable only when all fields are filled

  const onSubmit = (data: PersonalDetailsFormData) => {
    onNext({
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      phoneNumber: data.phone,
      location: data.location,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-4 sm:space-y-5">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#4a3728] to-[#8b7355] leading-tight">
          Personal Details
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6 md:space-y-8">
          <div className="grid grid-rows-1 md:grid-rows-2 gap-4 sm:gap-5 md:gap-6">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">First Name</label>
              <input
                {...register('firstName')}
                type="text"
                placeholder="First Name"
                className={`w-full px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl text-[#4a3728] border text-sm ${errors.firstName ? 'border-red-500' : 'border-[#4a3728]'
                  } focus:outline-none focus:ring-2 ${errors.firstName ? 'focus:ring-red-500' : 'focus:ring-[#4a3728]'
                  } transition`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs sm:text-sm mt-1.5">• {errors.firstName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">Last Name</label>
              <input
                {...register('lastName')}
                type="text"
                placeholder="Last Name"
                className={`w-full px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl text-[#4a3728] border text-sm ${errors.lastName ? 'border-red-500' : 'border-[#4a3728]'
                  } focus:outline-none focus:ring-2 ${errors.lastName ? 'focus:ring-red-500' : 'focus:ring-[#4a3728]'
                  } transition`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs sm:text-sm mt-1.5">• {errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">Phone</label>
              <input
                {...register('phone')}
                type="tel"
                placeholder="+919876543210"
                className={`w-full px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-4 text-black rounded-lg sm:rounded-xl border text-sm ${errors.phone ? 'border-red-500' : 'border-[#4a3728]'
                  } focus:outline-none focus:ring-2 ${errors.phone ? 'focus:ring-red-500' : 'focus:ring-[#4a3728]'
                  } transition`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs sm:text-sm mt-1.5">• {errors.phone.message}</p>
              )}
              {!errors.phone && (
                <p className="text-gray-500 text-xs mt-1.5">Format: +919876543210 (E.164)</p>
              )}
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">Location</label>
              <input
                {...register('location')}
                type="text"
                placeholder="Mumbai"
                className={`w-full px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-4 text-black rounded-lg sm:rounded-xl border text-sm ${errors.location ? 'border-red-500' : 'border-[#4a3728]'
                  } focus:outline-none focus:ring-2 ${errors.location ? 'focus:ring-red-500' : 'focus:ring-[#4a3728]'
                  } transition`}
              />
              {errors.location && (
                <p className="text-red-500 text-xs sm:text-sm mt-1.5">• {errors.location.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between pt-2 sm:pt-4">
            <button
              type="button"
              onClick={onBack}
              className="px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-[#4a3728] to-[#8b7355] text-white font-semibold border border-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-50 transition text-sm sm:text-base order-2 sm:order-1"
            >
              Back
            </button>
            <button 
              type="submit"
              disabled={!isFormValid}
              className={`px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl font-semibold transition shadow-lg text-sm sm:text-base order-1 sm:order-2
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