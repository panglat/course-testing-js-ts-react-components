import React from 'react';
import { render } from '@testing-library/react';
import ErrorBoundary from '.';
import { reportError as mockReportError } from 'api';

jest.mock('api');

//beforeEach(() => const mockReportError2 =
afterEach(() => jest.clearAllMocks());

function Bomb({ shouldThrown }: { shouldThrown?: boolean }) {
  if (shouldThrown) {
    throw new Error('💣');
  } else {
    return <>Everything is OK</>;
  }
}

test('calls reportError and renders that there was a problem', () => {
  (mockReportError as jest.Mock).mockResolvedValueOnce({ success: true });
  const { rerender } = render(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>
  );

  rerender(
    <ErrorBoundary>
      <Bomb shouldThrown />
    </ErrorBoundary>
  );

  const error = expect.any(Error);
  const info = { componentStack: expect.stringContaining('Bomb') };
  expect(mockReportError).toHaveBeenCalledWith(error, info);
  expect(mockReportError).toHaveBeenCalledTimes(1);
});
