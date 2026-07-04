'use client';

import { useState, memo } from 'react';
import { ATSStage, Job } from '../../store/slices/jobsslice';
// import type { ATSStage, Job } from '@/store/slices/jobsslice';

interface Props {
  pipeline: ATSStage[];
  jobs: Job[];
  onMoveCandidate: (name: string, from: string, to: string) => void;
}

const ATSPipeline = memo(function ATSPipeline({ pipeline, jobs, onMoveCandidate }: Props) {
  const [selectedJob,   setSelectedJob]   = useState(jobs[0]?.title ?? '');
  const [dragging,      setDragging]      = useState<{ name: string; from: string } | null>(null);

  const handleDragStart = (name: string, from: string) => setDragging({ name, from });
  const handleDrop      = (to: string) => {
    if (dragging && dragging.from !== to) onMoveCandidate(dragging.name, dragging.from, to);
    setDragging(null);
  };

  return (
    <div className="bg-[#f6ede8]/80 border border-[#e0d8cf] rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-base font-bold text-[#4a3728]">Pipeline for:</h3>
        <select value={selectedJob} onChange={e => setSelectedJob(e.target.value)}
          className="text-sm font-semibold text-[#4a3728] bg-[#e0d8cf]/60 border border-[#e0d8cf] rounded-lg px-2 py-1 focus:outline-none">
          {jobs.map(j => <option key={j.id}>{j.title}</option>)}
        </select>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {pipeline.map(stage => (
          <div key={stage.stage} className="flex-shrink-0 w-40"
            onDragOver={e => e.preventDefault()}
            onDrop={() => handleDrop(stage.stage)}>
            <div className={`w-full h-1.5 rounded-full mb-3 ${stage.color}`} />
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-[#4a3728]">{stage.stage}</p>
              <span className="text-xs font-bold bg-[#e0d8cf] text-[#4a3728] px-1.5 py-0.5 rounded-full">{stage.count}</span>
            </div>
            <div className="space-y-2">
              {stage.candidates.map(name => (
                <div key={name} draggable
                  onDragStart={() => handleDragStart(name, stage.stage)}
                  className="p-2.5 bg-white/60 border border-[#e0d8cf] rounded-xl cursor-grab hover:border-[#4a3728]/30 hover:shadow-sm transition-all active:cursor-grabbing">
                  <p className="text-xs font-semibold text-[#4a3728] truncate">{name}</p>
                  <p className="text-[10px] text-[#4a3728]/50 mt-0.5">Applied 2d ago</p>
                </div>
              ))}
              {stage.candidates.length === 0 && (
                <div className="p-3 border-2 border-dashed border-[#e0d8cf] rounded-xl text-center min-h-[52px] flex items-center justify-center">
                  <p className="text-[11px] text-[#4a3728]/30">Drop here</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default ATSPipeline;