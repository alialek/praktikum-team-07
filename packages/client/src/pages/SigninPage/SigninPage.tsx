import React from 'react';
import { Link } from 'react-router-dom';
import { SignupPagePath } from '@/router/paths';

export const SigninPage: React.FC = () => {
    return (
        <>
            <div>Signin page</div>
            <Link to={SignupPagePath.path}>Sign up</Link>
        </>
    );
};
