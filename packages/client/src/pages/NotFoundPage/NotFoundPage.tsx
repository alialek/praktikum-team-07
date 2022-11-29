import React from 'react';
import { Box } from '@mui/material';
import { Error } from '@/components/Error';
import notFoundImage from '../../assets/images/Error_404.png';

export const NotFoundPage = () => (
  <Box sx={{ p: 4, background: 'white' }}>
    <Error image={notFoundImage} />
  </Box>
);
