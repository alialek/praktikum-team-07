import { createAsyncThunk } from '@reduxjs/toolkit';
import { LeaderBoardService } from '@/api/services/leaderBoard';
import {
  LeaderboardDataResponse,
  LeaderboardNewLeaderRequest,
  LeaderboardRequest,
} from '@/models/leader.model';

export const getAllLeaders = createAsyncThunk<
  LeaderboardDataResponse,
  LeaderboardRequest
>('leaders/all', async (payload: LeaderboardRequest, thunkApi) => {
  try {
    const { data } = await LeaderBoardService.getAllLeaders(payload);
    return data;
  } catch (e) {
    const hasErrResponse = (e as { response: { [key: string]: string } }).response.data;

    if (!hasErrResponse) {
      throw e;
    }

    return thunkApi.rejectWithValue(hasErrResponse);
  }
});

export const addNewLeader = createAsyncThunk(
  'leaders/new',
  async (payload: LeaderboardNewLeaderRequest, thunkApi) => {
    try {
      const { data } = await LeaderBoardService.addNewLeader(payload);
      return data;
    } catch (e) {
      const hasErrResponse = (e as { response: { [key: string]: string } }).response.data;

      if (!hasErrResponse) {
        throw e;
      }

      return thunkApi.rejectWithValue(hasErrResponse);
    }
  },
);
