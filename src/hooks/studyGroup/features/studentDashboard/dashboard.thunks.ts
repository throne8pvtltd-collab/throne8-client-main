import { createAsyncThunk } from '@reduxjs/toolkit';
import StudyGroupService from '@/lib/api/studyGroup.service';


export const fetchUserDashboardThunk = createAsyncThunk(
  'studyDashboard/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const result = await StudyGroupService.getUserDashboard();
      return result;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchStudyStatisticsThunk = createAsyncThunk(
  'studyDashboard/fetchStatistics',
  async (period: '7days' | '30days' | '90days' = '7days', { rejectWithValue }) => {
    try {
      return await StudyGroupService.getStudyStatistics(period);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch statistics');
    }
  }
);

export const fetchPerformanceAnalyticsThunk = createAsyncThunk(
  'studyDashboard/fetchAnalytics',
  async (_, { rejectWithValue }) => {
    try {
      return await StudyGroupService.getPerformanceAnalytics();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch analytics');
    }
  }
);

export const fetchMyGroupsThunk = createAsyncThunk(
  'studyDashboard/fetchMyGroups',
  async (_, { rejectWithValue }) => {
    try {
      return await StudyGroupService.getMyGroups();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch groups');
    }
  }
);
