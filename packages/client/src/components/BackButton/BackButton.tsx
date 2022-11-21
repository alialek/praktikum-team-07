import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';
import { RootPath } from '@/router/paths';
import { BACK_TEXT } from '@/сonstants/text';
import { MuiColor } from '@/colors';

interface BackButtonProps {
  color?: MuiColor;
}

export const BackButton: React.FC<BackButtonProps> = ({ color = 'secondary' }) => (
  <Link to={RootPath.path} style={{ textDecoration: 'none' }}>
    <Button
      variant="text"
      color={color}
      startIcon={<ArrowBackIos />}
      style={{ textTransform: 'capitalize' }}
    >
      {BACK_TEXT}
    </Button>
  </Link>
);
