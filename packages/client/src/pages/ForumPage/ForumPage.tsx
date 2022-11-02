import React from 'react'
import { Link } from 'react-router-dom'
import { RootPath } from '@/router/paths'

export const ForumPage = () => {
  return (
    <>
      <div>ForumPage</div>
      <Link to={RootPath.path}>Home</Link>
    </>
  )
}
