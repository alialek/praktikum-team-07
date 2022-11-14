import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import { Header } from '@/components/Header';
import { mainStyles } from './Style';

export const Default = () => {
  const theme = useTheme();
  const { mode } = theme.palette;
  return (
    <>
      <Header />
      <Container sx={mode === 'light' ? mainStyles.main : mainStyles.mainDark}>
        <main>
          <Outlet />
        </main>
      </Container>
    </>
  );
};
