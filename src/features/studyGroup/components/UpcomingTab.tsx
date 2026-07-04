'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useAppSelector } from '@/core/store/store.hooks';
import TaskCard from './TaskCard';
import CreateTaskTab from './CreateTasktab';
import SkeletonLoader from '@/app/loading';
import { CompletionFilter } from '../types';

interface UpcomingTabProps {
  selectedDate: Date;
  formatDate: (date: Date) => string;
  groupId?: string | null;
}

export default function UpcomingTab({ selectedDate, formatDate, groupId }: UpcomingTabProps) {
  const apiTasks = useAppSelector(state => state.todos.apiTasks);
  const isLoading = useAppSelector(state => state.todos.loading.fetchAll);

  // selectedDate ke BAAD ki saari tasks — upcomingTasks nahi, apiTasks se filter karo
  const selectedStr = selectedDate.toISOString().slice(0, 10);
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);
  const isPastDate = selectedStr < todayStr;
  
  const upcomingTasks = apiTasks.filter(task => {
    if (!task.deadline) return false;
    return task.deadline.slice(0, 10) >= selectedStr;
  });
 const [showCreate, setShowCreate] = useState(false);
  const [completionFilter, setCompletionFilter] = useState<CompletionFilter>('all');

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().slice(0, 10);

  const getLabel = (dateStr: string) => {
    if (dateStr === tomorrowStr) return 'Tomorrow';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', weekday: 'short',
    });
  };

  // Filter tasks based on completion status
  const filteredTasks = upcomingTasks.filter(task => {
    if (completionFilter === 'incomplete') return !task.completed;
    if (completionFilter === 'complete') return task.completed;
    return true;
  });

  // Date-wise group
  const groups: Record<string, typeof filteredTasks> = {};
  filteredTasks.forEach(task => {
    if (!task.deadline) return;
    const dateKey = task.deadline.slice(0, 10);
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(task);
  });

  if (isLoading) {
    return <SkeletonLoader  />;
    //  (
    //   <div className="flex items-center justify-center py-10">
    //     <span className="w-6 h-6 border-2 border-[#8b7355]/30 border-t-[#8b7355] rounded-full animate-spin" />
    //   </div>
    // );
  }

  return (
    <div>
      {/* Completion status tabs */}
      <div className="flex gap-2 mb-4 border-b border-[#e0d8cf]">
        {['all', 'incomplete', 'complete'].map(filter => (
          <button
            key={filter}
            onClick={() => setCompletionFilter(filter as CompletionFilter)}
            className={`py-2 px-3 text-xs font-medium transition-all border-b-2 ${
              completionFilter === filter
                ? 'border-[#8b7355] text-[#8b7355]'
                : 'border-transparent text-[#6b5847] hover:text-[#4a3728]'
            }`}
          >
            {filter === 'all' && 'All'}
            {filter === 'incomplete' && 'Incomplete'}
            {filter === 'complete' && 'Complete'}
          </button>
        ))}
      </div>

      {/* Create toggle button */}
      {!isPastDate && (
        <button
          onClick={() => setShowCreate(prev => !prev)}
          className={`w-full flex items-center justify-center gap-2 py-2 mb-3 rounded-lg border text-xs font-medium transition-all ${
            showCreate
              ? 'bg-[#f6ede8] border-[#8b7355] text-[#8b7355]'
              : 'border-[#e0d8cf] text-[#6b5847] hover:border-[#8b7355] hover:text-[#8b7355]'
          }`}
        >
          {showCreate ? (
            <><X size={13} /> Hide create form</>
          ) : (
            <><Plus size={13} /> Create new task</>
          )}
        </button>
      )}

      {/* Create form — collapsible */}
      {showCreate && (
        <div className="mb-4 p-3 bg-[#fdf8f5] border border-[#e0d8cf] rounded-lg">
          <CreateTaskTab
            selectedDate={selectedDate}
            formatDate={formatDate}
            groupId={groupId}
            onCreated={() => setShowCreate(false)}
          />
        </div>
      )}

      {/* Upcoming list */}
      {filteredTasks.length === 0 ? (
        <div className="text-center py-8 text-[#6b5847]">
          <p className="text-sm">No upcoming tasks in next 7 days.</p>
          <p className="text-xs text-gray-400 mt-1">Use the button above to create one.</p>
        </div>
      ) : (
        <>
          <p className="text-[11px] text-[#6b5847] mb-3">Next 7 days</p>
          {Object.entries(groups)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([dateStr, tasks]) => (
              <div key={dateStr} className="mb-4">
                <div className="text-[10px] font-medium text-[#8b7355] uppercase tracking-wide mb-1.5 pb-1 border-b border-[#e0d8cf]">
                  {getLabel(dateStr)}
                </div>
                {tasks.map(task => (
                  <TaskCard key={task.taskId} task={task} isOverdue={false} />
                ))}
              </div>
            ))}
        </>
      )}
    </div>
  );
}