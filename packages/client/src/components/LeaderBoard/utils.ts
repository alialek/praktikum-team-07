import { Column } from './LeaderBoardTableHead';
import { Row } from './LeaderBoardTableRow';

export const HEAD_ROWS: Column[] = [
  { id: 'avatar', label: 'Аватар' },
  { id: 'name', label: 'Имя игрока' },
  { id: 'score', label: 'Рекорд' },
];

export const BODY_ROWS: Row[] = [
  { id: 1, avatar: '', name: 'Fedor', score: 10000 },
  { id: 2, avatar: '', name: 'Alex', score: 7000 },
  { id: 3, avatar: '', name: 'Andrey', score: 5000 },
];
