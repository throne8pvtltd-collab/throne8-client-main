// app/(dashboard)/components/feed/PostContent.tsx
import React, { useState } from 'react';

const CONTENT_LIMIT = 220;

const PostContent = ({ post, isDarkMode }: { post: any; isDarkMode: boolean }) => {
  const [expanded, setExpanded] = useState(false);
  const content: string = post.content || '';
  const isLong = content.length > CONTENT_LIMIT;
  const displayText = expanded || !isLong ? content : content.slice(0, CONTENT_LIMIT) + '...';

  return (
    <>
      <p className={`text-base font-medium leading-relaxed mb-2 whitespace-pre-wrap ${isDarkMode ? 'text-slate-200' : 'text-[#4a3728]'}`}>
        {displayText}
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded(v => !v)}
          className={`text-sm font-semibold mb-4 ${isDarkMode ? 'text-slate-300 hover:text-white' : 'text-[#6b5643] hover:text-[#4a3728]'}`}
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
      {post.image && (
        <div className="mb-6 rounded-2xl overflow-hidden bg-black/5 flex justify-center">
          <img
            src={post.image}
            alt="Post content"
            className="max-h-[420px] w-full object-contain hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
      )}
    </>
  );
};

export default PostContent;