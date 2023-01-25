import React from 'react';
import { Avatar, TableCell, TableRow } from '@mui/material';
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
            <Avatar
              src={row.data.avatar}
              alt={row.data.user_name ? row.data.user_name : 'Anonymous'}
            >
              {row.data.user_name ? row.data.user_name.charAt(0) : 'A'}
            </Avatar>
          </TableCell>
          <TableCell>{row.data.user_name ? row.data.user_name : 'Anonymous'}</TableCell>
          <TableCell>{row.data.score}</TableCell>
        </TableRow>
      ))}
    </>
  );
};
