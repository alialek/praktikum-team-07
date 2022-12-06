import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';
import { RootPath } from '@/router/paths';
import { BACK_TEXT, BACK_TEXT_ERROR } from '@/сonstants/text';
import { MuiColor } from '@/colors';

interface BackButtonProps {
  color?: MuiColor;
  isNotArrow?: boolean;
}

export const BackButton: React.FC<BackButtonProps> = ({
  color,
  isNotArrow,
}: BackButtonProps) => (
  <Link to={RootPath.path} style={{ textDecoration: 'none' }}>
    <Button
      variant="text"
      color={color}
      startIcon={isNotArrow ? '' : <ArrowBackIos />}
      style={{ textTransform: 'none' }}
    >
      {isNotArrow ? BACK_TEXT_ERROR : BACK_TEXT}
    </Button>
  </Link>
);
