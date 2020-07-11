import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Counter from '.';
import { Provider } from 'react-redux';
import configureStore, { store as appStore } from 'store/configureStore';

test('can render with redux with default', () => {
  const { getByLabelText, getByText } = render(
    <Provider store={appStore}>
      <Counter />
    </Provider>
  );
  fireEvent.click(getByText('+'));
  expect(getByLabelText(/count/i)).toHaveTextContent('1');
});

test('can render with redux custom inital state', () => {
  const store = configureStore({ count: 3 });
  const { getByLabelText, getByText } = render(
    <Provider store={store}>
      <Counter />
    </Provider>
  );
  fireEvent.click(getByText('-'));
  expect(getByLabelText(/count/i)).toHaveTextContent('2');
});
