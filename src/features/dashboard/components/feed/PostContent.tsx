// app/(dashboard)/components/feed/PostContent.tsx
import React from 'react';


const PostContent = ({ post, isDarkMode }: 
  {post: any; isDarkMode: any}
) => {

  return (
    <>
      <p className={`text-base font-medium leading-relaxed mb-6 ${isDarkMode ? 'text-slate-200' : 'text-[#4a3728]'}`}>
        {post.content}
      </p>
      {post.image && (
        <div className="mb-6 rounded-2xl overflow-hidden">
          <img
            src={post.image}
            alt="Post content"
            className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
    </>
  );
};

export default PostContent;