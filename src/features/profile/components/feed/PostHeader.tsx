// app/(dashboard)/components/feed/PostHeader.tsx
import React from 'react';
import PostMenuDropdown from './PostMenuDropdown';
import { current } from '@reduxjs/toolkit';

const PostHeader = ({ 
  post, index, isDarkMode, openMenuIndex, togglePostMenu, handlePostAction, currentUserId }:{
    post: any; index: number; isDarkMode: boolean; openMenuIndex: number | null; togglePostMenu: (index: number) => void; handlePostAction: (action: string, index: number) => void; currentUserId: string;
  }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <img
          src={post.avatar}
          alt={post.user}
          className="w-14 h-14 rounded-2xl object-cover border-2 border-[#6b5643]"
        />
        <div>
          <div className="flex items-center gap-3">
            <h4 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-[#4a3728]'}`}>
              {post.user}
            </h4>
            <button
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${isDarkMode
                ? 'bg-slate-700 text-white hover:bg-slate-600 border border-slate-600'
                : 'bg-[#e0d8cf] text-[#4a3728] hover:bg-[#d0c8bf] border border-[#4a3728]/20'
                }`}
            >
              + Connect
            </button>
          </div>
          <p className="text-sm font-semibold bg-gradient-to-r from-[#6b5643] to-[#8b7355] bg-clip-text text-transparent">
            {post.role}
          </p>
          <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-[#4a3728]/60'}`}>
            {post.time}
          </p>
        </div>
      </div>

      <div className="relative post-menu">
        <button
          onClick={() => togglePostMenu(index)}
          className={`p-2 rounded-xl transition-all duration-300 ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-[#e0d8cf]/50'}`}
        >
          <span className="text-xl text-[#4a3728]">⋯</span>
        </button>

        {openMenuIndex === index && (
          <PostMenuDropdown
            isDarkMode={isDarkMode}
            index={index}
            handlePostAction={handlePostAction}
            post={post}        // add karo
            currentUserId={currentUserId}
          />
        )}
      </div>
    </div>
  );
};

export default PostHeader;