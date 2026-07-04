'use client';

import { useAppDispatch, useAppSelector } from '@/core/store/store.hooks';
import { setSubject } from '@/hooks/studyGroup/features/timer/timerSlice';
import { useState, useEffect } from 'react';
import { fetchActiveGoalsThunk } from '@/hooks/studyGroup/features/goals/goals.thunks';
import { selectActiveGoals } from '@/hooks/studyGroup/features/goals/goalsSlice';

export default function SubjectInput() {
  const dispatch = useAppDispatch();
  const [mounted, setMounted] = useState(false);

  const subject = useAppSelector(state => state.timer.subject);
  const isActive = useAppSelector(state => state.timer.isActive);
  const isBreakMode = useAppSelector(state => state.timer.isBreakMode);
  const completedSessions = useAppSelector(state => state.timer.completedSessions);

  const activeGoals = useAppSelector(selectActiveGoals);
  const [selectedGoalId, setSelectedGoalId] = useState<string>('');

  useEffect(() => {
    dispatch(fetchActiveGoalsThunk());
  }, [dispatch]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <>
      <div className="bg-gradient-to-r from-[#e0d8cf]/60 to-[#e0d8cf]/40 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 mt-4 border border-[#e0d8cf]/50">
        <label className="block text-xs font-bold text-[#4a3728]/70 uppercase tracking-wider mb-1.5">
          Subject
        </label>
        <input
          type="text"
          value=""
          disabled
          placeholder="What are you working on?"
          className="w-full bg-[#f6ede8] text-[#4a3728] text-sm font-semibold px-3 py-2 rounded-lg border border-[#e0d8cf]/50 placeholder:text-[#4a3728]/30"
        />

       <select
          value={selectedGoalId}
          onChange={(e) => setSelectedGoalId(e.target.value)}
          disabled={isActive}
          className="w-full bg-[#f6ede8] text-[#4a3728] text-sm font-semibold px-3 py-2 rounded-lg border border-[#e0d8cf]/50 mt-2"
        >
          <option value="">No goal linked</option>
          {activeGoals.map((goal: any) => (
            <option key={goal.goalId} value={goal.goalId}>
              {goal.title} ({goal.progressPercentage}%)
            </option>
          ))}
        </select>
        
      </div>
        </>
    );
  }

  return (
    <div className="bg-gradient-to-r from-[#e0d8cf]/60 to-[#e0d8cf]/40 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 mt-4 border border-[#e0d8cf]/50 relative">
      <label className="block text-xs font-bold text-[#4a3728]/70 uppercase tracking-wider mb-1.5">
        {isBreakMode ? 'Break Time' : 'Subject'}
      </label>
      {isBreakMode ? (
        <div className="w-full bg-[#f6ede8] text-[#4a3728] text-sm font-semibold px-3 py-2 rounded-lg border border-[#e0d8cf]/50 text-center">
          {completedSessions % 4 === 0 ? 'Take a long break! 🎉' : 'Take a short break! ☕'}
        </div>
      ) : (
        <>
          <input
            type="text"
            value={subject || ""}
            onChange={(e) => dispatch(setSubject(e.target.value))}
            placeholder="What are you working on?"
            className="w-full bg-[#f6ede8] text-[#4a3728] text-sm font-semibold px-3 py-2 rounded-lg border border-[#e0d8cf]/50 focus:outline-none focus:ring-2 focus:ring-[#6b4e3d]/30 placeholder:text-[#4a3728]/30"
            disabled={isActive}
          />

          <select
            value={selectedGoalId}
            onChange={(e) => setSelectedGoalId(e.target.value)}
            disabled={isActive}
            className="w-full bg-[#f6ede8] text-[#4a3728] text-sm font-semibold px-3 py-2 rounded-lg border border-[#e0d8cf]/50 mt-2"
          >
            <option value="">No goal linked</option>
            {activeGoals.map((goal: any) => (
              <option key={goal.goalId} value={goal.goalId}>
                {goal.title} ({goal.progressPercentage}%)
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
}