'use client';
import { useEffect, useState } from 'react';
import { useAppSelector } from "@/store/hooks";
import CompanyService from '@/lib/api/company.service';

interface IdentityData {
  story?: string;
  mission?: string;
  vision?: string;
  promises?: string[];
  impacts?: { title: string; metric: string; description: string }[];
}

interface TimelineItem {
  _id: string;
  timelineId: string;
  title: string;
  description: string;
  year: number;
  month: number;
  type: string;
  icon: string;
  isPublished: boolean;
}

interface ProductData {
  productId: string;
  name: string;
  tagline: string;
  description: string;
  demoLink?: string;
  isPublished: boolean;
  features: { title: string; description: string; icon: string; category: string }[];
  screenshots: string[];
}

export function useAbout() {
  const meta = useAppSelector((s) => s.company.meta);
  const companyId = useAppSelector((s) => s.company.apiData?.companyId || '');

  const [identity, setIdentity] = useState<IdentityData | null>(null);
  const [loadingIdentity, setLoadingIdentity] = useState(false);

  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [loadingTimeline, setLoadingTimeline] = useState(false);

  // timeline state ke baad add karo:
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loadingProduct, setLoadingProduct] = useState(false);

  // Identity fetch
  useEffect(() => {
    if (!companyId) return;
    const fetchIdentity = async () => {
      setLoadingIdentity(true);
      try {
        const res = await CompanyService.getAboutIdentity(companyId);
        setIdentity(res?.data ?? null);
      } catch {
        // silent
      } finally {
        setLoadingIdentity(false);
      }
    };
    fetchIdentity();
  }, [companyId]);

  // Timeline fetch
  useEffect(() => {
    if (!companyId) return;
    const fetchTimeline = async () => {
      setLoadingTimeline(true);
      try {
        const res = await CompanyService.getTimeline(companyId);
        const raw = res?.data?.items ?? [];
        setTimeline(Array.isArray(raw) ? raw.filter((t: TimelineItem) => t.isPublished) : []);
      } catch {
        // silent
      } finally {
        setLoadingTimeline(false);
      }
    };
    fetchTimeline();
  }, [companyId]);

  useEffect(() => {
    if (!companyId) return;
    const fetchProduct = async () => {
      setLoadingProduct(true);
      try {
        const res = await CompanyService.getProduct(companyId);
        setProduct(res?.data ?? null);
      } catch {
        // 404 = product not added yet — silent
      } finally {
        setLoadingProduct(false);
      }
    };
    fetchProduct();
  }, [companyId]);

  return { meta, identity, loadingIdentity, timeline, loadingTimeline, product, loadingProduct };
}