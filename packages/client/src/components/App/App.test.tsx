import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';

const appContent = 'Home page';

// @ts-ignore
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve('hey') }));

test('Example test', async () => {
  render(<App />);
  expect(screen.getByText(appContent)).toBeDefined();
});
