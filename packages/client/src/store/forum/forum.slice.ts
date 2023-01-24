import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import {
  getForums,
  getForumById,
  createForum,
  getThreadById,
  createThread,
  createMessage,
} from './forum.actions';
import { ForumModel, ThreadModel } from '@/models/forum.model';

interface ForumState {
  forums: ForumModel[];
  forum: ForumModel | null;
  thread: ThreadModel | null;
  loading: boolean;
  error: string;
}

const initialState: ForumState = {
  forums: [],
  forum: null,
  thread: null,
  loading: false,
  error: '',
};

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getForums.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getForums.fulfilled, (state, action) => {
      state.loading = false;
      state.forums = action.payload;
    });
    builder.addCase(getForums.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(getForumById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getForumById.fulfilled, (state, action) => {
      state.loading = false;
      state.forum = action.payload;
    });
    builder.addCase(getForumById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(createForum.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createForum.fulfilled, (state, action) => {
      state.loading = false;
      state.forums.push(action.payload);
    });
    builder.addCase(createForum.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(getThreadById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getThreadById.fulfilled, (state, action) => {
      state.loading = false;
      state.thread = action.payload;
    });
    builder.addCase(getThreadById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(createThread.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createThread.fulfilled, (state, action) => {
      state.loading = false;
      state.forum?.threads?.push(action.payload);
    });
    builder.addCase(createThread.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(createMessage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createMessage.fulfilled, (state, action) => {
      state.loading = false;
      state.thread?.messages?.push(action.payload);
    });
    builder.addCase(createMessage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

const { reducer } = forumSlice;

export const showUserData = (state: RootState) => state.forum;
export default reducer;
