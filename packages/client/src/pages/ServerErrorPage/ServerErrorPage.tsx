import React from 'react';
import { Error } from '@/components/Error';
import serverErrorImage from '../../assets/images/Error_500.png';
import { ErrorLayout } from '@/components/Error/ErrorLayout/ErrorLayout';

export const ServerErrorPage = () => {
  return (
    <ErrorLayout>
      <Error image={serverErrorImage} />
    </ErrorLayout>
  );
};
