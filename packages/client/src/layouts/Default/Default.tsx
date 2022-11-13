import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import { Header } from '@/components/Header';

export const Default = () => (
  <>
    <Header />
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <main>
        <Outlet />
      </main>
    </Container>
  </>
);
