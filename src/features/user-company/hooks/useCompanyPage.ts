'use client'

import { useAppSelector } from './useAppStore';

export function useCompanyPage() {
  const meta    = useAppSelector((s) => s.company.meta)
  const isReady = !!meta.id
  return { meta, isReady }
}
