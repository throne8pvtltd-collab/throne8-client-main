import { useState, useMemo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/core/store/store.hooks';
import { addJob, deleteJob, moveCandidate } from '@/features/company/store/slices/jobsslice';
import type { Job } from '@/features/company/store/slices/jobsslice';

export function useJobs() {
  const dispatch = useAppDispatch();
  const jobs = useAppSelector(s => s.jobs?.items ?? []);
  const pipeline = useAppSelector(s => s.jobs?.pipeline ?? []);

  const [activeJobId, setActiveJobId] = useState<string>(jobs[0]?.id ?? '');
  const [showCreate, setShowCreate] = useState(false);
  const [view, setView] = useState<'jobs' | 'ats'>('jobs');

  // Derived stats — recalculate only when jobs or pipeline change
  const stats = useMemo(() => ({
    open: jobs.filter(j => j.status === 'open').length,
    totalApps: jobs.reduce((a, j) => a + j.applications, 0),
    inInterview: pipeline.find(s => s.stage === 'Interview')?.count ?? 0,
    hired: pipeline.find(s => s.stage === 'Accepted')?.count ?? 0,
  }), [jobs, pipeline]);

  // Open jobs filtered for ATS — recalculates only when jobs change
  const openJobs = useMemo(() => jobs.filter(j => j.status === 'open'), [jobs]);

  // UI handlers
  const handleSelectJob = useCallback((id: string) => setActiveJobId(id), []);
  const handleViewJobs = useCallback(() => setView('jobs'), []);
  const handleViewATS = useCallback(() => setView('ats'), []);
  const openCreate = useCallback(() => setShowCreate(true), []);
  const closeCreate = useCallback(() => setShowCreate(false), []);

  // Redux dispatch handlers
  const handleAddJob = useCallback((job: Job) => dispatch(addJob(job)), [dispatch]);
  const handleDelete = useCallback((id: string) => dispatch(deleteJob(id)), [dispatch]);
  const handleMove = useCallback(
    (name: string, from: string, to: string) => dispatch(moveCandidate({ name, from, to })),
    [dispatch]
  );

  return {
    // State
    jobs,
    pipeline,
    openJobs,
    activeJobId,
    showCreate,
    view,
    stats,

    // UI handlers
    handleSelectJob,
    handleViewJobs,
    handleViewATS,
    openCreate,
    closeCreate,

    // Redux dispatch handlers
    handleAddJob,
    handleDelete,
    handleMove,
  };
}