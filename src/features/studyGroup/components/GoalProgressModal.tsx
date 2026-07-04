'use client';

import React, { useState } from 'react';
import { GoalWithUI } from '@/hooks/studyGroup/features/goals/goalsSlice';
import { useAppDispatch, useAppSelector } from '@/core/store/store.hooks';
import { updateGoalProgressThunk, fetchAllGoalsThunk } from '@/hooks/studyGroup/features/goals/goals.thunks';

interface GoalProgressModalProps {
  goalId: string;
  color: string;
  title: string;
  subtitle?: string;
  onClose: () => void;
}

export default function GoalProgressModal({
  goalId,
  color,
  title,
  subtitle,
  onClose,
}: GoalProgressModalProps) {
  const dispatch = useAppDispatch();
  const allGoals = useAppSelector(state => state.goals.items);
  const [hoursInput, setHoursInput] = useState('');
  const [loading, setLoading] = useState(false);

  const goal = allGoals.find(g => g.goalId === goalId);
  const progress = goal?.progressPercentage ?? 0;
  const remaining = goal ? goal.targetHours - goal.currentHours : 0;

  const handleLog = async () => {
    if (!hoursInput || Number(hoursInput) <= 0) return;
    if (Number(hoursInput) > remaining) {
      alert(`Sirf ${remaining}h remaining hai.`);
      return;
    }
    setLoading(true);
    await dispatch(updateGoalProgressThunk({
      goalId,
      hoursToAdd: Number(hoursInput),
    }));
    await dispatch(fetchAllGoalsThunk());
    setLoading(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#f6ede8] rounded-xl shadow-2xl w-full max-w-sm p-5"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-black text-xs flex-shrink-0"
            style={{ backgroundColor: color }}
          >
            {title.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="font-black text-[#4a3728] text-sm">{title}</div>
            {subtitle && (
              <div className="text-xs text-[#6b5847]">{subtitle}</div>
            )}
          </div>
        </div>

        {/* Progress info */}
        <div className="mb-4 p-3 bg-[#e0d8cf]/40 rounded-lg">
          <div className="flex justify-between text-xs text-[#6b5847] mb-1.5">
            <span>{goal?.currentHours ?? 0}h done</span>
            <span className="font-bold text-[#4a3728]">{goal?.targetHours ?? 0}h target</span>
          </div>
          <div className="w-full h-2 bg-[#e0d8cf]/60 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${goal?.currentHours && goal?.targetHours ? (goal.currentHours / goal.targetHours) * 100 : 0}%`, backgroundColor: color }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-xs text-[#6b5847]">{(goal?.currentHours && goal?.targetHours ? (goal.currentHours / goal.targetHours) * 100 : 0).toFixed(2)}% complete</span>
            <span className="text-xs font-bold text-[#4a3728]">{(remaining).toFixed(2)}h remaining</span>
          </div>
        </div>

        {/* Input */}
        <div className="mb-4">
          <label className="block text-xs font-bold text-[#4a3728] mb-1.5 uppercase tracking-wide">
            Hours studied
          </label>
          <input
            type="number"
            value={hoursInput}
            onChange={e => setHoursInput(e.target.value)}
            placeholder={`Max ${(remaining).toFixed(2)}h`}
            min={0.5}
            max={remaining}
            step={0.5}
            autoFocus
            className="w-full px-3 py-2.5 bg-white border-2 border-[#d4c4b0] rounded-lg text-sm text-[#4a3728] focus:outline-none focus:border-[#4a3728]"
          />
          {Number(hoursInput) > remaining && remaining > 0 && (
            <p className="text-xs text-green-700 mt-1 font-semibold">
              Target should be {remaining}h or less. Aap goal complete kar sakte ho!
            </p>
          )}
          {Number(hoursInput) == remaining && remaining > 0 && (
            <p className="text-xs text-green-700 mt-1 font-semibold">
              Target is completed
            </p>
          )}
          {remaining <= 0 && (
            <p className="text-xs text-green-700 mt-1 font-semibold">
              Goal already complete hai!
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2">
          <button
            onClick={handleLog}
            disabled={loading || !hoursInput || Number(hoursInput) <= 0 || remaining <= 0}
            className="w-full py-2.5 bg-gradient-to-r from-[#4a3728] to-[#6b4e3d] text-[#f6ede8] rounded-lg text-sm font-bold hover:opacity-90 disabled:opacity-50 transition-all"
          >
            {loading ? 'Saving...' : `Log ${hoursInput || 0}h`}
          </button>
          <button
            onClick={onClose}
            className="w-full py-2 text-[#6b5847] text-sm hover:text-[#4a3728] transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}