'use client';

import { X, Calendar } from 'lucide-react';
import TodayTasksTab from './TodayTaskTab';
import UpcomingTab from './UpcomingTab';
import OverdueTab from './OverViewtab';
import CreateTaskTab from './CreateTasktab';
import { useAppDispatch } from '@/store/hooks';
import { fetchAllTasksThunk, fetchUpcomingTasksThunk, fetchOverdueTasksThunk } from '@/hooks/studyGroup/features/todo/todo.thunks';
import { TabId } from '../types';
import { useState, useEffect } from 'react';
import { getDateType, getTabs } from '../helper';

interface TaskDrawerProps {
    selectedDate: Date | null;
    showDrawer: boolean;
    setShowDrawer: (show: boolean) => void;
    formatDate: (date: Date) => string;
    groupId?: string | null;
}




export default function TaskDrawer({
    selectedDate,
    showDrawer,
    setShowDrawer,
    formatDate,
    groupId,
}: TaskDrawerProps) {
    const dispatch = useAppDispatch();
    const [activeTab, setActiveTab] = useState<TabId>('today-tasks');

    const dateType = selectedDate ? getDateType(selectedDate) : 'today';
    const tabs = getTabs(dateType);

    // Jab date change ho toh pehla tab select karo
    useEffect(() => {
        if (selectedDate) {
            setActiveTab(getTabs(getDateType(selectedDate))[0].id);
        }
    }, [selectedDate]);
    const handleActionDone = () => {
     dispatch(fetchAllTasksThunk(undefined));
        dispatch(fetchUpcomingTasksThunk(7));
        dispatch(fetchOverdueTasksThunk());
    };

    if (!showDrawer || !selectedDate) return null;

    const dateStr = formatDate(selectedDate);
    const dateLabel = selectedDate.toLocaleDateString('en-US', {
        weekday: 'long', day: 'numeric', month: 'long',
    });

    const badgeConfig = {
        today: { text: 'Today', cls: 'bg-[#f6ede8] text-[#6b5847]' },
        future: { text: 'Upcoming date', cls: 'bg-blue-50 text-blue-700' },
        past: { text: 'Past date', cls: 'bg-red-50 text-red-600' },
    }[dateType];

    return (
        <div className="fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setShowDrawer(false)}
            />

            {/* Drawer — right side se slide in */}
            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">

                {/* Header */}
                <div className="flex items-start justify-between p-4 border-b border-[#e0d8cf]">
                    <div className="flex items-start gap-2">
                        <Calendar className="text-[#8b7355] mt-0.5 flex-shrink-0" size={18} />
                        <div>
                            <h2 className="text-sm font-semibold text-[#4a3728] leading-tight">{dateLabel}</h2>
                            <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full mt-1 font-medium ${badgeConfig.cls}`}>
                                {badgeConfig.text}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowDrawer(false)}
                        className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-all"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-[#e0d8cf]">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 py-2.5 text-xs font-medium transition-all border-b-2 ${activeTab === tab.id
                                ? 'border-[#8b7355] text-[#8b7355]'
                                : 'border-transparent text-[#6b5847] hover:text-[#4a3728]'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab content */}
                <div className="flex-1 overflow-y-auto p-4">
                    {activeTab === 'today-tasks' && (
                        <TodayTasksTab dateStr={dateStr} onActionDone={handleActionDone} />
                    )}
                    {activeTab === 'date-tasks' && (
                        <TodayTasksTab dateStr={dateStr} onActionDone={handleActionDone} />
                    )}
                    {/* {activeTab === 'upcoming' && (
            <UpcomingTab />
          )} */}

                    {activeTab === 'upcoming' && (
                        <UpcomingTab
                            selectedDate={selectedDate}
                            formatDate={formatDate}
                            groupId={groupId}
                        />
                    )}
                    {activeTab === 'overdue' && (
                        <OverdueTab />
                    )}
                    {activeTab === 'create' && (
                        <CreateTaskTab
                            selectedDate={selectedDate}
                            formatDate={formatDate}
                            groupId={groupId}
                            onCreated={() => {
                                handleActionDone();
                                setActiveTab('today-tasks');
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}