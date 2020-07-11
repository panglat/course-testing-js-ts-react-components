import React, { ReactElement } from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore';
import { initialState as storeInitialState } from 'store/reducer';

import Counter from '.';

function render(
  ui: ReactElement,
  {
    initialState = storeInitialState,
    store = configureStore(initialState),
    ...rtlOptions
  } = {}
) {
  const Wrapper: React.FC = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };
  return rtlRender(ui, { wrapper: Wrapper, ...rtlOptions });
}

test('can render with redux with default', () => {
  const { getByLabelText, getByText } = render(<Counter />);
  fireEvent.click(getByText('+'));
  expect(getByLabelText(/count/i)).toHaveTextContent('1');
});

test('can render with redux custom initial state', () => {
  const { getByLabelText, getByText } = render(<Counter />, {
    initialState: { count: 3 },
  });
  fireEvent.click(getByText('-'));
  expect(getByLabelText(/count/i)).toHaveTextContent('2');
});
