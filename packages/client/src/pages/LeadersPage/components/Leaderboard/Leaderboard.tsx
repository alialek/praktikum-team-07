import React, { useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Avatar,
  Typography,
  Box,
} from '@mui/material';

import { PAGE_TITLE } from '@/сonstants/leadersPageText';

interface Column {
  id: 'avatar' | 'name' | 'score';
  label: string;
  minWidth?: number;
  align?: 'right';
}

const columns: Column[] = [
  { id: 'avatar', label: 'Аватар' },
  { id: 'name', label: 'Имя игрока' },
  { id: 'score', label: 'Рекорд' },
];

interface User {
  id: number;
  avatar: string;
  name: string;
  score: number;
}

// temporary data
const users: User[] = [
  { id: 1, avatar: '', name: 'Fedor', score: 10000 },
  { id: 2, avatar: '', name: 'Alex', score: 7000 },
  { id: 3, avatar: '', name: 'Andrey', score: 5000 },
];

const usersPerPage = [10, 25, 100];

export const Leaderboard: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Box sx={{ py: '40px', px: '50px' }}>
      <Typography color="primary" variant="h2" sx={{ pb: 6 }}>
        {PAGE_TITLE}
      </Typography>
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
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
          </TableHead>
          <TableBody>
            {users.map((user) => {
              return (
                <TableRow hover key={user.id}>
                  <TableCell>
                    <Avatar src={user.avatar} alt={user.name}>
                      {user.name.charAt(0)}
                    </Avatar>
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.score}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={usersPerPage}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};
