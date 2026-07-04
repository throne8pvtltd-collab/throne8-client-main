import { memo, useCallback } from 'react';
import { Job } from '../../store/slices/jobsslice';
// import type { Job } from '@/store/slices/jobsslice';

const STATUS_COLORS: Record<string, string> = {
  open:      'bg-green-100 text-green-700',
  closed:    'bg-red-100 text-red-600',
  'on-hold': 'bg-yellow-100 text-yellow-600',
};

interface Props {
  job: Job;
  isActive: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

const JobCard = memo(function JobCard({ job, isActive, onSelect, onDelete }: Props) {
  const handleClick  = useCallback(() => onSelect(job.id), [job.id, onSelect]);
  const handleDelete = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(job.id);
  }, [job.id, onDelete]);

  return (
    <div onClick={handleClick}
      className={`bg-[#f6ede8]/80 border rounded-2xl p-5 shadow-sm hover:shadow-md cursor-pointer transition-all duration-200 group
        ${isActive ? 'border-[#4a3728]/40 bg-[#4a3728]/5' : 'border-[#e0d8cf]'}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h3 className="text-base font-bold text-[#4a3728]">{job.title}</h3>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full capitalize ${STATUS_COLORS[job.status]}`}>
              {job.status}
            </span>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-[#4a3728]/60">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              {job.location}
            </span>
            <span>{job.type}</span>
            <span>{job.experience} Level</span>
            <span className="font-semibold text-[#4a3728]">{job.salary}</span>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="text-right flex-shrink-0">
            <p className="text-lg font-bold text-[#4a3728]">{job.applications}</p>
            <p className="text-xs text-[#4a3728]/50">applications</p>
            <p className={`text-[11px] mt-1 font-semibold ${job.expiresIn === 'Expired' ? 'text-red-500' : 'text-[#4a3728]/40'}`}>
              {job.expiresIn === 'Expired' ? 'Expired' : `Expires in ${job.expiresIn}`}
            </p>
          </div>
          <button onClick={handleDelete}
            className="p-1.5 bg-[#e0d8cf] rounded-lg hover:bg-red-500 hover:text-white text-[#4a3728] transition-all duration-200 opacity-0 group-hover:opacity-100 flex-shrink-0">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
});

export default JobCard;