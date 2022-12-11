import React from 'react';
import { EndGame } from '@/components/EndGame';
import { WelcomeBox } from '@/components/WelcomeBox';

export const EndGamePage = () => {
  return (
    <WelcomeBox>
      <EndGame />
    </WelcomeBox>
  );
};
