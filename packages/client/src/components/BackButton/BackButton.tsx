import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';
import { RootPath } from '@/router/paths';
import { BACK_TEXT } from '@/сonstants/text';

export const BackButton = (props: { color?: any }) => (
  <Link to={RootPath.path} style={{ textDecoration: 'none' }}>
    <Button
      variant="text"
      color={props.color ? props.color : 'secondary'}
      startIcon={<ArrowBackIos />}
      style={{ textTransform: 'capitalize' }}
    >
      {BACK_TEXT}
    </Button>
  </Link>
);
