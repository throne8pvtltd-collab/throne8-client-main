import { memo } from 'react';
import Link from 'next/link';

export interface TopPost {
  id: string;
  title: string;
  impressions: number;
  likes: number;
  comments: number;
  date: string;
}

interface TopPostsProps {
  posts: TopPost[];
}

const TopPosts = memo(function TopPosts({ posts }: TopPostsProps) {
  return (
    <div className="bg-[#f6ede8]/80 border border-[#e0d8cf] rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-bold text-[#4a3728]">Top Posts</h3>
        <Link href="/posts" className="text-xs font-semibold text-[#4a3728] hover:underline">
          View all →
        </Link>
      </div>
      <div className="space-y-4">
        {posts.map((post, i) => (
          <div
            key={post.id}
            className="flex items-start gap-4 p-3 rounded-xl hover:bg-[#e0d8cf]/40 transition-colors duration-200 cursor-pointer group"
          >
            <div className="w-8 h-8 bg-[#4a3728] text-[#f6ede8] rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0">
              #{i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#4a3728] truncate group-hover:text-[#6b4e3d] transition-colors">
                {post.title}
              </p>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="text-[11px] text-[#4a3728]/60">{post.impressions.toLocaleString()} views</span>
                <span className="text-[11px] text-[#4a3728]/60">{post.likes} likes</span>
                <span className="text-[11px] text-[#4a3728]/60">{post.comments} comments</span>
              </div>
            </div>
            <span className="text-[10px] text-[#4a3728]/40 flex-shrink-0">{post.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

export default TopPosts;