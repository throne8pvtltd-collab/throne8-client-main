'use client';

import { useState } from 'react';
import { Check, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useAppDispatch } from '@/store/hooks';
import { markCompleteThunk, markIncompleteThunk, deleteTaskThunk, updateTaskThunk } from '@/hooks/studyGroup/features/todo/todo.thunks';
import type { TaskResponse } from '@/lib/api/studyGroup.service';
import { PRIORITY_STYLE } from '../data';

interface TaskCardProps {
    task: TaskResponse;
    isOverdue?: boolean;
    onActionDone?: () => void; // parent ko refresh signal
}



export default function TaskCard({ task, isOverdue = false, onActionDone }: TaskCardProps) {
    const dispatch = useAppDispatch();
    const [expanded, setExpanded] = useState(false);
    const [isToggling, setIsToggling] = useState(false);

    const [isDeleting, setIsDeleting] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    //   const [isDeleting, setIsDeleting] = useState(false);

    // Edit state
    const [editTitle, setEditTitle] = useState(task.title);
    const [editDesc, setEditDesc] = useState(task.description || '');
    const [editPriority, setEditPriority] = useState(task.priority);
    const [editDeadline, setEditDeadline] = useState(
        task.deadline ? new Date(task.deadline).toISOString().slice(0, 16) : ''
    );
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);
    const minDeadline = new Date().toISOString().slice(0, 16);
    const [localCompleted, setLocalCompleted] = useState(task.completed);

    const handleToggle = async () => {
        if (isToggling) return;
        setIsToggling(true);
        // Optimistic update — API response ka wait mat karo
        setLocalCompleted(prev => !prev);
        try {
            if (localCompleted) {
                await dispatch(markIncompleteThunk(task.taskId)).unwrap();
            } else {
                await dispatch(markCompleteThunk(task.taskId)).unwrap();
            }
            onActionDone?.(); // Refetch for fresh data
        } catch (e: any) {
            // Fail hone pe revert karo
            setLocalCompleted(prev => !prev);
            console.error('Toggle failed:', e.message);
        } finally {
            setIsToggling(false);
        }
    };

    const handleDelete = async () => {
        // Pehli click pe confirm dialog dikhao
        if (!confirmDelete) {
            setConfirmDelete(true);
            // 3 second baad auto cancel
            setTimeout(() => setConfirmDelete(false), 3000);
            return;
        }
        // Doosri click pe actual delete
        if (isDeleting) return;
        setIsDeleting(true);
        setConfirmDelete(false);
        try {
            await dispatch(deleteTaskThunk(task.taskId)).unwrap();
            // Redux se remove hoga via extraReducer — onActionDone refetch karega
            onActionDone?.();
        } catch (e: any) {
            console.error('Delete failed:', e.message);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleSave = async () => {
        if (!editTitle.trim()) return;
        setSaveError(null);
        setIsSaving(true);
        try {
            await dispatch(updateTaskThunk({
                taskId: task.taskId,
                data: {
                    title: editTitle.trim(),
                    description: editDesc.trim() || undefined,
                    priority: editPriority,
                    deadline: editDeadline ? new Date(editDeadline).toISOString() : undefined,
                },
            })).unwrap();
            setExpanded(false);
            onActionDone?.();
        } catch (e: any) {
            setSaveError(e.message || 'Update failed');
        } finally {
            setIsSaving(false);
        }
    };

    const cardBorder = isOverdue
        ? 'border-l-4 border-l-red-400 border-t border-r border-b border-[#e0d8cf]'
        : localCompleted
            ? 'border border-[#e0d8cf] opacity-75'
            : 'border border-[#e0d8cf] hover:border-[#8b7355]';

    return (
        <div className={`rounded-lg p-3 mb-2 bg-white transition-all ${cardBorder} ${expanded ? 'border-[#8b7355]' : ''}`}>

            {/* Top row */}
            <div className="flex items-start gap-2">
                {/* Check button */}
                <button
                    onClick={handleToggle}
                    disabled={isToggling}
                    className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 transition-all disabled:opacity-50 ${localCompleted
                        // ? 'bg-[#8b7355] border-[#8b7355]'
                        // : 'border-[#8b7355] hover:bg-[#8b7355]/10'
                        ? 'bg-[#8b7355] border-[#8b7355]'
                        : 'border-[#8b7355] hover:bg-[#8b7355]/10'
                        }`}
                >
                    {localCompleted && <Check className="w-3 h-3 text-white" />}
                </button>

                {/* Title */}
                <div
                    className={`flex-1 text-sm font-medium leading-snug 
                        ${
                        // localCompleted ? 'line-through text-[#6b5847]' : 'text-[#4a3728]'
                        localCompleted ? 'line-through text-[#6b5847]' : 'text-[#4a3728]'
                        } ${!isOverdue ? 'cursor-pointer' : ''}`}
                    onClick={() => !isOverdue && setExpanded(p => !p)}
                >
                    {task.title}
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-1 flex-shrink-0">
                    {!isOverdue && (
                        <button
                            onClick={() => setExpanded(p => !p)}
                            className="w-6 h-6 flex items-center justify-center text-[#8b7355] hover:bg-[#f6ede8] rounded transition-all"
                        >
                            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                    )}
                    {/* <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="w-6 h-6 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-all disabled:opacity-50"
                    >
                        <Trash2 size={13} />
                    </button> */}

                    {confirmDelete ? (
                        <div className="flex items-center gap-1">
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="px-2 py-0.5 text-[10px] bg-red-500 text-white rounded font-medium hover:bg-red-600 disabled:opacity-50"
                            >
                                {isDeleting ? '...' : 'Yes'}
                            </button>
                            <button
                                onClick={() => setConfirmDelete(false)}
                                className="px-2 py-0.5 text-[10px] border border-gray-300 text-gray-500 rounded hover:bg-gray-50"
                            >
                                No
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="w-6 h-6 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-all disabled:opacity-50"
                        >
                            <Trash2 size={13} />
                        </button>
                    )}
                </div>
            </div>

            {/* Meta row */}
            <div className="flex gap-1.5 flex-wrap mt-1.5 ml-7">
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${PRIORITY_STYLE[task.priority]}`}>
                    {task.priority}
                </span>
                {isOverdue && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200 font-medium">
                        overdue
                    </span>
                )}
                {(task.tags || []).map(tag => (
                    <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#f6ede8] text-[#6b5847]">
                        {tag}
                    </span>
                ))}
            </div>

            {/* Description + deadline (always visible if present) */}
            {task.description && !expanded && (
                <p className="text-[11px] text-[#6b5847] mt-1.5 ml-7 line-clamp-1">{task.description}</p>
            )}
            {task.deadline && (
                <p className="text-[10px] text-gray-400 mt-1 ml-7">
                    Deadline: {new Date(task.deadline).toLocaleString('en-IN', {
                        day: 'numeric', month: 'short',
                        hour: '2-digit', minute: '2-digit',
                    })}
                </p>
            )}

            {/* Overdue note */}
            {isOverdue && (
                <p className="text-[10px] text-red-500 italic mt-1 ml-7">
                    Edit disabled — mark complete or delete only
                </p>
            )}

            {/* Inline edit form */}
            {expanded && !isOverdue && (
                <div className="mt-3 ml-7 pt-3 border-t border-[#e0d8cf] flex flex-col gap-2">
                    {saveError && (
                        <p className="text-[11px] text-red-500">{saveError}</p>
                    )}
                    <div>
                        <label className="text-[10px] font-medium text-[#6b5847]">Title</label>
                        <input
                            value={editTitle}
                            onChange={e => setEditTitle(e.target.value)}
                            className="w-full mt-0.5 px-2 py-1.5 text-xs border border-[#e0d8cf] rounded-lg focus:border-[#8b7355] outline-none text-[#4a3728]"
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-medium text-[#6b5847]">Description</label>
                        <textarea
                            value={editDesc}
                            onChange={e => setEditDesc(e.target.value)}
                            rows={2}
                            className="w-full mt-0.5 px-2 py-1.5 text-xs border border-[#e0d8cf] rounded-lg focus:border-[#8b7355] outline-none resize-none text-[#4a3728]"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="text-[10px] font-medium text-[#6b5847]">Priority</label>
                            <select
                                value={editPriority}
                                onChange={e => setEditPriority(e.target.value as any)}
                                className="w-full mt-0.5 px-2 py-1.5 text-xs border border-[#e0d8cf] rounded-lg focus:border-[#8b7355] outline-none text-[#4a3728]"
                            >
                                {['low', 'medium', 'high', 'urgent'].map(p => (
                                    <option key={p} value={p}>{p}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-[10px] font-medium text-[#6b5847]">Deadline</label>
                            <input
                                type="datetime-local"
                                value={editDeadline}
                                min={minDeadline}
                                onChange={e => setEditDeadline(e.target.value)}
                                className="..."
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleSave}
                            disabled={isSaving || !editTitle.trim()}
                            className="px-3 py-1.5 bg-[#8b7355] text-white text-xs font-medium rounded-lg disabled:opacity-50 hover:bg-[#6b5847] transition-all"
                        >
                            {isSaving ? 'Saving...' : 'Save'}
                        </button>
                        <button
                            onClick={() => { setExpanded(false); setSaveError(null); }}
                            className="px-3 py-1.5 border border-[#e0d8cf] text-[#6b5847] text-xs rounded-lg hover:bg-[#f6ede8] transition-all"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}