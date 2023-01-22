import { LeaderboardNewLeaderRequest, LeaderboardRequest } from '@/models/leader.model';
import { api, ApiResponse } from '../client';

export const LeaderBoardService = {
  getAllLeaders(data: LeaderboardRequest): Promise<ApiResponse> {
    return api.post('/leaderboard/atom_dream_team', data);
  },

  addNewLeader(data: LeaderboardNewLeaderRequest): Promise<ApiResponse> {
    return api.post('/leaderboard', data);
  },
};
