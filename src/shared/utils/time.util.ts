// src/profile/utils/timeUtils.ts

export const calculateTimeAgo = (createdAt: string): string => {
  const now = new Date();
  const postTime = new Date(createdAt);
  const diffMs = now.getTime() - postTime.getTime();

  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMs / 3600000);
  const days = Math.floor(diffMs / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return postTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};





// /**
//  * Calculate time ago from timestamp
//  * @param timestamp - ISO timestamp string
//  * @returns Human readable time ago string
//  */
// export const getTimeAgo = (timestamp: string): string => {
//     const now = new Date();
//     const past = new Date(timestamp);
//     const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

//     if (diffInSeconds < 60) {
//         return 'just now';
//     }

//     const diffInMinutes = Math.floor(diffInSeconds / 60);
//     if (diffInMinutes < 60) {
//         return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
//     }

//     const diffInHours = Math.floor(diffInMinutes / 60);
//     if (diffInHours < 24) {
//         return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
//     }

//     const diffInDays = Math.floor(diffInHours / 24);
//     if (diffInDays < 30) {
//         return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
//     }

//     const diffInMonths = Math.floor(diffInDays / 30);
//     if (diffInMonths < 12) {
//         return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
//     }

//     const diffInYears = Math.floor(diffInMonths / 12);
//     return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
// };