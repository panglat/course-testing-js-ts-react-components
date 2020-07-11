import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Main from '.';

test('main renders about and home and I can navigate to those pages', () => {
  const { getByRole, getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <Main />
    </MemoryRouter>
  );
  expect(getByRole('heading')).toHaveTextContent(/home/i);
  fireEvent.click(getByText(/about/i));
  expect(getByRole('heading')).toHaveTextContent(/about/i);
});

test('landing on a bad page shows no match component', () => {
  const { getByRole } = render(
    <MemoryRouter initialEntries={['/something-that-does-not-match']}>
      <Main />
    </MemoryRouter>
  );
  expect(getByRole('heading')).toHaveTextContent(/404/i);
});