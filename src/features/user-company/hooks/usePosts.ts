'use client';
import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/core/store/store.hooks';
import { setPostFilter } from '@/features/company/store/slices/uiSlice';
import type { PostFilter, Post, PostType, DocumentFileType } from '@/features/company/type/company.types';

export interface FilterOption {
  id: PostFilter;
  label: string;
  count: number;
}

// ✅ Yeh function add karo — API shape → UI shape
function mapApiPostToPost(p: any): Post {
  const hasImage = p.media?.length > 0;
  const hasDocument = p.documents?.length > 0;

  const author = {
    name: `${p.author.firstName} ${p.author.lastName}`,
    role: p.company.name,
    initials: `${p.author.firstName[0]}${p.author.lastName[0]}`,
    avatarUrl: p.company.logo,
  };

  const base = {
    id: p._id,
    author,
    caption: p.content,
    publishedAt: p.publishedAt ?? p.scheduledFor ?? p.createdAt,
    likes: p.engagementMetrics.likesCount,
    comments: p.engagementMetrics.commentsCount,
    shares: p.engagementMetrics.sharesCount,
    tags: p.tags ?? [],
  };

  if (hasImage) {
    return {
      ...base,
      type: 'image',
      imageUrl: p.media[0].url,
      altText: p.title,
    };
  }

  if (hasDocument) {
    const doc = p.documents[0];
    return {
      ...base,
      type: 'document',
      title: p.title,
      fileType: (doc.type?.toLowerCase() ?? 'pdf') as DocumentFileType,
      fileSize: doc.size ? `${(doc.size / 1024).toFixed(1)} KB` : '',
      downloadUrl: doc.url,
    };
  }

  // Default → article
  return {
    ...base,
    type: 'article',
    title: p.title,
    excerpt: p.content,
    readTime: '2 min read',
    articleUrl: `/posts/${p.slug}`,
    category: p.type ?? 'General',
  };
}

export function usePosts() {
  const dispatch = useAppDispatch();
  const rawPosts = useAppSelector((s) => (s.company as any).apiPosts ?? []);
  console.log('📦 rawPosts from Redux:', rawPosts); // Debug log
  const activeFilter = useAppSelector((s) => s.ui.activePostFilter);

  const posts = useMemo<Post[]>(
    () => rawPosts.map(mapApiPostToPost),
    [rawPosts]
  );

  const counts = useMemo(() => ({
    all: posts.length,
    image: posts.filter((p) => p.type === 'image').length,
    document: posts.filter((p) => p.type === 'document').length,
    article: posts.filter((p) => p.type === 'article').length,
  }), [posts]);

  const filterOptions: FilterOption[] = [
    { id: 'all', label: 'All', count: counts.all },
    { id: 'image', label: 'Images', count: counts.image },
    { id: 'document', label: 'Documents', count: counts.document },
    { id: 'article', label: 'Articles', count: counts.article },
  ];

  const filtered = useMemo<Post[]>(() =>
    activeFilter === 'all'
      ? posts
      : posts.filter((p) => p.type === (activeFilter as PostType)),
    [posts, activeFilter],
  );

  const sorted = useMemo(() =>
    [...filtered].sort((a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    ),
    [filtered],
  );

  const onFilterChange = useCallback(
    (f: PostFilter) => dispatch(setPostFilter(f)),
    [dispatch]
  );

  return { posts: sorted, activeFilter, filterOptions, onFilterChange };
}