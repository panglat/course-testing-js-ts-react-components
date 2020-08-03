import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { submitForm as mockSubmitForm } from 'api';
import App2 from '.';

jest.mock('api');

test('Can fill out a form across multiple page', async () => {
  (mockSubmitForm as jest.Mock).mockReturnValueOnce(
    Promise.resolve({ success: true })
  );
  const testData = { food: 'test food', drink: 'test drink' };
  const { findByLabelText, findByText } = render(<App2 />);

  fireEvent.click(await findByText(/fill.*form/i));

  fireEvent.change(await findByLabelText(/food/i), {
    target: { value: testData.food },
  });
  fireEvent.click(await findByText(/next/i));

  fireEvent.change(await findByLabelText(/drink/i), {
    target: { value: testData.drink },
  });
  fireEvent.click(await findByText(/review/i));

  expect(await findByLabelText(/food/i)).toHaveTextContent(testData.food);
  expect(await findByLabelText(/drink/i)).toHaveTextContent(testData.drink);

  fireEvent.click(await findByText(/confirm/i, { selector: 'button' }));

  expect(mockSubmitForm).toHaveBeenCalledWith(testData);
  expect(mockSubmitForm).toHaveBeenCalledTimes(1);

  fireEvent.click(await findByText(/home/i));

  expect(await findByText(/welcome home/i)).toBeInTheDocument();
});
