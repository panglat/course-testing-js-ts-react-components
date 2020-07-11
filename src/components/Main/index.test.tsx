import React, { ReactElement } from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Main from '.';

function render(ui: ReactElement, { route = '/', ...renderOptions } = {}) {
  const Wrapper: React.FC = ({ children }) => {
    return <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>;
  };

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

test('main renders about and home and I can navigate to those pages', () => {
  const { getByRole, getByText } = render(<Main />);
  expect(getByRole('heading')).toHaveTextContent(/home/i);
  fireEvent.click(getByText(/about/i));
  expect(getByRole('heading')).toHaveTextContent(/about/i);
});

test('landing on a bad page shows no match component', () => {
  const { getByRole } = render(<Main />, {
    route: '/something-that-does-not-match',
  });
  expect(getByRole('heading')).toHaveTextContent(/404/i);
});
