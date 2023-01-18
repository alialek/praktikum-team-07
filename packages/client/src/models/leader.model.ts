export interface LeaderboardNewLeaderRequest {
  data: object;
  ratingFieldName: string;
  teamName: string;
}

export interface LeaderboardRequest {
  ratingFieldName: string;
  cursor: number;
  limit: number;
}
