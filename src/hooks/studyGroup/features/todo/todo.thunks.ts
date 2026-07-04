//src/hooks/studyGroup/features/todo/todo.thunks.ts

import { createAsyncThunk } from '@reduxjs/toolkit';
import StudyGroupService from '@/lib/api/studyGroup.service';
import type { CreateTaskInput, TaskQueryInput, UpdateTaskInput } from '@/features/study-group/validators/todo.validation';

export const fetchAllTasksThunk = createAsyncThunk(
  'todos/fetchAll',
  async (params: Partial<TaskQueryInput> | undefined, { rejectWithValue }) => {
    try {
      return await StudyGroupService.getAllTasks(params);
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const createTaskThunk = createAsyncThunk(
  'todos/create',
  async (data: CreateTaskInput, { rejectWithValue }) => {
    try {
      return await StudyGroupService.createTask(data);
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const updateTaskThunk = createAsyncThunk(
  'todos/update',
  async ({ taskId, data }: { taskId: string; data: UpdateTaskInput }, { rejectWithValue }) => {
    try {
      return await StudyGroupService.updateTask(taskId, data);
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const deleteTaskThunk = createAsyncThunk(
  'todos/delete',
  async (taskId: string, { rejectWithValue }) => {
    try {
      await StudyGroupService.deleteTask(taskId);
      return taskId;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const markCompleteThunk = createAsyncThunk(
  'todos/markComplete',
  async (taskId: string, { rejectWithValue }) => {
    try {
      return await StudyGroupService.markComplete(taskId);
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const markIncompleteThunk = createAsyncThunk(
  'todos/markIncomplete',
  async (taskId: string, { rejectWithValue }) => {
    try {
      return await StudyGroupService.markIncomplete(taskId);
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchStatsThunk = createAsyncThunk(
  'todos/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      return await StudyGroupService.getStats();
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchUpcomingTasksThunk = createAsyncThunk(
  'todos/fetchUpcoming',
  async (days: number = 7, { rejectWithValue }) => {
    try {
      return await StudyGroupService.getUpcomingTasks(days);
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchOverdueTasksThunk = createAsyncThunk(
  'todos/fetchOverdue',
  async (_, { rejectWithValue }) => {
    try {
      return await StudyGroupService.getOverdueTasks();
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);