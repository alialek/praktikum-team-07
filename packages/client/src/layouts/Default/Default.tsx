import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '@/components/Header'

export const Default: React.FC = () => {
  return (
    <React.Fragment>
      <Header />
        <main>
          <Outlet />
        </main>
    </React.Fragment>
  )
}
