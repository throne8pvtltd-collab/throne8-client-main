// useProducts.ts 
'use client';
import { useAppSelector } from '@/core/store/store.hooks';
import { useEffect, useState } from 'react';
import CompanyService from '@/lib/api/company.service';

interface ProductFeature {
  title: string;
  description: string;
  icon: string;
  category: string;
}

interface ApiProduct {
  productId: string;
  name: string;
  tagline: string;
  description: string;
  demoLink?: string;
  isPublished: boolean;
  features: ProductFeature[];
  screenshots: string[];
}

export function useProducts() {
  const companyId = useAppSelector((s) => s.company.apiData?.companyId || '');

  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!companyId) return;
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await CompanyService.getProduct(companyId);
        setProduct(res?.data ?? null);
      } catch {
        // 404 = not added yet
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [companyId]);

  return { product, loading };
}