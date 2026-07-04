// app/(dashboard)/components/sidebar/PostAnalyticsButton.tsx
import React from 'react';
import { BarChart2 } from 'lucide-react';

interface PostAnalyticsButtonProps {
  isDarkMode: boolean;
  setIsAnalyticsOpen: (open: boolean) => void;
}

const PostAnalyticsButton: React.FC<PostAnalyticsButtonProps> = ({ isDarkMode, setIsAnalyticsOpen }) => {
  return (
    <button
      onClick={() => setIsAnalyticsOpen(true)}
      className={`w-full flex items-center justify-center gap-2 p-3 rounded-2xl border transition-all duration-300 font-semibold mb-6 ${
        isDarkMode
          ? 'bg-slate-700/40 border-slate-600/40 hover:bg-slate-700/60 text-white'
          : 'bg-white/40 border-[#4a3728]/30 hover:bg-white/60 text-[#4a3728]'
      }`}
    >
      <BarChart2 size={18} />
      Post Analyses
    </button>
  );
};

export default PostAnalyticsButton;