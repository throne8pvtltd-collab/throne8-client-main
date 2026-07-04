import axios from 'axios';
import api from "./api.intance";
import { MentorResponse } from '@/features/mentorship/types/mentorship.types';
import config from '@/config/env.config';

class MentorService {

  /**
   * 🎓 CREATE MENTOR PROFILE
   * multipart/form-data — profilePic file + JSON fields
   */
  static async createMentor(payload: {
    title: string;
    bio: string;
    domains: string[];
    skills: string[];
    experienceTotal: number;
    currentRole: string;
    linkedinUrl: string;
    githubUrl?: string;
    profilePic: File;
  }): Promise<MentorResponse> {
    try {
      console.log('🎓 [CREATE_MENTOR] Creating mentor profile...');

      const formData = new FormData();

      // Simple fields
      formData.append('title', payload.title);
      formData.append('bio', payload.bio);

      // Arrays — JSON string as form-data
      formData.append('domains', JSON.stringify(payload.domains));
      formData.append('skills', JSON.stringify(payload.skills));

      // Nested object — JSON string
      formData.append(
        'experience',
        JSON.stringify({
          total: payload.experienceTotal,
          currentRole: payload.currentRole,
        })
      );

      // Social proof — JSON string
      formData.append(
        'socialProof',
        JSON.stringify({
          linkedinUrl: payload.linkedinUrl,
          ...(payload.githubUrl && { githubUrl: payload.githubUrl }),
        })
      );

      // File — must be last
      formData.append('profilePic', payload.profilePic);

      const { data } = await api.post<MentorResponse>(
        `${config.NEXT_PUBLIC_MENTOR_CREATE_ENDPOINT || process.env.NEXT_PUBLIC_MENTOR_CREATE_ENDPOINT}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('✅ [CREATE_MENTOR] Mentor created:', data.data?.mentorId);
      return data;

    } catch (error: any) {
      console.error('❌ [CREATE_MENTOR] Failed:', error);

      if (axios.isAxiosError(error)) {
        const apiError = error.response?.data;

        if (error.code === 'ERR_NETWORK') {
          throw new Error('Unable to connect to server. Please check your internet connection.');
        }

        if (error.response?.status === 400) {
          // Validation errors array from backend
          const errors = apiError?.errors?.map((e: any) => e.message).join(', ');
          throw new Error(errors || apiError?.message || 'Validation failed');
        }

        if (error.response?.status === 401) {
          throw new Error('Session expired. Please login again.');
        }

        if (error.response?.status === 409) {
          throw new Error('Mentor profile already exists for this account.');
        }

        if (apiError?.message) {
          throw new Error(apiError.message);
        }
      }

      throw new Error('Failed to create mentor profile. Please try again.');
    }
  }
  
  static async getMentorByUserId(userId: string): Promise<MentorResponse> {
    try {
      console.log(`👤 [GET_MENTOR_BY_USER_ID] Fetching mentor profile for userId: ${userId}`);
      const { data } = await api.get<MentorResponse>(`${config.NEXT_PUBLIC_MENTOR_BY_USER_ENDPOINT || process.env.NEXT_PUBLIC_MENTOR_BY_USER_ENDPOINT}/${userId}`);
      console.log('✅ [GET_MENTOR_BY_USER_ID] Profile fetched:', data);
      return data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) throw new Error('Mentor profile not found.');
      }
      throw new Error('Failed to fetch mentor profile.');
    }
  }

  /**
   * 👤 GET MY MENTOR PROFILE
   */
  static async getMyMentorProfile(mentorId: string): Promise<MentorResponse> {
    try {
      console.log('👤 [GET_MY_MENTOR] Fetching mentor profile...');

      const { data } = await api.get<MentorResponse>(`${config.NEXT_PUBLIC_MENTOR_BY_ID_ENDPOINT || process.env.NEXT_PUBLIC_MENTOR_BY_ID_ENDPOINT}/${mentorId}`);

      console.log('✅ [GET_MY_MENTOR] Profile fetched:', data);
      return data;

    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) throw new Error('Mentor profile not found.');
        if (error.response?.status === 401) throw new Error('Session expired. Please login again.');
      }
      throw new Error('Failed to fetch mentor profile. Please try again.');
    }
  }

  /**
   * 📋 GET ALL MENTORS
   */
  static async getAllMentors(params?: {
    page?: number;
    limit?: number;
    domains?: string[];
    skills?: string[];
  }): Promise<any> {
    try {
      console.log('📋 [GET_ALL_MENTORS] Fetching mentors...', params);

      const { data } = await api.get(`${config.NEXT_PUBLIC_ALL_MENTORS_ENDPOINT || process.env.NEXT_PUBLIC_ALL_MENTORS_ENDPOINT}`, { params });

      console.log('✅ [GET_ALL_MENTORS] Fetched:', data);
      return data;

    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const apiError = error.response?.data;
        if (apiError?.message) throw new Error(apiError.message);
      }
      throw new Error('Failed to fetch mentors. Please try again.');
    }
  }
}

export default MentorService;