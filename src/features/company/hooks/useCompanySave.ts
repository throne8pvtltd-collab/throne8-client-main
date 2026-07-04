import { useState, useCallback } from 'react';
import { validateCompanyForm } from '../schemas/companySchema';
import { CompanyFormValues } from '../types';

type Status = 'idle' | 'saving' | 'saved' | 'error';

export function useCompanySave({ slug }: { slug: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const save = useCallback(async (
    data: CompanyFormValues,
    setErrors: (e: Partial<Record<keyof CompanyFormValues, string>>) => void
  ) => {
    const fieldErrors = validateCompanyForm(data);
    if (Object.keys(fieldErrors).length > 0) { setErrors(fieldErrors); return; }

    setStatus('saving');
    try {
      const res = await fetch(`/api/company/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus('saved');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong');
    }
  }, [slug]);

  return { save, isSaving: status === 'saving', isSaved: status === 'saved', isError: status === 'error', errorMessage };
}