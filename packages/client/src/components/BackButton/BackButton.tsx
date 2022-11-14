import React from 'react';
import { Link as LinkBack } from 'react-router-dom';
import { Button, Link } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';
import { BACK_TEXT } from '@/сonstants/text';

export const BackButton = (props:{color: any}) => (
  <Link 
    to="/"
    underline="none"
    component={LinkBack}
  >
    <Button
      variant="text"
      color= {props.color ? props.color : "secondary"}
      startIcon={<ArrowBackIos />}
      style={{ textTransform: 'capitalize'}}
    >
      { BACK_TEXT }
    </Button>
  </Link>
);
