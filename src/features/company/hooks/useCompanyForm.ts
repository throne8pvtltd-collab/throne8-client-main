import { useState, useCallback } from 'react';
import { CompanyFormValues } from '../types';

const DEFAULT: CompanyFormValues = {
  name: 'Throne8', slug: 'throne8',
  tagline: 'Empowering Professional Networking for Millions with AI, Security, and Scalable Innovation',
  description: 'Thronet Technology Private Limited is a technology company focused on building AI-driven professional networking platforms.',
  industry: 'Technology', size: '11-50',
  location: 'Bhopal, Madhya Pradesh, India', founded: '2022',
  website: 'https://throne8.com',
  social: { linkedin: '', twitter: '', github: '', instagram: '' },
};

export function useCompanyForm(initial: Partial<CompanyFormValues> = {}) {
  const [form, setForm] = useState<CompanyFormValues>({
    ...DEFAULT, ...initial,
    social: { ...DEFAULT.social, ...(initial.social ?? {}) },
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CompanyFormValues, string>>>({});
  const [isDirty, setIsDirty] = useState(false);

  const setField = useCallback(<K extends keyof CompanyFormValues>(key: K, value: CompanyFormValues[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: undefined }));
    setIsDirty(true);
  }, []);

  const resetForm = useCallback((newData: Partial<CompanyFormValues>) => {
    setForm(prev => ({
      ...prev,
      ...newData,
      social: { ...prev.social, ...(newData.social ?? {}) },
    }));
    setIsDirty(false);
  }, []);

  const setSocialField = useCallback((key: keyof CompanyFormValues['social'], value: string) => {
    setForm(prev => ({ ...prev, social: { ...prev.social, [key]: value } }));
    setIsDirty(true);
  }, []);

  return { form, setField, setSocialField, errors, setErrors, isDirty, resetForm };
}