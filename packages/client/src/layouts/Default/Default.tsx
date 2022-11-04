import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import { Header } from '@/components/Header';

export const Default: React.FC = () => (
  <React.Fragment>
    <Header />
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <main>
        <Outlet />
      </main>
    </Container>
  </React.Fragment>
);
