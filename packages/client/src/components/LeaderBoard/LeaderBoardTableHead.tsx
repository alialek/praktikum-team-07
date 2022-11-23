import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { LeaderBoardColumn } from './types';

interface LeaderBoardTableHeadProps {
  columns: LeaderBoardColumn[];
}

export const LeaderBoardTableHead: React.FC<LeaderBoardTableHeadProps> = ({
  columns,
}) => {
  return (
    <TableRow>
      {columns.map((column: LeaderBoardColumn) => (
        <TableCell
          key={column.id}
          align={column.align}
          style={{ minWidth: column.minWidth }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
};
