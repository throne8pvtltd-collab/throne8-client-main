import React from 'react';

interface MyGroupsProps {
  isDarkMode: boolean;
}

const MyGroups: React.FC<MyGroupsProps> = ({ isDarkMode }) => {
  const groups = [
    { name: 'The Squad', members: '5K' },
    { name: 'The A-team', members: '8K' },
    { name: 'Tech 2k25', members: '7K' },
  ];

  return (
    <div className={`p-6 rounded-3xl shadow-2xl backdrop-blur-xl border transition-all duration-500 hover:scale-105 ${isDarkMode ? 'bg-slate-800/60 border-slate-700/50' : 'bg-[#f6ede8]/95 border-[#4a3728]/20'}`}>
      <h4 className={`text-xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-[#4a3728]'}`}>
        My Groups
      </h4>
      <div className="space-y-3">
        {groups.map((community, idx) => (
          <div
            key={idx}
            className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 hover:scale-105 ${isDarkMode ? 'bg-slate-700/30 hover:bg-slate-700/50' : 'bg-[#e0d8cf]/50 hover:bg-[#e0d8cf]/70'}`}
          >
            <div className="flex items-center space-x-3">
              <div>
                <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-[#4a3728]'}`}>
                  {community.name}
                </p>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-[#4a3728]/60'}`}>
                  {community.members} members
                </p>
              </div>
            </div>
            <button className="text-[#6b5643] hover:text-[#4a3728] font-semibold text-sm">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyGroups;