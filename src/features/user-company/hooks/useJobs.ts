'use client';
import { useMemo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/core/store/store.hooks';
import { setSearchQuery } from '@/hooks/studyGroup/features/groups/groupsSlice';
import { clearJobFilters, setExpandedJob, setJobFilter } from '@/features/company/store/slices/uiSlice';
import { useDebounce } from './useDebounce';
import { JobFilters } from '@/features/company/type/company.types';

export function useJobs() {
  const dispatch = useAppDispatch();
  const jobs = useAppSelector((s) => s.company.jobs.filter((j) => j.isActive));
  const filters = useAppSelector((s) => s.ui.jobFilters);
  const rawQuery = useAppSelector((s) => s.ui.searchQuery);
  const expandedId = useAppSelector((s) => s.ui.expandedJobId);

  // Debounce search so Redux isn't hammered on every keystroke
  const searchQuery = useDebounce(rawQuery, 250);

  const departments = useMemo(() => ['All', ...Array.from(new Set(jobs.map((j) => j.department)))], [jobs]);
  const locations = useMemo(() => ['All', ...Array.from(new Set(jobs.map((j) => j.location)))], [jobs]);
  const types = useMemo(() => ['All', ...Array.from(new Set(jobs.map((j) => j.type)))], [jobs]);

  const filtered = useMemo(() => jobs.filter((job) => {
    const q = searchQuery.toLowerCase();
    const matchesQuery = !q
      || job.title.toLowerCase().includes(q)
      || job.department.toLowerCase().includes(q)
      || job.tags.some((t) => t.toLowerCase().includes(q));

    return (
      matchesQuery
      && (filters.department === 'All' || job.department === filters.department)
      && (filters.location === 'All' || job.location === filters.location)
      && (filters.type === 'All' || job.type === filters.type)
    );
  }), [jobs, searchQuery, filters]);

  const hasActiveFilters = Boolean(rawQuery || filters.department !== 'All' || filters.location !== 'All' || filters.type !== 'All');

  const onFilterChange = useCallback((key: keyof JobFilters, value: string) => dispatch(setJobFilter({ key, value })), [dispatch]);
  const onSearchChange = useCallback((value: string) => dispatch(setSearchQuery(value)), [dispatch]);
  const onClearFilters = useCallback(() => dispatch(clearJobFilters()), [dispatch]);
  const onToggleJob = useCallback((id: string) => dispatch(setExpandedJob(expandedId === id ? null : id)), [dispatch, expandedId]);

  return {
    jobs, filtered, filters, rawQuery, expandedId,
    departments, locations, types, hasActiveFilters,
    onFilterChange, onSearchChange, onClearFilters, onToggleJob,
  };
}
