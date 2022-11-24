import React from 'react';
import { AuthWrapper } from '@/components/AuthWrapper';
import { REGISTRATION_TITLE } from '@/сonstants/text';
import { Registration } from '@/components/Form/Registration';

export const SignupPage = () => (
  <AuthWrapper title={REGISTRATION_TITLE}>
    <Registration />
  </AuthWrapper>
);
