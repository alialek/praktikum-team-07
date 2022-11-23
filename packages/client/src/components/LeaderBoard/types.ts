export interface LeaderBoardColumn {
  id: 'avatar' | 'name' | 'score';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
}

export interface LeaderBoardRow {
  id: number;
  avatar: string;
  name: string;
  score: number;
}
