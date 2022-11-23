import React, { useState } from 'react';

import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  Typography,
  Box,
} from '@mui/material';

import { HEAD_ROWS, BODY_ROWS } from './utils';
import {
  PAGE_TITLE,
  ROW_PER_PAGE_OPTIONS,
  DEFAULT_ROW_PER_PAGE,
} from '@/сonstants/leadersPage';

import { LeaderBoardTableHead } from './LeaderBoardTableHead';
import { LeaderBoardTableRow } from './LeaderBoardTableRow';

export const LeaderBoard = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROW_PER_PAGE);

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
      <Typography color="primary" variant="h2" sx={{ pb: 6 }}>
        {PAGE_TITLE}
      </Typography>
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <LeaderBoardTableHead columns={HEAD_ROWS} />
          </TableHead>
          <TableBody>
            <LeaderBoardTableRow rows={BODY_ROWS} />
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={ROW_PER_PAGE_OPTIONS}
        component="div"
        count={BODY_ROWS.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};
