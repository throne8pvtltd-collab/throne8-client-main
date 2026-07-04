// analyticsSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface AnalyticsState {
  profileViews: number;
  postImpressions: number;
  searchAppearances: number;
}

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState: {
    profileViews: 426,
    postImpressions: 999,
    searchAppearances: 98,
  } as AnalyticsState,
  reducers: {},
});

export default analyticsSlice.reducer;