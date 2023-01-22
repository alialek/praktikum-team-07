import { LeaderBoardColumn, LeaderBoardRow } from './types';

export const HEAD_ROWS: LeaderBoardColumn[] = [
  { id: 'avatar', label: 'Аватар' },
  { id: 'name', label: 'Имя игрока' },
  { id: 'score', label: 'Рекорд' },
];

export const BODY_ROWS: LeaderBoardRow[] = [
  { id: 1, avatar: '', display_name: 'Fedor', score: 10000 },
  { id: 2, avatar: '', display_name: 'Alex', score: 7000 },
  { id: 3, avatar: '', display_name: 'Andrey', score: 5000 },
];
