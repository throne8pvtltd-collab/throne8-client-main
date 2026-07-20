// src/features/profile/components/feed/PostActions.tsx
import React, { useState } from 'react';
import RepostMenuDropdown from './RepostMenuDropdown';

interface PostActionsProps {
  post: any;
  index: any;
  isDarkMode: any;
  likedPosts: any;
  handleLike: any;
  openRepostIndex: any;
  toggleRepostMenu: any;
  handleRepost: any;
  toggleComments: any;
  onOpenWithPerspectiveModal?: any;
  handleRepostInstant?: any;
}

const PostActions = ({ post, index, isDarkMode, likedPosts, handleLike, openRepostIndex, toggleRepostMenu, handleRepost, toggleComments, onOpenWithPerspectiveModal, handleRepostInstant }: PostActionsProps) => {
  const postKey = post.entryId || post.postId;
  const isLiked = (typeof likedPosts?.[postKey] === 'object' ? likedPosts[postKey]?.isLiked : likedPosts?.[postKey]) ?? post.isLikedByCurrentUser ?? false;

  const [hasReposted, setHasReposted] = useState(false);
  const [isReposting, setIsReposting] = useState(false);
  const [shareCount, setShareCount] = useState(post.shares || 0);

  const likeCount = (post.likesCount || post.likes || 0)
    + (isLiked && !post.isLikedByCurrentUser ? 1 : 0)
    + (!isLiked && post.isLikedByCurrentUser ? -1 : 0);

  const handleShare = async () => {
    try {
      const postUrl = `${window.location.origin}/post/${postKey}`;
      await navigator.clipboard.writeText(postUrl);
      setShareCount((prev: number) => prev + 1);
      alert('Post link copied! Share it anywhere.');
    } catch (err) {
      console.error('Failed to share post:', err);
      alert('Failed to copy link');
    }
  };

  return (
    <div className="flex items-center justify-between pt-4 border-t border-opacity-20 border-[#4a3728]">
      <div className="flex items-center space-x-6">

        <button
          className={`flex items-center space-x-2 ${isLiked ? 'text-red-500' : 'text-[#4a3728]'}`}
          onClick={() => handleLike?.(postKey)}
        >
          <i className={`ri-heart-${isLiked ? 'fill' : 'line'} text-xl`}></i>
          <span className="font-semibold">{likeCount}</span>
        </button>

        <button
          className="flex items-center text-[#4a3728] space-x-2"
          onClick={() => toggleComments(postKey)}
        >
          <i className="ri-message-3-line text-xl"></i>
          <span className="font-semibold">{post.commentsCount || post.comments || 0}</span>
        </button>

        <button
          className="flex items-center text-[#4a3728] space-x-2"
          onClick={handleShare}
        >
          <i className="ri-share-forward-line text-xl"></i>
          <span className="font-semibold">{shareCount}</span>
        </button>
      </div>

      <div className="relative repost-menu">
        <button
          onClick={() => toggleRepostMenu(index)}
          disabled={isReposting}
          className={`p-2 rounded-xl transition-all duration-300 ${hasReposted
              ? 'text-green-600'
              : isDarkMode ? 'hover:bg-slate-700 text-white' : 'hover:bg-[#e0d8cf]/50 text-[#4a3728]'
            }`}
        >
          <i className={`ri-repeat-${hasReposted ? 'fill' : 'line'} text-xl`}></i>
        </button>
        {openRepostIndex === index && (
          <RepostMenuDropdown
            isDarkMode={isDarkMode}
            index={index}
            post={post}
            onOpenWithPerspectiveModal={onOpenWithPerspectiveModal}
            onRepostInstant={(idx: any) => {
              handleRepostInstant(idx);
              toggleRepostMenu(idx);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PostActions;