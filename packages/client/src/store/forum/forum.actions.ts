import { createAsyncThunk } from '@reduxjs/toolkit';
import { ForumService } from '@/api/services/forum';
import { ThreadService } from '@/api/services/thread';
import {
  CreateForumModel,
  CreateMessageModel,
  CreateThreadModel,
} from '@/models/forum.model';
import { MessageService } from '@/api/services/message';

export const getForums = createAsyncThunk('forum/getForums', async (_, thunkApi) => {
  try {
    const { data } = await ForumService.getAll();

    return data;
  } catch (e) {
    const hasErrResponse = (e as { response: { [key: string]: string } }).response;

    if (!hasErrResponse) {
      throw e;
    }

    return thunkApi.rejectWithValue(hasErrResponse);
  }
});

export const getForumById = createAsyncThunk(
  'forum/getForumById',
  async (payload: number, thunkApi) => {
    try {
      const { data } = await ForumService.getById(payload);

      return data;
    } catch (e) {
      const hasErrResponse = (e as { response: { [key: string]: string } }).response;

      if (!hasErrResponse) {
        throw e;
      }

      return thunkApi.rejectWithValue(hasErrResponse);
    }
  },
);

export const createForum = createAsyncThunk(
  'forum/createForum',
  async (payload: CreateForumModel, thunkApi) => {
    try {
      const { data } = await ForumService.create(payload);

      return data;
    } catch (e) {
      const hasErrResponse = (e as { response: { [key: string]: string } }).response;

      if (!hasErrResponse) {
        throw e;
      }

      return thunkApi.rejectWithValue(hasErrResponse);
    }
  },
);

export const getThreadById = createAsyncThunk(
  'forum/getThreadById',
  async (payload: number, thunkApi) => {
    try {
      const { data } = await ThreadService.getById(payload);

      return data;
    } catch (e) {
      const hasErrResponse = (e as { response: { [key: string]: string } }).response;

      if (!hasErrResponse) {
        throw e;
      }

      return thunkApi.rejectWithValue(hasErrResponse);
    }
  },
);

export const createThread = createAsyncThunk(
  'forum/createThread',
  async (payload: CreateThreadModel, thunkApi) => {
    try {
      const { data } = await ThreadService.create(payload);

      return data;
    } catch (e) {
      const hasErrResponse = (e as { response: { [key: string]: string } }).response;

      if (!hasErrResponse) {
        throw e;
      }

      return thunkApi.rejectWithValue(hasErrResponse);
    }
  },
);

export const createMessage = createAsyncThunk(
  'forum/createMessage',
  async (payload: CreateMessageModel, thunkApi) => {
    try {
      const { data } = await MessageService.create(payload);

      return data;
    } catch (e) {
      const hasErrResponse = (e as { response: { [key: string]: string } }).response;

      if (!hasErrResponse) {
        throw e;
      }

      return thunkApi.rejectWithValue(hasErrResponse);
    }
  },
);
