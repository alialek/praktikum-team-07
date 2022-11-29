import React from 'react';
import { Box, Grid } from '@mui/material';
import { welcomeBoxStyles } from '@/components/WelcomeBox/Styles';

interface WelcomeBoxProps {
  children: React.ReactNode | React.ReactNode[];
}

export const WelcomeBox: React.FC<WelcomeBoxProps> = ({ children }) => {
  return (
    <Box sx={welcomeBoxStyles.boxWrapper}>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        {children}
      </Grid>
    </Box>
  );
};
