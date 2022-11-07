import React from 'react'
import { Link } from 'react-router-dom'
import { ForumPagePath, ProfilePagePath, SigninPagePath } from '@/router/paths'

export const HomePage: React.FC = () => {
  return (
    <>
      <div>Home page</div>
      <Link to={ProfilePagePath.path}>Profile</Link>
      <Link to={ForumPagePath.path}>Forum</Link>
      <Link to={SigninPagePath.path}>SignIn</Link>
    </>
  );
};
