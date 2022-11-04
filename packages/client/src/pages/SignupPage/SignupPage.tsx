import React from 'react';
import { Link } from 'react-router-dom';
import { SigninPagePath } from '@/router/paths';

export const SignupPage: React.FC = () => {
  return (
    <>
      <div>Signup page</div>
      <Link to={SigninPagePath.path}>Sign in</Link>
    </>
  );
};
