import { Typography, Card, Box } from '@mui/material';
import { ReactNode } from 'react';
import { formWrapperStyles } from '@/components/FormWrapper/Styles';

type Props = {
  title: string;
  children: ReactNode;
};

export const FormWrapper = ({ title, children }: Props) => {
  return (
    <Box sx={formWrapperStyles.boxWrapper}>
      <Card sx={formWrapperStyles.card}>
        <Typography variant="h5" sx={formWrapperStyles.title}>
          {title}
        </Typography>
        {children}
      </Card>
    </Box>
  );
};
