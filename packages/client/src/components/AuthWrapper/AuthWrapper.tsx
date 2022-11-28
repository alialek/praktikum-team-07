import React from 'react';
import { Typography, Card, Box } from '@mui/material';
import { authWrapperStyles } from '@/components/AuthWrapper/Styles';

interface AuthWrapperProps {
  title: string;
  children: React.ReactNode | React.ReactNode[];
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ title, children }) => {
  return (
    <Box sx={authWrapperStyles.boxWrapper}>
      <Card sx={authWrapperStyles.card}>
        <Typography variant="h5" sx={authWrapperStyles.title}>
          {title}
        </Typography>
        {children}
      </Card>
    </Box>
  );
};
