import React from 'react';
import { TableCell, TableRow } from '@mui/material';

export interface Column {
  id: 'avatar' | 'name' | 'score';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
}

interface LeaderBoardTableHeadProps {
  columns: Column[];
}

export const LeaderBoardTableHead: React.FC<LeaderBoardTableHeadProps> = ({
  columns,
}) => {
  return (
    <>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{ minWidth: column.minWidth }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </>
  );
};
