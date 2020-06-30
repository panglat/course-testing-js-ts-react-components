import React from 'react';
import { render, fireEvent, getByRole } from '@testing-library/react';
import ErrorBoundary from '.';
import { reportError as mockReportError } from 'api';

jest.mock('api');

let spy: jest.SpyInstance;
let mockReportErrorTyped: jest.Mock;

beforeEach(() => {
  spy = jest.spyOn(console, 'error').mockImplementation(() => {});
  mockReportErrorTyped = mockReportError as jest.Mock;
});
afterEach(() => jest.clearAllMocks());
afterAll(() => {
  spy.mockRestore();
});

function Bomb({ shouldThrown }: { shouldThrown?: boolean }) {
  if (shouldThrown) {
    throw new Error('💣');
  } else {
    return <>Everything is OK</>;
  }
}

test('calls reportError and renders that there was a problem', () => {
  mockReportErrorTyped.mockResolvedValueOnce({ success: true });
  const { rerender, getByText, getByRole, queryByRole, queryByText } =
    /* render(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>
  );*/
    render(<Bomb />, { wrapper: ErrorBoundary });

  /*
  rerender(
    <ErrorBoundary>
      <Bomb shouldThrown />
    </ErrorBoundary>
  );
*/
  rerender(<Bomb shouldThrown />);

  const error = expect.any(Error);
  const info = { componentStack: expect.stringContaining('Bomb') };
  expect(mockReportErrorTyped).toHaveBeenCalledWith(error, info);
  expect(mockReportErrorTyped).toHaveBeenCalledTimes(1);

  expect(console.error).toHaveBeenCalledTimes(2);

  expect(getByRole('alert').textContent).toMatchInlineSnapshot(
    '"There was a problem."'
  );

  spy.mockClear();
  mockReportErrorTyped.mockClear();

  rerender(<Bomb />);

  fireEvent.click(getByText(/try again/i));

  expect(mockReportErrorTyped).not.toHaveBeenCalled();
  expect(console.error).not.toHaveBeenCalled();
  expect(queryByRole('alert')).not.toBeInTheDocument();
  expect(queryByText(/try again/i)).not.toBeInTheDocument();
});
