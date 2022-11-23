import React from 'react';
import { Avatar, TableCell, TableRow } from '@mui/material';
import { LeaderBoardRow } from './types';

interface LeaderBoardTableRowProps {
  rows: LeaderBoardRow[];
}

export const LeaderBoardTableRow: React.FC<LeaderBoardTableRowProps> = ({ rows }) => {
  return (
    <>
      {rows.map((row: LeaderBoardRow) => (
        <TableRow hover key={row.id}>
          <TableCell>
            <Avatar src={row.avatar} alt={row.name}>
              {row.name.charAt(0)}
            </Avatar>
          </TableCell>
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.score}</TableCell>
        </TableRow>
      ))}
    </>
  );
};
