'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useAppDispatch } from '@/store/hooks';
import { createTaskThunk, fetchAllTasksThunk, fetchUpcomingTasksThunk } from '@/hooks/studyGroup/features/todo/todo.thunks';
import { addTodo } from '@/hooks/studyGroup/features/todo/todoSlice';

interface CreateTaskTabProps {
    selectedDate: Date;
    formatDate: (date: Date) => string;
    groupId?: string | null;
    onCreated?: () => void;
}

export default function CreateTaskTab({ selectedDate, formatDate, groupId, onCreated }: CreateTaskTabProps) {
    const dispatch = useAppDispatch();
    const dateStr = formatDate(selectedDate);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
    const [deadline, setDeadline] = useState('');
    const [tags, setTags] = useState('');
    const [reminderAt, setReminderAt] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const minDeadline = new Date().toISOString().slice(0, 16);

    // Auto-fill deadline from selected date
    useEffect(() => {
        const dl = new Date(selectedDate);
        dl.setHours(23, 59, 0, 0);
        setDeadline(dl.toISOString().slice(0, 16));
    }, [selectedDate]);

    const handleAdd = async () => {
        if (!title.trim() || isAdding) return;
        setError(null);
        setIsAdding(true);
        try {
            const parsedTags = tags.split(',').map(t => t.trim()).filter(Boolean).slice(0, 10);
            const payload = {
                title: title.trim(),
                description: description.trim() || undefined,
                priority,
                deadline: deadline ? new Date(deadline).toISOString() : undefined,
                tags: parsedTags.length ? parsedTags : [],
                reminderAt: reminderAt ? new Date(reminderAt).toISOString() : undefined,
                groupId: groupId ?? null,
            };

            await dispatch(createTaskThunk(payload)).unwrap();

            // Local items update for MonthView
            dispatch(addTodo({
                dateStr,
                text: payload.title,
                description: payload.description,
                priority: payload.priority,
                deadline: payload.deadline,
                tags: payload.tags,
            }));

            // Refresh lists
            dispatch(fetchAllTasksThunk(undefined));
            dispatch(fetchUpcomingTasksThunk(7));

            // Reset form
            setTitle('');
            setDescription('');
            setPriority('medium');
            setTags('');
            setReminderAt('');
            setSuccess(true);
            setTimeout(() => setSuccess(false), 2000);
            onCreated?.();
        } catch (e: any) {
            setError(e.message || 'Task create karne mein problem aayi');
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div className="flex flex-col gap-3">
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg px-3 py-2">
                    {error}
                </div>
            )}
            {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 text-xs rounded-lg px-3 py-2">
                    Task created successfully!
                </div>
            )}

            <div>
                <label className="text-xs font-medium text-[#6b5847]">Title <span className="text-red-400">*</span></label>
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAdd()}
                    placeholder="Task title"
                    className="w-full mt-1 px-3 py-2 border border-[#e0d8cf] rounded-lg focus:border-[#8b7355] focus:ring-1 focus:ring-[#8b7355]/30 outline-none text-sm text-[#4a3728]"
                />
            </div>

            <div>
                <label className="text-xs font-medium text-[#6b5847]">Description</label>
                <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Optional..."
                    rows={2}
                    className="w-full mt-1 px-3 py-2 border border-[#e0d8cf] rounded-lg focus:border-[#8b7355] focus:ring-1 focus:ring-[#8b7355]/30 outline-none text-sm resize-none text-[#4a3728]"
                />
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div>
                    <label className="text-xs font-medium text-[#6b5847]">Priority</label>
                    <select
                        value={priority}
                        onChange={e => setPriority(e.target.value as any)}
                        className="w-full mt-1 px-3 py-2 border border-[#e0d8cf] rounded-lg focus:border-[#8b7355] outline-none text-sm text-[#4a3728]"
                    >
                        {['low', 'medium', 'high', 'urgent'].map(p => (
                            <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="text-xs font-medium text-[#6b5847]">Deadline</label>
                    <input
                        type="datetime-local"
                        value={deadline}
                        min={minDeadline}
                        onChange={e => setDeadline(e.target.value)}
                        className="..."
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div>
                    <label className="text-xs font-medium text-[#6b5847]">Tags</label>
                    <input
                        value={tags}
                        onChange={e => setTags(e.target.value)}
                        placeholder="dsa, math, coding"
                        className="w-full mt-1 px-3 py-2 border border-[#e0d8cf] rounded-lg focus:border-[#8b7355] outline-none text-sm text-[#4a3728]"
                    />
                </div>
                <div>
                    <label className="text-xs font-medium text-[#6b5847]">Reminder at</label>
                    <input
                        type="datetime-local"
                        value={reminderAt}
                        onChange={e => setReminderAt(e.target.value)}
                        className="w-full mt-1 px-3 py-2 border border-[#e0d8cf] rounded-lg focus:border-[#8b7355] outline-none text-sm text-[#4a3728]"
                    />
                </div>
            </div>

            <button
                onClick={handleAdd}
                disabled={isAdding || !title.trim()}
                className="w-full py-2.5 bg-[#8b7355] hover:bg-[#6b5847] text-white rounded-lg font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                {isAdding ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    <Plus size={16} />
                )}
                {isAdding ? 'Adding...' : 'Add Task'}
            </button>
        </div>
    );
}