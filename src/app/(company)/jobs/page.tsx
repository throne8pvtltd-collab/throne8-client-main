'use client';

import dynamic from 'next/dynamic';
import { useJobs } from '../../../features/company/hooks/useJobs';
import JobCard from '../../../features/company/components/jobs/JobCard';
import JobStats from '../../../features/company/components/jobs/JobStats';

const ATSPipeline = dynamic(() => import('../../../features/company/components/jobs/ATSPipeline'), {
  loading: () => <div className="bg-[#e0d8cf]/40 rounded-2xl h-64 animate-pulse" />,
});
const CreateJobModal = dynamic(() => import('../../../features/company/modal/CreateJobModal'), {
  loading: () => null,
});

export default function JobsPage() {
  const {
    jobs, pipeline, openJobs, activeJobId, showCreate, view, stats,
    handleSelectJob, handleViewJobs, handleViewATS,
    openCreate, closeCreate,
    handleAddJob, handleDelete, handleMove,
  } = useJobs();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#4a3728]">Jobs & ATS</h1>
          <p className="text-sm text-[#4a3728]/60 mt-0.5">Manage job postings and applications</p>
        </div>
        <div className="flex gap-2">
          <div className="flex gap-1 bg-[#e0d8cf]/50 rounded-xl p-1">
            <button onClick={handleViewJobs}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${view === 'jobs' ? 'bg-[#4a3728] text-[#f6ede8]' : 'text-[#4a3728]/60 hover:text-[#4a3728]'}`}>
              Job Listings
            </button>
            <button onClick={handleViewATS}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${view === 'ats' ? 'bg-[#4a3728] text-[#f6ede8]' : 'text-[#4a3728]/60 hover:text-[#4a3728]'}`}>
              ATS Pipeline
            </button>
          </div>
          <button onClick={openCreate}
            className="flex items-center gap-2 bg-[#4a3728] text-[#f6ede8] px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#6b4e3d] transition-colors shadow-md">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Post Job
          </button>
        </div>
      </div>

      <JobStats stats={stats} />

      {view === 'jobs' ? (
        <div className="space-y-3">
          {jobs.map((job: any) => (
            <JobCard key={job.id} job={job} isActive={activeJobId === job.id}
              onSelect={handleSelectJob} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <ATSPipeline pipeline={pipeline} jobs={openJobs} onMoveCandidate={handleMove} />
      )}

      {showCreate && <CreateJobModal onClose={closeCreate} onAdd={handleAddJob} />}
    </div>
  );
}