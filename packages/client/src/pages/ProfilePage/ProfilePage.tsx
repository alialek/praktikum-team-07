import React from 'react'
import { Link } from 'react-router-dom'
import { SigninPagePath } from '@/router/paths'

export const ProfilePage = () => {
  return (
    <>
      <div>ProfilePage</div>
      <Link to={SigninPagePath.path}>Sign out</Link>
    </>
  )
}
