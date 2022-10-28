import React from 'react'
import { Header } from '@/components/Header'
import Container from '@mui/material/Container'

export const Default: React.FC = () => {
  return (
    <React.Fragment>
      <Header />
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <main></main>
      </Container>
    </React.Fragment>
  )
}
