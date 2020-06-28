import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import HiddenMessage from '.';

/*
test('shows hidden message when toggle is clicked', async () => {
  const myMessage = 'hello word';
  const { getByText, queryByText } = render(<HiddenMessage>{myMessage}</HiddenMessage>);
  const toggleButton = getByText(/toggle/i);
  expect(queryByText(myMessage)).not.toBeInTheDocument();
  fireEvent.click(toggleButton);
  expect(getByText(myMessage)).toBeInTheDocument();
  fireEvent.click(toggleButton);
  await wait(() => expect(queryByText(myMessage)).not.toBeInTheDocument());
});
*/

// After mock the test, wait can be removed.
jest.mock('react-transition-group', () => {
  return {
    CSSTransition: (props: any) => (props.in ? props.children : null),
  };
});

test('shows hidden message when toggle is clicked', () => {
  const myMessage = 'hello word';
  const { getByText, queryByText } = render(
    <HiddenMessage>{myMessage}</HiddenMessage>
  );
  const toggleButton = getByText(/toggle/i);
  expect(queryByText(myMessage)).not.toBeInTheDocument();
  fireEvent.click(toggleButton);
  expect(getByText(myMessage)).toBeInTheDocument();
  fireEvent.click(toggleButton);
  expect(queryByText(myMessage)).not.toBeInTheDocument();
});
