'use client';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/core/store/store.hooks';
import { setStatsAnimated } from '@/features/company/store/slices/uiSlice';
import { useIntersectionObserver } from './useIntersectionObserver';

export function useOverview() {
  const dispatch = useAppDispatch();
  const stats = useAppSelector((s) => s.company.stats);
  const news = useAppSelector((s) => s.company.news);
  const testimonials = useAppSelector((s) => s.company.testimonials);
  const meta = useAppSelector((s) => s.company.meta);
  const animated = useAppSelector((s) => s.ui.statsAnimated);

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const { ref: statsRef, isVisible } = useIntersectionObserver({
    threshold: 0.3,
    freezeOnceVisible: true,
  });

  // ✅ Never dispatch during render — always inside useEffect
  useEffect(() => {
    if (isVisible && !animated) {
      dispatch(setStatsAnimated());
    }
  }, [isVisible, animated, dispatch]);

  const shouldAnimate = animated || isVisible;

  return { stats, news, testimonials, meta, shouldAnimate, statsRef, activeTestimonial, setActiveTestimonial };
}
