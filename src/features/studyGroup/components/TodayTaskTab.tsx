'use client';

import { useAppSelector } from '@/core/store/store.hooks';
import TaskCard from './TaskCard';
import SkeletonLoader from '@/app/loading';

interface TodayTasksTabProps {
    dateStr: string;          // selected date string YYYY-MM-DD
    onActionDone?: () => void;
}

export default function TodayTasksTab({ dateStr, onActionDone }: TodayTasksTabProps) {
    const apiTasks = useAppSelector(state => state.todos.apiTasks);
    const isLoading = useAppSelector(state => state.todos.loading.fetchAll);
    const todayStr = new Date().toISOString().slice(0, 10);
    const isToday = dateStr === todayStr;

    // deadline ke first 10 chars se match karo — selectedDate se
    const todayTasks = apiTasks.filter(task => {
        if (!task.deadline) return false;
        return task.deadline.slice(0, 10) === dateStr;
    });

    const done = todayTasks.filter(t => t.completed).length;
    const overdue = todayTasks.filter(t => t.isOverdue).length;

    if (isLoading) {
        return <SkeletonLoader  />;
    }

    // if (todayTasks.length === 0) {
    //     return (
    //         <div className="text-center py-10 text-[#6b5847]">
    //             <p className="text-sm">No tasks for today.</p>
    //             <p className="text-xs text-gray-400 mt-1">Switch to + Create tab to add one.</p>
    //         </div>
    //     );
    // }

    if (todayTasks.length === 0) {
        return (
            <div className="text-center py-10 text-[#6b5847]">
                <p className="text-sm">
                    {isToday
                        ? 'No tasks for today.'
                        : `No tasks for ${new Date(dateStr).toLocaleDateString('en-IN', {
                            day: 'numeric', month: 'short'
                        })}.`
                    }
                </p>
                <p className="text-xs text-gray-400 mt-1">
                    {isToday
                        ? 'Switch to + Create tab to add one.'
                        : 'Switch to + Create tab to add a task for this date.'
                    }
                </p>
            </div>
        );
    }

    return (
        <div>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 mb-3">
                {[
                    { label: 'Total', value: todayTasks.length },
                    { label: 'Done', value: done },
                    { label: 'Overdue', value: overdue },
                ].map(s => (
                    <div key={s.label} className="bg-[#f6ede8] rounded-lg p-2 text-center">
                        <div className="text-base font-semibold text-[#4a3728]">{s.value}</div>
                        <div className="text-[10px] text-[#6b5847]">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Progress */}
            {todayTasks.length > 0 && (
                <div className="mb-3">
                    <div className="flex justify-between text-[10px] text-[#6b5847] mb-1">
                        <span>Progress</span>
                        <span>{Math.round((done / todayTasks.length) * 100)}%</span>
                    </div>
                    <div className="w-full bg-[#e0d8cf] rounded-full h-1.5">
                        <div
                            className="bg-[#8b7355] h-1.5 rounded-full transition-all"
                            style={{ width: `${Math.round((done / todayTasks.length) * 100)}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Task list */}
            {todayTasks.map(task => (
                <TaskCard
                    key={task.taskId}
                    task={task}
                    isOverdue={task.isOverdue}
                    onActionDone={onActionDone}
                />
            ))}
        </div>
    );
}