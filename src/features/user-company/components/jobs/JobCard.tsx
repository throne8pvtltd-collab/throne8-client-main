'use client';
import { MapPin, Clock, ChevronDown, ChevronUp, Briefcase, IndianRupee, ExternalLink } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import { featureFlags } from '@/config/site.config';
import { JobPosting } from '@/features/company/type/company.types';
import Button from '@/shared/uiComponents/Button';

const TYPE_VARIANT: Record<string, string> = {
  'Full-time': 'bg-emerald-100 text-emerald-800',
  'Part-time': 'bg-yellow-100  text-yellow-800',
  'Contract': 'bg-blue-100    text-blue-800',
  'Remote': 'bg-purple-100  text-purple-800',
};

interface Props {
  job: JobPosting;
  expanded: boolean;
  onToggle: () => void;
}

export function JobCard({ job, expanded, onToggle }: Props) {
  return (
    <article
      className={cn(
        'bg-white/60 backdrop-blur-sm rounded-2xl border shadow-sm transition-all duration-300 overflow-hidden',
        expanded ? 'border-brand-tan shadow-md' : 'border-brand-beige/60 hover:shadow-lg hover:border-brand-beige hover:-translate-y-0.5',
      )}
    >
      {/* Header — always visible */}
      <div
        role="button"
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={(e) => e.key === 'Enter' && onToggle()}
        aria-expanded={expanded}
        aria-controls={`job-detail-${job.id}`}
        className="p-5 cursor-pointer select-none"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <h3 className="text-base font-bold text-brand-brown">{job.title}</h3>
              <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full', TYPE_VARIANT[job.type] ?? 'bg-brand-beige text-brand-brown')}>
                {job.type}
              </span>
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-brand-brown/60">
              <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" aria-hidden="true" />{job.department}</span>
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" aria-hidden="true" />{job.location}</span>
              {job.salaryRange && (
                <span className="flex items-center gap-1"><IndianRupee className="w-3 h-3" aria-hidden="true" />{job.salaryRange}</span>
              )}
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" aria-hidden="true" />{job.experience}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {expanded
              ? <ChevronUp className="w-4 h-4 text-brand-light" aria-hidden="true" />
              : <ChevronDown className="w-4 h-4 text-brand-light" aria-hidden="true" />
            }
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {job.tags.map((tag) => (
            <span key={tag} className="text-xs bg-brand-beige/60 text-brand-brown px-2 py-0.5 rounded-md font-medium">{tag}</span>
          ))}
        </div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div id={`job-detail-${job.id}`} className="px-5 pb-5 border-t border-brand-beige animate-slide-up">
          <div className="pt-4 space-y-5">
            <p className="text-sm text-brand-brown/75 leading-relaxed">{job.description}</p>

            <div className="grid sm:grid-cols-2 gap-5">
              {job.responsibilities.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-brand-brown/50 uppercase tracking-wide mb-2">Responsibilities</p>
                  <ul className="space-y-1.5">
                    {job.responsibilities.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-brand-brown/80">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-light flex-shrink-0" aria-hidden="true" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {job.requirements.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-brand-brown/50 uppercase tracking-wide mb-2">Requirements</p>
                  <ul className="space-y-1.5">
                    {job.requirements.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-brand-brown/80">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-light flex-shrink-0" aria-hidden="true" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 pt-2">
              {featureFlags.enableApplyFlow ? (
                <Button variant="primary" size="md" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                  Apply now
                </Button>
              ) : (
                <Button
                  variant="primary" size="md"
                  onClick={() => window.open(`mailto:careers@throne8.com?subject=Application: ${job.title}`, '_blank')}
                  rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
                >
                  Apply now
                </Button>
              )}
              <Button variant="ghost" size="md">Save role</Button>
              <span className="text-xs text-brand-brown/40 ml-auto">Posted {job.postedAt.split('T')[0]}</span>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
