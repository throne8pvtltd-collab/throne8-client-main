// src/profile/components/constants.ts

export const ACTIVITY_TABS = ['Posts', 'Comments', 'Videos', 'Images', 'Documents'] as const;

export const EMOJI_LIST = [
    '😀', '😂', '❤️', '👍', '🔥', '👏', '🎉', '💯',
    '🤔', '😍', '🙌', '✨', '💪', '🚀', '⭐', '👀'
];

export const formatPostTime = (createdAt: string): string => {
    if (!createdAt) return 'Recently';

    const now = new Date();
    const created = new Date(createdAt);
    const diffMs = now.getTime() - created.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return created.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};