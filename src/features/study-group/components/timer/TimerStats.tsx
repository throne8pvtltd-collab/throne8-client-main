'use client';

import { selectTimerStats, selectTodayTotalMinutes } from "@/hooks/studyGroup/features/timer/timerSlice";
import { useAppSelector } from "@/store/hooks";
import { useState, useEffect } from 'react';

export default function TimerStats() {
  const [mounted, setMounted] = useState(false);
  const timerStats = useAppSelector(selectTimerStats);
  const todayMinutes = useAppSelector(selectTodayTotalMinutes) ?? 0;
  const completedSessions = timerStats?.sessionsToday ?? useAppSelector(state => state.timer.completedSessions) ?? 0;
  const totalStudyTime = todayMinutes;
  const streakCount = useAppSelector(state => state.timer.streakCount) ?? 0; // no streak API yet

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-3 sm:mt-4">
        <div className="bg-[#f6ede8]/80 backdrop-blur-md rounded-lg sm:rounded-xl p-2.5 sm:p-3 shadow-lg border border-[#e0d8cf]/50 text-center">
          <div className="text-xl sm:text-2xl font-black text-[#4a3728] mb-0.5">0</div>
          <div className="text-[10px] sm:text-xs text-[#4a3728]/70 font-bold uppercase">Sessions</div>
        </div>
        <div className="bg-[#f6ede8]/80 backdrop-blur-md rounded-lg sm:rounded-xl p-2.5 sm:p-3 shadow-lg border border-[#e0d8cf]/50 text-center">
          <div className="text-xl sm:text-2xl font-black text-[#4a3728] mb-0.5">0</div>
          <div className="text-[10px] sm:text-xs text-[#4a3728]/70 font-bold uppercase">Minutes</div>
        </div>
        <div className="bg-[#f6ede8]/80 backdrop-blur-md rounded-lg sm:rounded-xl p-2.5 sm:p-3 shadow-lg border border-[#e0d8cf]/50 text-center">
          <div className="text-xl sm:text-2xl font-black text-[#4a3728] mb-0.5">0</div>
          <div className="text-[10px] sm:text-xs text-[#4a3728]/70 font-bold uppercase">Streak</div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-3 sm:mt-4">
      <div className="bg-[#f6ede8]/80 backdrop-blur-md rounded-lg sm:rounded-xl p-2.5 sm:p-3 shadow-lg border border-[#e0d8cf]/50 text-center">
        <div className="text-xl sm:text-2xl font-black text-[#4a3728] mb-0.5">{completedSessions}</div>
        <div className="text-[10px] sm:text-xs text-[#4a3728]/70 font-bold uppercase">Sessions</div>
      </div>
      <div className="bg-[#f6ede8]/80 backdrop-blur-md rounded-lg sm:rounded-xl p-2.5 sm:p-3 shadow-lg border border-[#e0d8cf]/50 text-center">
        <div className="text-xl sm:text-2xl font-black text-[#4a3728] mb-0.5">{totalStudyTime}</div>
        <div className="text-[10px] sm:text-xs text-[#4a3728]/70 font-bold uppercase">Minutes</div>
      </div>
      <div className="bg-[#f6ede8]/80 backdrop-blur-md rounded-lg sm:rounded-xl p-2.5 sm:p-3 shadow-lg border border-[#e0d8cf]/50 text-center">
        <div className="text-xl sm:text-2xl font-black text-[#4a3728] mb-0.5">{streakCount}</div>
        <div className="text-[10px] sm:text-xs text-[#4a3728]/70 font-bold uppercase">Streak</div>
      </div>
    </div>
  );
}