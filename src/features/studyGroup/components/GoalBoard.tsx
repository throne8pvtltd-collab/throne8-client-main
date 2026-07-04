'use client';

import React from 'react';
import GoalCard from './GoalCard';
import { GoalWithUI } from '@/hooks/studyGroup/features/goals/goalsSlice';

interface GoalBoardProps {
  goals: GoalWithUI[];
  onEdit: (goal: GoalWithUI) => void;
  onDelete: (goalId: string) => void;
}

export default function GoalBoard({ goals, onEdit, onDelete }: GoalBoardProps) {
  if (goals.length === 0) {
    return (
      <div className="text-center py-12 bg-[#f6ede8]/50 rounded-xl border border-dashed border-[#e0d8cf] mb-6">
        <p className="text-[#4a3728] font-bold text-lg mb-1">No goals yet</p>
        <p className="text-sm text-[#6b5847]">Create your first goal to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      {goals.map((goal) => (
        <GoalCard
          key={goal.goalId}
          goal={goal}
          onEdit={onEdit}
          onDelete={onDelete}
        />
       
      ))}
    </div>
  );
}
