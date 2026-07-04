// app/(dashboard)/components/feed/CommentItem.tsx
import React from 'react';
import CommentMenuDropdown from './CommentMenuDropdown';

const CommentItem = ({
  comment,
  isDarkMode,
  openCommentMenuIndex,
  editingCommentId,
  editCommentText,
  setEditCommentText,
  handleCommentReaction,
  toggleCommentMenu,
  handleCommentAction,
  handleEditSubmit,
  handleReply,
  setReplyingTo,
  profileImage,
}: {
  comment: any;
  isDarkMode: any;
  openCommentMenuIndex: any;
  editingCommentId: any;
  editCommentText: any;
  setEditCommentText: any;
  handleCommentReaction: any;
  toggleCommentMenu: any;
  handleCommentAction: any;
  handleEditSubmit: any;
  handleReply: any;
  setReplyingTo: any;
  profileImage: any;
}) => {
  return (
    <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-slate-700/30' : 'bg-[#e0d8cf]/30'}`}>
      <div className="flex items-start gap-3 mb-3">
        <img
          src={comment.avatar}
          alt={comment.user}
          className="w-10 h-10 rounded-xl object-cover border-2 border-[#6b5643]"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <p className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-[#4a3728]'}`}>
                {comment.user}
              </p>
              <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-[#4a3728]/60'}`}>
                {comment.time}
              </span>
            </div>

            <div className="relative comment-menu">
              <button
                onClick={() => toggleCommentMenu(comment.commentId || comment.id)}
                className={`p-1 rounded-lg transition-all ${isDarkMode ? 'hover:bg-slate-600' : 'hover:bg-[#e0d8cf]'}`}
              >
                <span className="text-lg">⋯</span>
              </button>

              {openCommentMenuIndex === comment.id && (
                <CommentMenuDropdown
                  isDarkMode={isDarkMode}
                  comment={comment}
                  handleCommentAction={handleCommentAction}
                />
              )}
            </div>
          </div>

          {editingCommentId === comment.id ? (
            <div className="mb-3">
              <input
                type="text"
                value={editCommentText}
                onChange={(e) => setEditCommentText(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#6b5643] ${isDarkMode ? 'bg-slate-600 border-slate-500 text-white' : 'bg-white border-[#4a3728]/30 text-[#4a3728]'
                  }`}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleEditSubmit(comment.id);
                }}
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEditSubmit(comment.id)}
                  className="px-3 py-1 bg-[#6b5643] text-white rounded-lg text-xs font-semibold"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    // parent se state reset karne ke liye
                    // yeh parent component mein handle karna padega
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold ${isDarkMode ? 'bg-slate-600 text-white' : 'bg-[#e0d8cf] text-[#4a3728]'
                    }`}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className={`text-sm mb-3 ${isDarkMode ? 'text-slate-300' : 'text-[#4a3728]/80'}`}>
              {comment.content || comment.text}
            </p>
          )}

          <div className="flex items-center gap-4 mb-2">
            {['❤️', '👍', '😂', '🔥', '👏'].map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleCommentReaction(comment.id, emoji)}
                className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-all ${comment.reactions?.[emoji]
                  ? isDarkMode
                    ? 'bg-slate-600'
                    : 'bg-[#e0d8cf]'
                  : isDarkMode
                    ? 'hover:bg-slate-600'
                    : 'hover:bg-[#e0d8cf]'
                  }`}
              >
                <span className="text-sm">{emoji}</span>
                {comment.reactions?.[emoji] && (
                  <span className={`text-xs font-semibold ${isDarkMode ? 'text-slate-300' : 'text-[#4a3728]'}`}>
                    {comment.reactions?.[emoji]}
                  </span>
                )}
              </button>
            ))}
            <button
              onClick={() => handleReply(comment.id)}
              className={`text-xs font-semibold ml-2 ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-[#4a3728]/60 hover:text-[#4a3728]'}`}
            >
              Reply
            </button>
          </div>

          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-3 ml-4 space-y-3">
              {comment.replies.map((reply: any) => (
                <div key={reply.id} className={`p-3 rounded-xl ${isDarkMode ? 'bg-slate-800/50' : 'bg-white/50'}`}>
                  <div className="flex items-start gap-2">
                    <img
                      src={reply.avatar}
                      alt={reply.user}
                      className="w-8 h-8 rounded-lg object-cover border border-[#6b5643]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-[#4a3728]'}`}>
                          {reply.user}
                        </p>
                        <span className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-[#4a3728]/50'}`}>
                          {reply.time}
                        </span>
                      </div>
                      <p className={`text-xs mb-2 ${isDarkMode ? 'text-slate-300' : 'text-[#4a3728]/80'}`}>
                        {reply.text}
                      </p>
                      <div className="flex items-center gap-2">
                        {['❤️', '👍', '😂', '🔥', '👏'].map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => handleCommentReaction(reply.id, emoji)}
                            className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-xs transition-all ${reply.reactions?.[emoji]
                              ? isDarkMode
                                ? 'bg-slate-700'
                                : 'bg-[#e0d8cf]'
                              : isDarkMode
                                ? 'hover:bg-slate-700'
                                : 'hover:bg-[#e0d8cf]'
                              }`}
                          >
                            <span>{emoji}</span>
                            {reply.reactions?.[emoji] && (
                              <span className={`text-xs ${isDarkMode ? 'text-slate-300' : 'text-[#4a3728]'}`}>
                                {reply.reactions?.[emoji]}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;