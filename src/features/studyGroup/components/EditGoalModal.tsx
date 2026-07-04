'use client';

import React, { useEffect, useState } from 'react';
import { GoalWithUI } from '@/hooks/studyGroup/features/goals/goalsSlice';

interface EditGoalModalProps {
  goal: GoalWithUI;
  onClose: () => void;
  onSave: (data: any) => void;
}

export default function EditGoalModal({ goal, onClose, onSave }: EditGoalModalProps) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    targetHours: '',
    startDate: '',
    endDate: '',
    category: '',
    tags: '',
    color: '#3b82f6',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#ec4899', '#f97316', '#ef4444', '#14b8a6'];

  useEffect(() => {
    if (goal) {
      setForm({
        title: goal.title || '',
        description: goal.description || '',
        targetHours: String(goal.targetHours || ''),
        startDate: goal.startDate?.split('T')[0] || '',
        endDate: goal.endDate?.split('T')[0] || '',
        category: goal.category || '',
        tags: goal.tags?.join(', ') || '',
        color: goal.color || '#3b82f6',
      });
    }
  }, [goal]);

  const set = (key: string, val: string) => setForm(p => ({ ...p, [key]: val }));

  const handleSave = async () => {
    if (!form.title.trim()) { setError('Title is required'); return; }
    if (!form.targetHours || Number(form.targetHours) < 1) { setError('Target hours must be at least 1'); return; }
    if (new Date(form.endDate) <= new Date(form.startDate)) { setError('End date must be after start date'); return; }

    setLoading(true);
    const tagsArray = form.tags.trim()
      ? form.tags.split(',').map(t => t.trim()).filter(Boolean)
      : [];

    await onSave({
      title: form.title.trim(),
      description: form.description.trim() || undefined,
      targetHours: Number(form.targetHours),
      startDate: form.startDate,
      endDate: form.endDate,
      category: form.category.trim() || undefined,
      tags: tagsArray,
    });
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-[#f6ede8] rounded-2xl shadow-2xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#6b5847] hover:text-[#4a3728] text-2xl font-bold">×</button>

        <h2 className="text-xl font-black text-[#4a3728] mb-5">Edit goal</h2>

        {error && (
          <div className="mb-4 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        {/* Progress display — readonly */}
        <div className="mb-4 p-3 bg-[#e0d8cf]/40 rounded-lg border border-[#e0d8cf]/50">
          <div className="flex justify-between text-xs text-[#6b5847] mb-1">
            <span>Current progress</span>
            <span className="font-bold text-[#4a3728]">{goal.progressPercentage ?? 0}%</span>
          </div>
          <div className="w-full h-2 bg-[#e0d8cf]/60 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${goal.progressPercentage ?? 0}%`, backgroundColor: goal.color }}
            />
          </div>
          <div className="text-xs text-[#6b5847] mt-1">{goal.currentHours}h studied / {goal.targetHours}h target</div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#4a3728] mb-1.5 uppercase tracking-wide">Title *</label>
            <input type="text" value={form.title} onChange={e => { set('title', e.target.value); setError(''); }}
              className="w-full px-3 py-2.5 bg-white border-2 border-[#d4c4b0] rounded-lg text-sm text-[#4a3728] focus:outline-none focus:border-[#4a3728]" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#4a3728] mb-1.5 uppercase tracking-wide">Description</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={2}
              className="w-full px-3 py-2.5 bg-white border-2 border-[#d4c4b0] rounded-lg text-sm text-[#4a3728] focus:outline-none focus:border-[#4a3728] resize-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#4a3728] mb-1.5 uppercase tracking-wide">Target hours *</label>
            <input type="number" value={form.targetHours} onChange={e => { set('targetHours', e.target.value); setError(''); }}
              min={1} max={10000}
              className="w-full px-3 py-2.5 bg-white border-2 border-[#d4c4b0] rounded-lg text-sm text-[#4a3728] focus:outline-none focus:border-[#4a3728]" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#4a3728] mb-1.5 uppercase tracking-wide">Start date *</label>
              <input
                type="date"
                value={form.startDate}
                min={new Date().toISOString().split('T')[0]}  // ADD
                onChange={e => { set('startDate', e.target.value); setError(''); }}
                className="w-full px-3 py-2.5 bg-white border-2 border-[#d4c4b0] rounded-lg text-sm text-[#4a3728] focus:outline-none focus:border-[#4a3728]"
              />

            </div>
            <div>
              <label className="block text-xs font-bold text-[#4a3728] mb-1.5 uppercase tracking-wide">End date *</label>
              {/* <input type="date" value={form.endDate} onChange={e => { set('endDate', e.target.value); setError(''); }} */}
              <input
                type="date"
                value={form.endDate}
                min={form.startDate || new Date().toISOString().split('T')[0]}  // ADD — end date start se pehle nahi
                onChange={e => { set('endDate', e.target.value); setError(''); }}
                className="w-full px-3 py-2.5 bg-white border-2 border-[#d4c4b0] rounded-lg text-sm text-[#4a3728] focus:outline-none focus:border-[#4a3728]"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#4a3728] mb-1.5 uppercase tracking-wide">Category</label>
            <input type="text" value={form.category} onChange={e => set('category', e.target.value)}
              className="w-full px-3 py-2.5 bg-white border-2 border-[#d4c4b0] rounded-lg text-sm text-[#4a3728] focus:outline-none focus:border-[#4a3728]" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#4a3728] mb-1.5 uppercase tracking-wide">Tags (comma separated)</label>
            <input type="text" value={form.tags} onChange={e => set('tags', e.target.value)}
              placeholder="dsa, placement, coding"
              className="w-full px-3 py-2.5 bg-white border-2 border-[#d4c4b0] rounded-lg text-sm text-[#4a3728] focus:outline-none focus:border-[#4a3728]" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#4a3728] mb-2 uppercase tracking-wide">Color</label>
            <div className="flex gap-2">
              {colors.map(c => (
                <button key={c} onClick={() => set('color', c)}
                  className={`w-8 h-8 rounded-full transition-all ${form.color === c ? 'ring-2 ring-offset-2 ring-[#4a3728] scale-110' : 'hover:scale-105'}`}
                  style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-2.5 border-2 border-[#d4c4b0] text-[#4a3728] rounded-lg text-sm font-semibold hover:bg-[#e0d8cf] transition-all">
            Cancel
          </button>
          <button onClick={handleSave} disabled={loading}
            className="flex-1 py-2.5 bg-gradient-to-r from-[#4a3728] to-[#6b4e3d] text-[#f6ede8] rounded-lg text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50">
            {loading ? 'Saving...' : 'Save changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

