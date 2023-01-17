// import * as React from 'react';
import { screen } from '@testing-library/react';
// import { App } from './App';

const testId = 'test-root';

// @ts-ignore
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve('hey') }));

/* eslint jest/no-disabled-tests: off */
test.skip('Example test', async () => {
  // render(<App />);
  expect(screen.getByTestId(testId)).toBeDefined();
});
