// activitySlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface ActivityItem {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'repost';
  user: string;
  message: string;
  time: string;
  read: boolean;
}

interface ActivityState {
  items: ActivityItem[];
}

const activitySlice = createSlice({
  name: 'activity',
  initialState: {
    items: [
      { id: '1', type: 'like', user: 'Anushree Jain', message: 'liked your post', time: '1h ago', read: false },
      { id: '2', type: 'follow', user: 'Ayush Wadhwa', message: 'started following you', time: '3h ago', read: false },
      { id: '3', type: 'comment', user: 'Harshit Kushwah', message: 'commented on your post', time: '5h ago', read: true },
    ],
  } as ActivityState,
  reducers: {
    markRead: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.read = true;
    },
  },
});

export const { markRead } = activitySlice.actions;
export default activitySlice.reducer;