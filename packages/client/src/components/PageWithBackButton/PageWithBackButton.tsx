import React from 'react';
import { Box, Paper, SxProps, Theme } from '@mui/material';
import { BackButton } from '@/components/BackButton';

interface PageWithBackButtonProps {
  children: React.ReactNode | React.ReactNode[];
  paperSxProps?: SxProps<Theme>;
}

export const PageWithBackButton: React.FC<PageWithBackButtonProps> = ({
  children,
  paperSxProps,
}) => {
  return (
    <Box>
      <BackButton />
      <Paper
        sx={{
          borderRadius: '10px',
          mt: '37px',
          ...paperSxProps,
        }}
      >
        {children}
      </Paper>
    </Box>
  );
};
