import React from 'react';
import { Avatar, TableCell, TableRow } from '@mui/material';

export interface Row {
  id: number;
  avatar: string;
  name: string;
  score: number;
}

interface LeaderBoardTableRowProps {
  rows: Row[];
}

export const LeaderBoardTableRow: React.FC<LeaderBoardTableRowProps> = ({ rows }) => {
  return (
    <>
      {rows.map((row: Row) => {
        return (
          <TableRow hover key={row.id}>
            <TableCell>
              <Avatar src={row.avatar} alt={row.name}>
                {row.name.charAt(0)}
              </Avatar>
            </TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.score}</TableCell>
          </TableRow>
        );
      })}
    </>
  );
};
