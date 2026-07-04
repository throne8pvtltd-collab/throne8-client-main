'use client';

import { memo } from 'react';

type Post = {
  id: string; // important for stable keys
  title: string;
  views?: number | null;
  engagementRate?: number | null;
};

type Props = {
  posts: Post[] | null;
};

function TopPosts({ posts }: Props) {
  const safePosts = Array.isArray(posts) ? posts : [];

  if (!safePosts.length) {
    return (
      <div className="bg-[#f6ede8]/80 border border-[#e0d8cf] rounded-2xl p-6 shadow-sm text-sm text-[#4a3728]/60 text-center">
        No top posts available
      </div>
    );
  }

  return (
    <div className="bg-[#f6ede8]/80 border border-[#e0d8cf] rounded-2xl p-6 shadow-sm">
      <h3 className="text-base font-bold text-[#4a3728] mb-4">
        Top Performing Posts
      </h3>

      <div className="space-y-4">
        {safePosts.map((post) => {
          const safeViews = Number(post.views ?? 0);
          const safeEngagement = Number(post.engagementRate ?? 0);

          return (
            <div
              key={post.id}
              className="flex items-center justify-between border-b border-[#e0d8cf] pb-3 last:border-none"
            >
              <div>
                <p className="text-sm font-medium text-[#4a3728]">
                  {post.title}
                </p>
                <p className="text-xs text-[#4a3728]/60 mt-1">
                  {safeViews.toLocaleString()} views
                </p>
              </div>

              <div
                className={`text-xs font-semibold ${
                  safeEngagement >= 0
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {safeEngagement >= 0 ? '+' : ''}
                {safeEngagement}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default memo(TopPosts);