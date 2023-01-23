import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Link } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';
import { BACK_TEXT, BACK_TEXT_ERROR } from '@/сonstants/text';
import { MuiColor } from '@/colors';

interface BackButtonProps {
  color?: MuiColor;
  isNotArrow?: boolean;
}

export const BackButton: React.FC<BackButtonProps> = ({
  color,
  isNotArrow,
}: BackButtonProps) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <Link sx={{ textDecoration: 'none' }} onClick={goBack}>
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
};
