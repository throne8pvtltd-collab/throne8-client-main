// app/(dashboard)/components/sidebar/RecentPosts.tsx
import React from 'react';
import { useRouter } from 'next/navigation';

interface RecentPostsProps {
  isDarkMode: boolean;
  userPosts: any[];
}

const RecentPosts: React.FC<RecentPostsProps> = ({ isDarkMode, userPosts }) => {
  const router = useRouter();
  const sortedPosts = [...userPosts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const goToActivity = () => {
    router.push('/profile#activity-section');
  };

  return (
    <>
      <h4 className={`text-lg font-black mb-4 ${isDarkMode ? 'text-white' : 'text-[#4a3728]'}`}>
        Your Recent Posts
      </h4>
      <div className="space-y-3">
        {
          sortedPosts.slice(0, 3).map((post) => (
            <div
              key={post.postId}
              onClick={goToActivity}
              className={`rounded-xl p-3 border transition-all duration-300 hover:scale-105 cursor-pointer ${isDarkMode ? 'bg-slate-700/60 border-slate-600/60' : 'bg-white/60 border-[#4a3728]/20]'
                }`}
            >
              <div className="flex gap-3">
                <img
                  src={post.images?.[0]?.cloudinarySecureUrl}
                  onClick={(e) => { e.stopPropagation(); goToActivity(); }}
                  className="w-14 h-14 rounded-lg object-cover cursor-pointer"
                  alt="Post"
                />
                <div className="flex-1">
                  <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-[#4a3728]'}`}>
                    {post.title?.split(' ').slice(0, 4).join(' ')}{post.title?.split(' ').length > 4 ? '...' : ''}
                  </p>
                  <div
                    className={`flex justify-between text-xs mt-2 ${isDarkMode ? 'text-slate-400' : 'text-[#4a3728]/70'
                      }`}
                  >
                    <span>❤️ {post.likesCount}</span>
                    <span>💬 {post.commentsCount}</span>
                    <span>🔁 {post.shares ?? 0}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default RecentPosts;