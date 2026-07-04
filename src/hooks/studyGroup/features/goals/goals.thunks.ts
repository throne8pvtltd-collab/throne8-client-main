import { createAsyncThunk } from '@reduxjs/toolkit';
import StudyGroupService from '@/lib/api/studyGroup.service';
// import { CreateGoalInput, UpdateGoalInput } from './goal.schema';
import { api } from '@/lib/api/auth.service';
import { CreateGoalInput, UpdateGoalInput } from '@/features/study-group/validators/goal.validation';

export const fetchAllGoalsThunk = createAsyncThunk(
  'goals/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await StudyGroupService.getAllGoals();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch goals');
    }
  }
);

export const fetchActiveGoalsThunk = createAsyncThunk(
  'goals/fetchActive',
  async (_, { rejectWithValue }) => {
    try {
      return await StudyGroupService.getActiveGoals();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch active goals');
    }
  }
);

export const createGoalThunk = createAsyncThunk(
  'goals/create',
  async (data: CreateGoalInput, { rejectWithValue }) => {
    try {
      return await StudyGroupService.createGoal(data);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to create goal');
    }
  }
);

export const updateGoalThunk = createAsyncThunk(
  'goals/update',
  async ({ goalId, data }: { goalId: string; data: UpdateGoalInput }, { rejectWithValue }) => {
    try {
      return await StudyGroupService.updateGoal(goalId, data);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update goal');
    }
  }
);

export const deleteGoalThunk = createAsyncThunk(
  'goals/delete',
  async (goalId: string, { rejectWithValue }) => {
    try {
      await StudyGroupService.deleteGoal(goalId);
      return goalId;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete goal');
    }
  }
);

export const markGoalCompleteThunk = createAsyncThunk(
  'goals/markComplete',
  async (goalId: string, { rejectWithValue }) => {
    try {
      return await StudyGroupService.markGoalComplete(goalId);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to mark goal complete');
    }
  }
);

export const fetchGoalStatsThunk = createAsyncThunk(
  'goals/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      return await StudyGroupService.getGoalStats();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch goal stats');
    }
  }
);

export const updateGoalProgressThunk = createAsyncThunk(
  'goals/updateProgress',
  async ({ goalId, hoursToAdd }: { goalId: string; hoursToAdd: number }, { rejectWithValue }) => {
    try {
      const data = await StudyGroupService.updateGoalProgress({ goalId, hoursToAdd });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update progress');
    }
  }
);

export const markGoalIncompleteThunk = createAsyncThunk(
  'goals/markIncomplete',
  async (goalId: string, { rejectWithValue }) => {
    try {
      return await StudyGroupService.markGoalIncomplete(goalId);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);