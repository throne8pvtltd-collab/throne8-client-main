// app/(dashboard)/components/feed/PostContent.tsx
import React, { useState } from 'react';

const CONTENT_LIMIT = 220;

const PostContent = ({ post, isDarkMode }: { post: any; isDarkMode: boolean }) => {
  const [expanded, setExpanded] = useState(false);
  const content: string = post.content || '';

  // Get lines and filter out empty ones to find the first real line
  const lines = content.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  const firstLine = lines[0] || '';

  const isMultiline = lines.length > 1;
  const isTooLong = content.length > 100;
  const isLong = isMultiline || isTooLong;

  let displayText = content;
  if (!expanded && isLong) {
    if (isMultiline) {
      displayText = firstLine;
    } else {
      displayText = content.slice(0, 100);
    }
  }

  return (
    <>
      <p className={`text-base font-medium leading-relaxed mb-2 whitespace-pre-wrap ${isDarkMode ? 'text-slate-200' : 'text-[#4a3728]'}`}>
        {displayText}
        {!expanded && isLong && ' ...'}
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