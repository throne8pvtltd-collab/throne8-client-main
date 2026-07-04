'use client';

import { memo, useCallback, useState } from 'react';
import Image from 'next/image';
import type { Post } from '@/features/company/store/slices/postsSlice';
import UpdatePostModal from '@/features/study-group/modals/UpdatePostModal';
import DeleteConfirmationModal from '@/features/study-group/modals/DeleteConfirmationModal';

const STATUS_COLORS: Record<string, string> = {
  published: 'bg-green-100 text-green-700',
  draft: 'bg-yellow-100 text-yellow-700',
  scheduled: 'bg-blue-100 text-blue-700',
  archived: 'bg-gray-100 text-gray-500',
};

interface Props {
  post: Post;
  onDelete: (id: string) => void;
  onToggleLike: (id: string) => void;
  onUpdate?: (postId: string, updatedData: { title: string; text: string; status: string }) => Promise<void>;
  onPublish?: (postId: string) => Promise<void>;
}

const PostCard = memo(function PostCard({
  post,
  onDelete,
  onToggleLike,
  onUpdate,
  onPublish
}: Props) {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = useCallback(() => setIsDeleteConfirmOpen(true), []);
  const handleCloseDeleteConfirm = useCallback(() => setIsDeleteConfirmOpen(false), []);

  const handleConfirmDelete = useCallback(async () => {
    setIsDeleting(true);
    try {
      await onDelete(post.id);
      setIsDeleteConfirmOpen(false);
    } catch (error) {
      console.error('Failed to delete post:', error);
      setIsDeleting(false);
    }
  }, [post.id, onDelete]);

  const handleToggleLike = useCallback(() => onToggleLike(post.id), [post.id, onToggleLike]);
  const handleUpdateClick = useCallback(() => setIsUpdateModalOpen(true), []);
  const handleCloseUpdateModal = useCallback(() => setIsUpdateModalOpen(false), []);

  const handleUpdatePost = useCallback(
    async (postId: string, updatedData: { title: string; text: string; status: string }) => {
      if (onUpdate) {
        await onUpdate(postId, updatedData);
      }
    },
    [onUpdate]
  );

  return (
    <div className="bg-[#f6ede8]/80 border border-[#e0d8cf] rounded-2xl p-5 shadow-sm
                    hover:shadow-md transition-all duration-200 group">
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">

          {/* Status + Time + Type */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full capitalize
              ${STATUS_COLORS[post.status ?? 'draft']}`}>
              {post.status ?? 'draft'}
            </span>
            {post.type && (
              <span className="text-xs bg-[#4a3728]/10 text-[#4a3728] px-2 py-0.5 rounded-full">
                {post.type}
              </span>
            )}
            <span className="text-xs text-[#4a3728]/50">{post.time}</span>
          </div>

          {/* Title */}
          {post.title && (
            <h3 className="text-sm font-semibold text-[#4a3728] mb-1">{post.title}</h3>
          )}

          {/* Content */}
          {post.text && (
            <p className="text-sm text-[#4a3728]/80 leading-relaxed">{post.text}</p>
          )}

          {/* Images Grid */}
          {post.images && post.images.length > 0 && (
            <div className={`mt-3 grid gap-2 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
              }`}>
              {post.images.slice(0, 4).map((src, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden">
                  <Image src={src} alt="" width={320} height={200}
                    className="w-full h-40 object-cover border border-[#e0d8cf]" />
                  {/* +N overlay */}
                  {i === 3 && post.images!.length > 4 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
                      <span className="text-white font-bold text-xl">
                        +{post.images!.length - 4}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Videos */}
          {post.videos && post.videos.length > 0 && (
            <div className="mt-3 space-y-2">
              {post.videos.map((src, i) => (
                <video key={i} src={src} controls
                  className="w-full rounded-xl border border-[#e0d8cf] max-h-64" />
              ))}
            </div>
          )}

          {/* Documents */}
          {post.documents && post.documents.length > 0 && (
            <div className="mt-3 space-y-2">
              {post.documents.map((doc, i) => (
                <a key={i} href={doc.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-white border border-[#e0d8cf]
                             rounded-xl hover:border-[#4a3728] transition-colors group/doc">
                  <div className="w-9 h-9 bg-[#4a3728]/10 rounded-lg flex items-center
                                  justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#4a3728]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#4a3728] truncate">{doc.name}</p>
                    <p className="text-xs text-[#4a3728]/50">
                      {doc.type}
                      {doc.size ? ` • ${(doc.size / 1024).toFixed(1)} KB` : ''}
                    </p>
                  </div>
                  <svg className="w-4 h-4 text-[#4a3728]/30 group-hover/doc:text-[#4a3728] transition-colors"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          )}

          {/* Poll */}
          {post.hasPoll && post.pollData && (
            <div className="mt-3 bg-white border border-[#e0d8cf] rounded-xl p-4 space-y-3">
              <p className="text-sm font-semibold text-[#4a3728]">
                📊 {post.pollData.question}
              </p>
              <div className="space-y-2">
                {post.pollData.options.map(opt => {
                  const pct = post.pollData!.totalVotes > 0
                    ? Math.round((opt.votes / post.pollData!.totalVotes) * 100)
                    : 0;
                  return (
                    <div key={opt.optionId}>
                      <div className="flex justify-between text-xs text-[#4a3728] mb-1">
                        <span>{opt.text}</span>
                        <span className="font-semibold">{pct}%</span>
                      </div>
                      <div className="w-full bg-[#e0d8cf] rounded-full h-1.5">
                        <div className="bg-[#4a3728] h-1.5 rounded-full transition-all"
                          style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-[#4a3728]/50">
                {post.pollData.totalVotes} votes •{' '}
                {post.pollData.isActive ? '🟢 Active' : '🔴 Ended'}
              </p>
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-1.5 flex-wrap mt-3">
              {post.tags.map(tag => (
                <span key={tag}
                  className="text-xs bg-[#4a3728]/8 text-[#4a3728]/60 px-2 py-0.5 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Author */}
          {post.author && (
            <p className="text-xs text-[#4a3728]/40 mt-2">
              By {post.author.firstName} {post.author.lastName}
            </p>
          )}

          {/* Metrics */}
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#e0d8cf]">
            <button onClick={handleToggleLike}
              className={`flex items-center gap-1.5 transition-all duration-200
                ${post.liked ? 'text-red-500' : 'text-[#4a3728]/50 hover:text-red-400'}`}>
              <svg className="w-4 h-4" fill={post.liked ? 'currentColor' : 'none'}
                stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-xs font-semibold">{post.likes}</span>
            </button>

            <div className="flex items-center gap-1.5 text-[#4a3728]/50">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-xs font-semibold">{post.comments}</span>
            </div>

            <div className="flex items-center gap-1.5 text-[#4a3728]/50">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              <span className="text-xs font-semibold">{post.reposts}</span>
            </div>
          </div>
        </div>

        {/* Hover Actions */}
        <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button onClick={handleUpdateClick}
            className="updatePost-btn p-2 bg-[#e0d8cf] rounded-lg hover:bg-[#4a3728] hover:text-[#f6ede8]
                       transition-all duration-200 text-[#4a3728]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button onClick={handleDelete}
            className="deletePost-btn p-2 bg-[#e0d8cf] rounded-lg hover:bg-red-500 hover:text-white
                       transition-all duration-200 text-[#4a3728]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Update Post Modal */}
      <UpdatePostModal
        isOpen={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        post={post}
        onUpdate={handleUpdatePost}
        onPublish={onPublish}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteConfirmOpen}
        onClose={handleCloseDeleteConfirm}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
        postTitle={post.title}
      />
    </div>
  );
});

export default PostCard;