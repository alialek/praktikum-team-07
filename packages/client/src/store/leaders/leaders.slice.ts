import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import { LeaderboardDataResponse } from '@/models/leader.model';
import { getAllLeaders } from './leaders.action';

export interface LeaderState {
  leaders: LeaderboardDataResponse;
  error: string;
  loading: boolean;
}

const initialState: LeaderState = {
  leaders: [] as LeaderboardDataResponse,
  error: '',
  loading: false,
};

export const leadersSlice = createSlice({
  name: 'leaders',
  initialState,
  reducers: {
    fetchLeaders: (state, param) => {
      const { payload } = param;
      state.leaders = { ...payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllLeaders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllLeaders.fulfilled, (state, action) => {
      state.loading = false;
      state.leaders = action.payload;
    });
    builder.addCase(getAllLeaders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

const { actions, reducer } = leadersSlice;

export const showLeadersData = (state: RootState) => state.leaders;
export const { fetchLeaders } = actions;
export default reducer;
