import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';
import { RootPath } from '@/router/paths';
import { BACK_TEXT, BACK_TEXT_ERROR } from '@/сonstants/text';

interface ButtonProps {
  color: any;
  isNotArrow?: boolean;
}

export const BackButton = ({ color, isNotArrow }: ButtonProps) => (
  <Link to={RootPath.path} style={{ textDecoration: 'none' }}>
    <Button
      variant="text"
      color={color || 'secondary'}
      startIcon={isNotArrow ? '' : <ArrowBackIos />}
      style={{ textTransform: 'none' }}
    >
      {isNotArrow ? BACK_TEXT_ERROR : BACK_TEXT}
    </Button>
  </Link>
);
