'use client';

import { memo, useState, useCallback } from 'react';
import { Job } from '../store/slices/jobsslice';
// import type { Job } from '@/store/slices/jobsslice';

interface Props {
  onClose: () => void;
  onAdd: (job: Job) => void;
}

const TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship'];

const CreateJobModal = memo(function CreateJobModal({ onClose, onAdd }: Props) {
  const [title,    setTitle]    = useState('');
  const [type,     setType]     = useState('Full-time');
  const [location, setLocation] = useState('');
  const [salary,   setSalary]   = useState('');

  const handleAdd = useCallback(() => {
    if (!title.trim()) return;
    onAdd({
      id:           Date.now().toString(),
      title:        title.trim(),
      type,
      status:       'open',
      location:     location.trim() || 'Remote',
      experience:   'Mid',
      salary:       salary.trim() || 'Negotiable',
      applications: 0,
      posted:       new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      expiresIn:    '30 days',
    });
    onClose();
  }, [title, type, location, salary, onAdd, onClose]);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#f6ede8] rounded-2xl shadow-2xl w-full max-w-lg border border-[#e0d8cf]">
        <div className="flex items-center justify-between p-5 border-b border-[#e0d8cf]">
          <h3 className="text-lg font-bold text-[#4a3728]">Post a Job</h3>
          <button onClick={onClose} className="p-1.5 hover:bg-[#e0d8cf] rounded-lg transition-colors text-[#4a3728]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-5 space-y-4">
          {[
            { label: 'Job Title',    value: title,    onChange: setTitle,    placeholder: 'e.g. Senior React Developer' },
            { label: 'Location',     value: location, onChange: setLocation, placeholder: 'e.g. Bhopal / Remote'        },
            { label: 'Salary Range', value: salary,   onChange: setSalary,   placeholder: 'e.g. ₹12-18 LPA'            },
          ].map(f => (
            <div key={f.label}>
              <label className="text-xs font-semibold text-[#4a3728]/70 mb-1 block">{f.label}</label>
              <input value={f.value} onChange={e => f.onChange(e.target.value)} placeholder={f.placeholder}
                className="w-full bg-white/60 border border-[#e0d8cf] rounded-xl px-3 py-2.5 text-sm text-[#4a3728] placeholder-[#4a3728]/40 focus:outline-none focus:ring-2 focus:ring-[#4a3728]/20" />
            </div>
          ))}
          <div>
            <label className="text-xs font-semibold text-[#4a3728]/70 mb-1 block">Employment Type</label>
            <select value={type} onChange={e => setType(e.target.value)}
              className="w-full bg-white/60 border border-[#e0d8cf] rounded-xl px-3 py-2.5 text-sm text-[#4a3728] focus:outline-none focus:ring-2 focus:ring-[#4a3728]/20">
              {TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div className="flex gap-3 p-5 pt-0">
          <button onClick={onClose} className="flex-1 py-2.5 border border-[#e0d8cf] rounded-xl text-sm font-semibold text-[#4a3728] hover:bg-[#e0d8cf] transition-colors">Cancel</button>
          <button onClick={handleAdd} disabled={!title.trim()}
            className="flex-1 py-2.5 bg-[#4a3728] text-[#f6ede8] rounded-xl text-sm font-semibold hover:bg-[#6b4e3d] transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
            Post Job
          </button>
        </div>
      </div>
    </div>
  );
});

export default CreateJobModal;