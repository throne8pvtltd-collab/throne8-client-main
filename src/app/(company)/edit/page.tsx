'use client';

import { useEffect } from 'react';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { useProfile } from '@/features/profile/hooks/useProfile';
import { EditCompanyPage } from '@/features/company/components/events/EditCompanyPage';

export default function EditPage() {
  // ── Company ID from profile (same as Sidebar) ──
  const { user } = useAuth();
  const { userProfileData, loadProfile } = useProfile();

  useEffect(() => {
    if (user) {
      // console.log('👤 User loaded:', user);
      loadProfile();
    }
  }, [user]);

  const companyId = userProfileData?.companyId ?? '';

  // console.log('🏢 userProfileData:', userProfileData);
  console.log('🏢 companyId from profile:', companyId);

  return (
    <EditCompanyPage
      companyId={companyId}
      slug="throne8"
      verificationStatus="pending"
    />
  );
}