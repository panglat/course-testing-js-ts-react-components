import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Counter from '.';
import { Provider } from 'react-redux';
import { store } from 'store/configureStore';

test('can render with redux with default', () => {
  const { getByLabelText, getByText } = render(
    <Provider store={store}>
      <Counter />
    </Provider>
  );
  fireEvent.click(getByText('+'));
  expect(getByLabelText(/count/i)).toHaveTextContent('1');
});
