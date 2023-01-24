import React, { useEffect, useState } from 'react';

import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  Typography,
  Box,
} from '@mui/material';

import { HEAD_ROWS } from './utils';
import {
  PAGE_TITLE,
  ROW_PER_PAGE_OPTIONS,
  DEFAULT_ROW_PER_PAGE,
} from '@/сonstants/leadersPage';

import { LeaderBoardTableHead } from './LeaderBoardTableHead';
import { LeaderBoardTableRow } from './LeaderBoardTableRow';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { showLeadersData } from '@/store/leaders/leaders.slice';
import { getAllLeaders } from '@/store/leaders/leaders.action';

export const LeaderBoard = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROW_PER_PAGE);

  const dispatch = useAppDispatch();
  const { leaders } = useAppSelector(showLeadersData);

  useEffect(() => {
    dispatch(getAllLeaders({ ratingFieldName: 'score', cursor: 0, limit: 10 }));
  }, []);

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };
  return (
    <Box sx={{ py: '40px', px: '50px' }}>
      <Typography color="primary" variant="h1" fontWeight={400} sx={{ pb: 6 }}>
        {PAGE_TITLE}
      </Typography>
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <LeaderBoardTableHead columns={HEAD_ROWS} />
          </TableHead>
          <TableBody>
            <LeaderBoardTableRow rows={leaders} />
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={ROW_PER_PAGE_OPTIONS}
        component="div"
        count={leaders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};
