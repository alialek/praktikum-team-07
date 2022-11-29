import React from 'react';
import { Box } from '@mui/material';
import { Error } from '@/components/Error';
import serverErrorImage from '../../assets/images/Error_500.png';

export const ServerErrorPage = () => (
  <Box sx={{ p: 4, background: 'white' }}>
    <Error image={serverErrorImage} />
  </Box>
);
