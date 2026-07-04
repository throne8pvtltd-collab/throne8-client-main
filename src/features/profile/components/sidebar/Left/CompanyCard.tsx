import React from 'react';

interface CompanyCardProps {
  isDarkMode: boolean;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ isDarkMode }) => {
  return (
    <div className={`rounded-3xl shadow-2xl backdrop-blur-xl border transition-all duration-500 hover:scale-105 overflow-hidden ${isDarkMode ? 'bg-slate-800/60 border-slate-700/50' : 'bg-[#f6ede8]/95 border-[#4a3728]/20'}`}>
      {/* Company Cover Image */}
      <div className="relative h-32 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=200&fit=crop"
          alt="Company Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      {/* Company Logo & Content */}
      <div className="relative px-6 pb-6">
        <div className="flex justify-center -mt-12 mb-4">
          <div className="w-24 h-24 rounded-2xl bg-white shadow-2xl p-3 border-4 border-[#f6ede8]">
            <img
              src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop"
              alt="Company Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="text-center mb-4">
          <h3 className={`text-2xl font-black mb-1 ${isDarkMode ? 'text-white' : 'text-[#4a3728]'}`}>
            TechCorp Solutions
          </h3>
          <p className="text-sm font-semibold bg-gradient-to-r from-[#6b5643] to-[#8b7355] bg-clip-text text-transparent mb-1">
            Innovation & Technology
          </p>
          <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-[#4a3728]/60'}`}>
            📍 San Francisco, CA • Est. 2015
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className={`p-3 rounded-xl text-center ${isDarkMode ? 'bg-slate-700/30' : 'bg-[#e0d8cf]/50'}`}>
            <p className={`text-lg font-black bg-gradient-to-r from-[#6b5643] to-[#8b7355] bg-clip-text text-transparent`}>567</p>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-[#4a3728]/70'}`}>Page Explore</p>
          </div>
          <div className={`p-3 rounded-xl text-center ${isDarkMode ? 'bg-slate-700/30' : 'bg-[#e0d8cf]/50'}`}>
            <p className={`text-lg font-black bg-gradient-to-r from-[#8b7355] to-[#6b5643] bg-clip-text text-transparent`}>5.3k</p>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-[#4a3728]/70'}`}>followers</p>
          </div>
          <div className={`p-3 rounded-xl text-center ${isDarkMode ? 'bg-slate-700/30' : 'bg-[#e0d8cf]/50'}`}>
            <p className={`text-lg font-black bg-gradient-to-r from-[#4a3728] to-[#8b7355] bg-clip-text text-transparent`}>4.8★</p>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-[#4a3728]/70'}`}>Rating</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-gradient-to-r from-[#4a3728] via-[#6b5643] to-[#8b7355] text-white py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
            <span className="relative z-10">Visit Website</span>
          </button>
          <button className={`py-3 rounded-xl font-bold text-sm border-2 transition-all duration-300 hover:scale-105 ${isDarkMode ? 'border-slate-600 text-white hover:bg-slate-700' : 'border-[#4a3728]/30 text-[#4a3728] hover:bg-[#e0d8cf]'}`}>
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;