'use client';
import type { Post } from '@/features/company/type/company.types';
import { ImagePostCard } from './ImagePostCard';
import { DocumentPostCard } from './DocumentPostCard';
import { ArticlePostCard } from './ArticlePostCard';

/**
 * Smart card — delegates rendering to the correct card based on post.type.
 * Add new PostType here as the platform grows.
 */
export function PostCard({ post }: { post: Post }) {
  switch (post.type) {
    case 'image': return <ImagePostCard post={post} />;
    case 'document': return <DocumentPostCard post={post} />;
    case 'article': return <ArticlePostCard post={post} />;
    default: return null;
  }
}
