// app/(dashboard)/components/feed/EmojiPicker.tsx
import React from 'react';

const EmojiPicker = ({ isDarkMode, emojiList, handleEmojiClick, setShowEmojiPicker }: { isDarkMode: boolean; emojiList: string[]; handleEmojiClick: (emoji: string) => void; setShowEmojiPicker: (show: boolean) => void }) => {

  return (
    <div
      className={`absolute bottom-full left-0 mb-2 w-72 p-3 rounded-2xl shadow-2xl border z-50 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-[#4a3728]/20'
        }`}
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-[#4a3728]'}`}>
          Pick an emoji
        </h4>
        <button
          onClick={() => setShowEmojiPicker(false)}
          className={`p-1 rounded-lg ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-[#e0d8cf]'}`}
        >
          <i className="ri-close-line"></i>
        </button>
      </div>

      <div className="grid grid-cols-8 gap-2 max-h-48 overflow-y-auto">
        {emojiList.map((emoji, idx) => (
          <button
            key={idx}
            onClick={() => handleEmojiClick(emoji)}
            className={`text-2xl p-2 rounded-lg transition-all ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-[#e0d8cf]'}`}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmojiPicker;