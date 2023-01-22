export interface LeaderboardNewLeaderRequest {
  data: object;
  ratingFieldName: string;
  teamName?: string;
}

export interface LeaderboardRequest {
  ratingFieldName: string;
  cursor: number;
  limit: number;
}

export interface Leader {
  score: number;
  avatar?: string;
  user_name: string;
}

export interface LeaderboardData {
  data: Leader;
}

export type LeaderboardDataResponse = LeaderboardData[];
