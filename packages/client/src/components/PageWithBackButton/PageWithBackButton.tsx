import React from 'react';
import { Container, Paper, SxProps, Theme } from '@mui/material';
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
    <Container maxWidth="lg" sx={{ py: 6 }}>
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
    </Container>
  );
};
