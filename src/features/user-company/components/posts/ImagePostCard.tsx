'use client';
import Image from 'next/image';
import { PostAuthorRow } from './PostAuthorRow';
import { PostEngagement } from './PostEngagement';
import type { ImagePost } from '@/features/company/type/company.types';

// Aspect ratio → Tailwind padding-bottom trick via style
const ASPECT_HEIGHTS: Record<string, string> = {
  '1:1': '100%',
  '4:3': '75%',
  '16:9': '56.25%',
};

export function ImagePostCard({ post }: { post: ImagePost }) {
  const pbHeight = ASPECT_HEIGHTS[post.aspectRatio ?? '4:3'];

  return (
    <article className="bg-white/60 backdrop-blur-sm rounded-2xl border border-brand-beige/60 shadow-sm overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">

      {/* Image */}
      <div className="relative w-full overflow-hidden" style={{ paddingBottom: pbHeight }}>
        <Image
          src={post.imageUrl}
          alt={post.altText}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/20 transition-colors duration-300" />
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        <PostAuthorRow author={post.author} publishedAt={post.publishedAt} />
        <p className="text-sm text-brand-brown/80 leading-relaxed line-clamp-3">{post.caption}</p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <span key={t} className="text-xs font-medium text-brand-medium">#{t}</span>
            ))}
          </div>
        )}

        <div className="pt-2 border-t border-brand-beige">
          <PostEngagement likes={post.likes} comments={post.comments} shares={post.shares} />
        </div>
      </div>
    </article>
  );
}
