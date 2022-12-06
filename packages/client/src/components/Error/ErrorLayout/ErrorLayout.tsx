import React from 'react';
import { Box } from '@mui/material';

interface ErrorLayoutProps {
  children: React.ReactElement;
}

export const ErrorLayout: React.FC<ErrorLayoutProps> = ({ children }) => {
  return <Box sx={{ p: 4, background: 'white' }}>{children}</Box>;
};
