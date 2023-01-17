import { screen } from '@testing-library/react';

const testId = 'test-root';

// @ts-ignore
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve('hey') }));

/* eslint jest/no-disabled-tests: off */
test.skip('Example test', async () => {
  expect(screen.getByTestId(testId)).toBeDefined();
});
