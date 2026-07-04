'use client';

import { BrandingSection } from './BrandingSection';
import { BasicInfoSection } from './BasicInfoSection';
import { SocialLinksSection } from './SocialLinksSection';
import { VerificationSection } from './VerificationSection';
import { fetchCompanyById } from '@/features/company/store/slices/companySlice';
import { useEffect } from 'react';
import { CompanyFormValues, VerificationStatus } from '../../types';
import { useCompanySave } from '../../hooks/useCompanySave';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useCompanyForm } from '../../hooks/useCompanyForm';

interface Props {
  initialData?: Partial<CompanyFormValues>;
  slug: string;
  companyId: string;
  verificationStatus?: VerificationStatus;
}

export function EditCompanyPage({ initialData, slug, companyId, verificationStatus = 'pending' }: Props) {
  // const { form, setField, setSocialField, errors, setErrors, isDirty } = useCompanyForm(initialData);
  const { save, isSaving, isSaved, isError, errorMessage } = useCompanySave({ slug });

  const dispatch = useAppDispatch();
  const meta = useAppSelector((s) => s.company.meta);
  const apiData = useAppSelector((s) => s.company.apiData);

  const { form, setField, setSocialField, errors, setErrors, isDirty, resetForm } = useCompanyForm(initialData);

  // API se data fetch karo aur form mein set karo
  useEffect(() => {
    if (companyId) {
      dispatch(fetchCompanyById(companyId));
    }
  }, [companyId, dispatch]);

  // Jab meta aaye, form populate karo
  useEffect(() => {
    if (meta && apiData) {
      resetForm({
        name: meta.name || '',
        slug: apiData.companySlug || slug,
        tagline: meta.tagline || '',
        description: apiData.descriptions?.short || '',
        industry: meta.industry || '',
        size: meta.size || '',
        location: meta.headquarters?.full || '',
        founded: meta.founded || '',
        website: meta.website || '',
        social: {
          linkedin: apiData.socialMedia?.linkedin || '',
          twitter: apiData.socialMedia?.twitter || '',
          github: apiData.socialMedia?.github || '',
          instagram: apiData.socialMedia?.instagram || '',
        },
      });
    }
  }, [meta, apiData]);

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#4a3728]">Edit Company Page</h1>
          <p className="text-sm text-[#4a3728]/60 mt-0.5">
            Update your public company profile
            {isDirty && <span className="ml-2 text-amber-600 font-medium">· Unsaved changes</span>}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {isError && <p className="text-xs text-red-500">{errorMessage}</p>}
          <button type="button" onClick={() => save(form, setErrors)} disabled={isSaving}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md disabled:opacity-60
              ${isSaved ? 'bg-green-500 text-white' : 'bg-[#4a3728] text-[#f6ede8] hover:bg-[#6b4e3d]'}`}>
            {isSaving ? 'Saving…' : isSaved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>
      <BrandingSection
        companyInitials={form.name?.slice(0, 2).toUpperCase() || 'T8'}
        logoUrl={meta?.logoUrl}        // ← add
        bannerUrl={meta?.bannerUrl}    // ← add
      />
      <BasicInfoSection form={form} errors={errors} setField={setField} />
      <SocialLinksSection social={form.social} setSocialField={setSocialField} />
      <VerificationSection status={verificationStatus} />
    </div>
  );
}