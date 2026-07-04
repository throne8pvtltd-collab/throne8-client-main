// src/features/company/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import postsReducer from './slices/postsSlice';
import activityReducer from './slices/activitySlice';
import analyticsReducer from './slices/analyticsSlice';
import inboxReducer from './slices/inboxSlice';
import jobsReducer from './slices/jobsslice';
import employeesReducer from './slices/employeesslice';
// console.log('✅ employeesReducer imported:', employeesReducer);
import eventsReducer from './slices/eventSlice';
import companyReducer from './slices/companySlice';

export const store = configureStore({
  reducer: {
    company: companyReducer,
    user: userReducer,
    posts: postsReducer,
    activity: activityReducer,
    analytics: analyticsReducer,
    inbox: inboxReducer,
    jobs: jobsReducer,
    employees: employeesReducer,
    events: eventsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;