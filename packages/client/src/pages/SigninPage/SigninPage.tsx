import React from 'react';
import { Auth } from '@/components/Form/Auth';
import { AuthWrapper } from '@/components/AuthWrapper';
import { AUTH_TITLE } from '@/сonstants/text';

export const SigninPage = () => (
  <AuthWrapper title={AUTH_TITLE}>
    <Auth />
  </AuthWrapper>
);
