// app/(dashboard)/components/sidebar/StatsCards.tsx
import React from 'react';

interface StatsCardsProps {
  isDarkMode: boolean;
}

const StatsCards: React.FC<StatsCardsProps> = ({ isDarkMode }) => {
  return (
    <div className={`grid grid-cols-2 gap-3 mb-4 ${isDarkMode ? 'bg-slate-700/30' : 'bg-white/40'} p-4 rounded-2xl`}>

      {/* Profile Views */}
      <div className={`flex flex-col items-center justify-center gap-1 p-3 rounded-xl ${isDarkMode ? 'bg-slate-600/30' : 'bg-[#e0d8cf]/50'}`}>
        <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-slate-600/50' : 'bg-[#e0d8cf]/80'}`}>
          <i className="ri-eye-line text-lg text-[#6b5643]"></i>
        </div>
        <p className={`text-xs font-medium text-center ${isDarkMode ? 'text-slate-400' : 'text-[#4a3728]/70'}`}>
          Profile Views
        </p>
        <div className="flex items-center gap-1">
          <p className="text-base font-black bg-gradient-to-r from-[#6b5643] to-[#8b7355] bg-clip-text text-transparent">
            2.4K
          </p>
          <span className={`text-xs font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
            +12%
          </span>
        </div>
      </div>

      {/* Post Impressions */}
      <div className={`flex flex-col items-center justify-center gap-1 p-3 rounded-xl ${isDarkMode ? 'bg-slate-600/30' : 'bg-[#e0d8cf]/50'}`}>
        <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-slate-600/50' : 'bg-[#e0d8cf]/80'}`}>
          <i className="ri-line-chart-line text-lg text-[#6b5643]"></i>
        </div>
        <p className={`text-xs font-medium text-center ${isDarkMode ? 'text-slate-400' : 'text-[#4a3728]/70'}`}>
          Impressions
        </p>
        <div className="flex items-center gap-1">
          <p className="text-base font-black bg-gradient-to-r from-[#8b7355] to-[#6b5643] bg-clip-text text-transparent">
            8.9K
          </p>
          <span className={`text-xs font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
            +18%
          </span>
        </div>
      </div>

    </div>
  );
};

export default StatsCards;