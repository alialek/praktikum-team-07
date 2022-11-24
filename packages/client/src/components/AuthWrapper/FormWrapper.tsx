import { Typography, Card, Box } from '@mui/material';
import { ReactNode } from 'react';
import { authWrapperStyles } from '@/components/AuthWrapper/Styles';

type Props = {
  title: string;
  children: ReactNode;
};

export const AuthWrapper = ({ title, children }: Props) => {
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
