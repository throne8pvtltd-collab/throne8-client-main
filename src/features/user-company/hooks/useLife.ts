'use client';
import { useAppSelector } from '@/core/store/store.hooks';
export function useLife() {
  const team    = useAppSelector((s) => s.company.team);
  const values  = useAppSelector((s) => s.company.cultureValues);
  const perks   = useAppSelector((s) => s.company.perks);
  const gallery = useAppSelector((s) => s.company.gallery);
  return { team, values, perks, gallery };
}
