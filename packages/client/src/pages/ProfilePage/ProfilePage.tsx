import React from 'react';
import { Box } from '@mui/material';
import { Profile } from '@/components/Form/Profile';
import { profileStyles } from '@/components/Form/Styles';

export const ProfilePage = () => {
  return (
    <Box sx={profileStyles.boxWrapper}>
      <Profile />
    </Box>
  );
};
