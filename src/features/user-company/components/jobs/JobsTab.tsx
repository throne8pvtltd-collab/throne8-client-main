'use client';
import { Briefcase } from 'lucide-react';
import { useJobs }      from '../../hooks/useJobs';
import { JobSearchBar } from './JobSearchBar';
import { JobFilters }   from './JobFilters';
import { JobCard }      from './JobCard';
import { Card, SectionHeading, EmptyState, Button } from '../ui';  

export function JobsTab() {
  const {
    filtered, filters, rawQuery, expandedId, departments, locations, types,
    hasActiveFilters, onFilterChange, onSearchChange, onClearFilters, onToggleJob,
  } = useJobs();

  return (
    <div className="space-y-6 animate-slide-up">

      {/* Search + filters */}
      <Card padding="lg">
        <SectionHeading subtitle={`${filtered.length} active role${filtered.length !== 1 ? 's' : ''}`} className="mb-5">
          Open Positions
        </SectionHeading>
        <div className="space-y-4">
          <JobSearchBar value={rawQuery} onChange={onSearchChange} />
          <JobFilters
            filters={filters}
            departments={departments} locations={locations} types={types}
            hasActiveFilters={hasActiveFilters}
            onFilterChange={onFilterChange} onClearFilters={onClearFilters}
          />
        </div>
      </Card>

      {/* Results */}
      {filtered.length === 0 ? (
        <Card padding="none">
          <EmptyState
            icon={<Briefcase className="w-10 h-10" />}
            title="No roles match your filters"
            description="Try broadening your search or clearing the filters."
            action={hasActiveFilters ? <Button variant="outline" size="sm" onClick={onClearFilters}>Clear filters</Button> : undefined}
          />
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((job) => (
            <JobCard
              key={job.id} job={job}
              expanded={expandedId === job.id}
              onToggle={() => onToggleJob(job.id)}
            />
          ))}
        </div>
      )}

      {/* CTA */}
      <Card padding="lg" className="text-center">
        <p className="text-sm text-brand-brown/70 mb-3">
          Don&apos;t see a perfect fit? We hire exceptional people regardless of open roles.
        </p>
        <Button
          variant="outline" size="md"
          onClick={() => window.open('mailto:careers@throne8.com', '_blank')}
        >
          Send us your resume
        </Button>
      </Card>
    </div>
  );
}
