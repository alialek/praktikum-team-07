import React from 'react';
import { Home } from '@/components/Home';
import { WelcomeBox } from '@/components/WelcomeBox';

export const HomePage = () => {
  return (
    <WelcomeBox>
      <Home />
    </WelcomeBox>
  );
};
