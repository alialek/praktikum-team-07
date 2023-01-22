import React from 'react';
import { Avatar, TableCell, TableRow } from '@mui/material';
// import { LeaderBoardRow } from './types';
import { LeaderboardData } from '@/models/leader.model';

interface LeaderBoardTableRowProps {
  rows: LeaderboardData[];
}

export const LeaderBoardTableRow: React.FC<LeaderBoardTableRowProps> = ({ rows }) => {
  return (
    <>
      {rows.map((row: LeaderboardData, index) => (
        <TableRow hover key={index}>
          <TableCell>
            <Avatar src={row.data.avatar} alt={row.data.user_name}>
              {row.data.user_name.charAt(0)}
            </Avatar>
          </TableCell>
          <TableCell>{row.data.user_name}</TableCell>
          <TableCell>{row.data.score}</TableCell>
        </TableRow>
      ))}
    </>
  );
};
