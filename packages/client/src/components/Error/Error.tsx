import React from 'react';
import { Box, Grid } from '@mui/material';
import { BackButton } from '../BackButton';

interface ErrorProps {
  image: string;
  text?: string;
}

export const Error = ({ image }: ErrorProps) => (
  <Grid
    justifyContent="center"
    alignItems="center"
    container
    spacing={0}
    direction="column"
  >
    <Box>
      <img src={image} style={{ marginBottom: '2rem' }} alt="Server Error" />
    </Box>
    <Grid
      justifyContent="center"
      alignItems="center"
      container
      spacing={0}
      direction="column"
    >
      <BackButton color="primary" isNotArrow={true} />
    </Grid>
  </Grid>
);
