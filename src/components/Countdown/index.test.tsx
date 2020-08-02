import React from 'react';
import { render, act } from '@testing-library/react';
import Countdown from '.';

let spy: jest.SpyInstance;

beforeAll(() => {
  spy = jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  spy.mockRestore();
});

afterEach(() => {
  jest.clearAllMocks();
  jest.useRealTimers();
});

test('does not attempt to set state when unmounted (to prevent memory leaks)', () => {
  jest.useFakeTimers();
  const { unmount } = render(<Countdown />);
  unmount();
  act(() => {
    jest.runOnlyPendingTimers();
  });
  expect(console.error).not.toHaveBeenCalled();
});
