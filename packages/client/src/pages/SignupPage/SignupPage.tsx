import React from 'react';
import { FormWrapper } from '@/components/FormWrapper';
import { REGISTRATION_TITLE } from '@/сonstants/text';
import { Registration } from '@/components/Form/Registration';

export const SignupPage = () => (
  <FormWrapper title={REGISTRATION_TITLE}>
    <Registration />
  </FormWrapper>
);
