// app/(dashboard)/components/sidebar/TrendingNow.tsx
import React from 'react';

interface TrendingNowProps {
  isDarkMode: boolean;
}

const TrendingNow: React.FC<TrendingNowProps> = ({ isDarkMode }) => {
  const trends = [
    { topic: '#TechInnovation', posts: '12.5K posts' },
    { topic: '#DesignThinking', posts: '8.3K posts' },
    { topic: '#StartupLife', posts: '15.7K posts' },
  ];

  return (
    <div
      className={`p-6 rounded-3xl shadow-2xl backdrop-blur-xl border transition-all duration-500 hover:scale-105 ${
        isDarkMode ? 'bg-slate-800/60 border-slate-700/50' : 'bg-[#f6ede8]/95 border-[#4a3728]/20]'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-[#4a3728]'}`}>
          Trending Now
        </h4>
        <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full animate-pulse">
          LIVE
        </span>
      </div>

      <div className="space-y-4">
        {trends.map((trend, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer ${
              isDarkMode ? 'hover:bg-slate-700/30' : 'hover:bg-[#e0d8cf]/50'
            }`}
          >
            <p className="font-bold bg-gradient-to-r from-[#6b5643] to-[#8b7355] bg-clip-text text-transparent">
              {trend.topic}
            </p>
            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-[#4a3728]/60'}`}>
              {trend.posts}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingNow;