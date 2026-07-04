import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { JobFilters, PostFilter, TabId, UIState } from '../../type/company.types';

const initialState: UIState = {
  activeTab: 'overview',
  followingCompany: false,
  notificationsEnabled: false,
  jobFilters: { department: 'All', location: 'All', type: 'All' },
  searchQuery: '',
  expandedJobId: null,
  statsAnimated: false,
  isHeaderSticky: false,
  activePostFilter: 'all',
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveTab: (s, a: PayloadAction<TabId>) => { s.activeTab = a.payload; },
    toggleFollow: (s) => { s.followingCompany = !s.followingCompany; },
    setFollowStatus: (state, action: PayloadAction<boolean>) => {
      state.followingCompany = action.payload;
    },
    toggleNotifications: (s) => { s.notificationsEnabled = !s.notificationsEnabled; },
    setJobFilter: (s, a: PayloadAction<{ key: keyof JobFilters; value: string }>) => { s.jobFilters[a.payload.key] = a.payload.value; },
    clearJobFilters: (s) => { s.jobFilters = { department: 'All', location: 'All', type: 'All' }; s.searchQuery = ''; },
    setSearchQuery: (s, a: PayloadAction<string>) => { s.searchQuery = a.payload; },
    setExpandedJob: (s, a: PayloadAction<string | null>) => { s.expandedJobId = a.payload; },
    setStatsAnimated: (s) => { s.statsAnimated = true; },
    setHeaderSticky: (s, a: PayloadAction<boolean>) => { s.isHeaderSticky = a.payload; },
    setPostFilter: (s, a: PayloadAction<PostFilter>) => { s.activePostFilter = a.payload; },
  },
});

export const {
  setActiveTab, toggleFollow, setFollowStatus, toggleNotifications,
  setJobFilter, clearJobFilters, setSearchQuery,
  setExpandedJob, setStatsAnimated, setHeaderSticky,
  setPostFilter,
} = uiSlice.actions;

export default uiSlice.reducer;
