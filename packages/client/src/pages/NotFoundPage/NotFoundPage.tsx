import React from 'react';
import { Error } from '@/components/Error';
import notFoundImage from '../../assets/images/Error_404.png';
import { ErrorLayout } from '@/components/Error/ErrorLayout/ErrorLayout';

export const NotFoundPage = () => {
  return (
    <ErrorLayout>
      <Error image={notFoundImage} />
    </ErrorLayout>
  );
};
