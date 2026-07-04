'use client';

import { useAppDispatch, useAppSelector } from '@/core/store/store.hooks';
import {
  decrementTime,
  completeSession,
  startBreak,
  endBreak
} from '@/hooks/studyGroup/features/timer/timerSlice';
import { useEffect, useRef, useState } from 'react';

import TimerTabs from '@/features/studyGroup/components/TimerTabs';
import TimerDisplay from '@/features/studyGroup/components/TimerDisplay';
import CustomTimerControls from '@/features/studyGroup/components/CustomTimerControls';
import SubjectInput from '@/features/studyGroup/components/SubjectInput';
import TimerControls from '@/features/studyGroup/components/TimerControls';
import TimerStats from '@/features/studyGroup/components/TimerStats';
import MotivationalQuote from '@/features/studyGroup/components/MotivationalQuote';
import StudyProgress from '@/features/studyGroup/components/StudyProgress';
import { getActiveTimerThunk, getAllSessionsThunk, getTimerStatsThunk, getTodaySessionsThunk, stopTimerThunk } from '@/hooks/studyGroup/features/timer/timer.thunks';

export default function PomodoroTimer() {
  const dispatch = useAppDispatch();

  const isActive = useAppSelector(state => state.timer.isActive);
  const minutes = useAppSelector(state => state.timer.minutes);
  const seconds = useAppSelector(state => state.timer.seconds);
  const isBreakMode = useAppSelector(state => state.timer.isBreakMode);
  const activeTab = useAppSelector(state => state.timer.activeTab);
  const customMinutes = useAppSelector(state => state.timer.customMinutes);
  const completedSessions = useAppSelector(state => state.timer.completedSessions);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [viewingSessionId, setViewingSessionId] = useState<string | null>(null);
  const justCompleted = useRef(false);

  useEffect(() => {
    dispatch(getActiveTimerThunk());
    dispatch(getTodaySessionsThunk());
    dispatch(getTimerStatsThunk());
  }, [dispatch]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        if (minutes === 0 && seconds === 0) {
          if (!justCompleted.current) {
            justCompleted.current = true;
            handleTimerComplete();
          }
          return;
        }
        if (minutes === 0 && seconds === 1) {
          dispatch(decrementTime());
          if (!justCompleted.current) {
            justCompleted.current = true;
            setTimeout(() => handleTimerComplete(), 100);
          }
          return;
        }

        justCompleted.current = false;
        dispatch(decrementTime());
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, minutes, seconds]);

  const handleTimerComplete = () => {
    justCompleted.current = false;

    if (activeTab === 'pomodoro') {
      if (isBreakMode) {
        dispatch(endBreak());
      } else {
        dispatch(stopTimerThunk(undefined)).then((result: any) => {
          if (result.meta.requestStatus === 'fulfilled') {
            setSessionCompleted(true);
            setTimeout(() => setSessionCompleted(false), 4000);
          }
          dispatch(completeSession());
          const isLongBreak = (completedSessions + 1) % 4 === 0;
          dispatch(startBreak(isLongBreak ? 'long' : 'short'));
          dispatch(getTodaySessionsThunk());
          dispatch(getTimerStatsThunk());
          dispatch(getAllSessionsThunk({ limit: 10 }));
        });
      }
    } else {
      dispatch(stopTimerThunk(undefined)).then((result: any) => {
        if (result.meta.requestStatus === 'fulfilled') {
          setSessionCompleted(true);
          setTimeout(() => setSessionCompleted(false), 4000);
        }
        dispatch(completeSession());
        dispatch(getTodaySessionsThunk());
        dispatch(getTimerStatsThunk());
        dispatch(getAllSessionsThunk({ limit: 10 }));
      });
    }
  };

  const tabDuration = activeTab === 'timer'
    ? (customMinutes || 15)
    : (activeTab === 'pomodoro' ? 25 : 45);

  const totalSeconds = tabDuration * 60;
  const remainingSeconds = (minutes || 0) * 60 + (seconds || 0);
  const progress = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;

  return (
    <div className="min-h-screen bg-[#f7f3ee] flex flex-col items-center justify-start p-3 sm:p-4 lg:p-6 lg:justify-center">

      {/* ADD: Session complete toast */}
      {sessionCompleted && (
        <div className="fixed top-4 right-4 bg-[#4a3728] text-[#f6ede8] px-5 py-3 rounded-xl shadow-lg text-sm font-bold z-50 flex items-center gap-2 animate-in">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          Session completed! Great work
        </div>
      )}
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 items-start justify-center">

        {/* Left Side - Timer */}
        <div className="w-full lg:flex-1 lg:max-w-lg">
          <TimerTabs />
          <TimerDisplay progress={progress} />
          {activeTab === 'timer' && <CustomTimerControls />}
          <SubjectInput />
          <TimerControls />
          <TimerStats />
        </div>

        {/* Right Side */}
        <div className='w-full lg:w-auto flex flex-col gap-4 sm:gap-6 mt-4 lg:mt-0'>
          <MotivationalQuote />
          {/* <StudyProgress /> */}
          <StudyProgress onViewSession={(id) => setViewingSessionId(id)} />

          {viewingSessionId && (
            <div>{/* SessionDetailModal yahan aayega */}</div>
          )}
        </div>

      </div>
    </div>
  );
}