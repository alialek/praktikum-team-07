import React from 'react';
import { Auth } from '@/components/Form/Auth';
import { FormWrapper } from '@/components/FormWrapper';
import { AUTH_TITLE } from '@/сonstants/text';

export const SigninPage = () => (
  <FormWrapper title={AUTH_TITLE}>
    <Auth />
  </FormWrapper>
);
