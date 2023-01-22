import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import { LeaderboardDataResponse } from '@/models/leader.model';

export interface LeaderState {
  leaders: LeaderboardDataResponse;
  error: string;
}

const initialState: LeaderState = {
  leaders: [] as LeaderboardDataResponse,
  error: '',
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
});

const { actions, reducer } = leadersSlice;

export const showLeadersData = (state: RootState) => state.leaders;
export const { fetchLeaders } = actions;
export default reducer;
