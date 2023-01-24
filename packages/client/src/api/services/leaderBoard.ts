import {
  LeaderboardDataResponse,
  LeaderboardNewLeaderRequest,
  LeaderboardRequest,
} from '@/models/leader.model';
import { yandexApi, ApiResponse } from '../client';

export const LeaderBoardService = {
  getAllLeaders(data: LeaderboardRequest): Promise<ApiResponse<LeaderboardDataResponse>> {
    return yandexApi.post('/leaderboard/atom_dream_team', data);
  },

  addNewLeader(data: LeaderboardNewLeaderRequest): Promise<ApiResponse> {
    return yandexApi.post('/leaderboard', data);
  },
};
