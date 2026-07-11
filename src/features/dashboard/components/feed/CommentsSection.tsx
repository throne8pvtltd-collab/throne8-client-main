// app/(dashboard)/components/feed/CommentsSection.tsx
import React, { useState } from 'react';
import CommentItem from './CommentItem';
import CommentInput from './CommentInput';

interface CommentsSectionProps {
  isDarkMode: any;
  commentText: any;
  setCommentText: any;
  replyingTo: any;
  openCommentMenuIndex: any;
  commentCount: any;
  setReplyingTo: any;
  profileImage: any;
  editingCommentId: any;
  editCommentText: any;
  setEditCommentText: any;
  showEmojiPicker: any;
  setShowEmojiPicker: any;
  handleCommentSubmit: any;
  handleReply: any;
  handleCommentReaction: any;
  toggleCommentMenu: any;
  handleCommentAction: any;
  handleEditSubmit: any;
  handleEmojiClick: any;
  comments: any; // sampleComments ki jagah
  postId: any;
  emojiList: any;
}

const CommentsSection = ({
  isDarkMode,
  commentCount,
  commentText,
  setCommentText,
  replyingTo,
  openCommentMenuIndex,
  setReplyingTo,
  profileImage,
  editingCommentId,
  editCommentText,
  setEditCommentText,
  showEmojiPicker,
  setShowEmojiPicker,
  handleCommentSubmit,
  handleReply,
  handleCommentReaction,
  toggleCommentMenu,
  handleCommentAction,
  handleEditSubmit,
  handleEmojiClick,
  comments = [],
  postId,
  emojiList,
}: CommentsSectionProps) => {
  const [visibleCommentsCount, setVisibleCommentsCount] = useState(3);
  const visibleComments = (comments || []).slice(0, visibleCommentsCount);

  console.log("CommentsSection details:", {
    postId,
    commentsLength: comments.length,
    visibleCommentsCount,
    visibleCommentsLength: visibleComments.length
  });

  return (
    <div className={`mt-6 pt-6 border-t ${isDarkMode ? 'border-slate-700' : 'border-[#4a3728]/20'}`}>
      <div className="space-y-4 mb-6">
        {visibleComments.map((comment: any) => (
          <CommentItem
            key={comment.commentId || comment._id}
            comment={comment}
            isDarkMode={isDarkMode}
            openCommentMenuIndex={openCommentMenuIndex}
            setReplyingTo={setReplyingTo}  // ✅ ADD
            profileImage={profileImage}
            editingCommentId={editingCommentId}
            editCommentText={editCommentText}
            setEditCommentText={setEditCommentText}
            handleCommentReaction={handleCommentReaction}
            toggleCommentMenu={toggleCommentMenu}
            handleCommentAction={handleCommentAction}
            handleEditSubmit={handleEditSubmit}
            handleReply={handleReply}
          />
        ))}
      </div>

      {comments && comments.length > visibleCommentsCount && (
        <button
          onClick={() => setVisibleCommentsCount(prev => prev + 3)}
          className={`text-sm font-semibold mb-6 mt-2 block hover:underline ${
            isDarkMode ? 'text-slate-300 hover:text-white' : 'text-[#6b5643] hover:text-[#4a3728]'
          }`}
        >
          Show More
        </button>
      )}

      <CommentInput
        isDarkMode={isDarkMode}
        commentText={commentText}
        setCommentText={setCommentText}
        replyingTo={replyingTo}
        showEmojiPicker={showEmojiPicker}
        setShowEmojiPicker={setShowEmojiPicker}
        profileImage={profileImage} 
        handleCommentSubmit={handleCommentSubmit}
        handleEmojiClick={handleEmojiClick}
        emojiList={emojiList}
      />
    </div>
  );
};

export default CommentsSection;