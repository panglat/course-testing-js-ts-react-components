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
  const { getByLabelText, getByText, findByText } = render(<App2 />);

  fireEvent.click(getByText(/fill.*form/i));

  fireEvent.change(getByLabelText(/food/i), {
    target: { value: testData.food },
  });
  fireEvent.click(getByText(/next/i));

  fireEvent.change(getByLabelText(/drink/i), {
    target: { value: testData.drink },
  });
  fireEvent.click(getByText(/review/i));

  expect(getByLabelText(/food/i)).toHaveTextContent(testData.food);
  expect(getByLabelText(/drink/i)).toHaveTextContent(testData.drink);

  fireEvent.click(getByText(/confirm/i, { selector: 'button' }));

  expect(mockSubmitForm).toHaveBeenCalledWith(testData);
  expect(mockSubmitForm).toHaveBeenCalledTimes(1);

  fireEvent.click(await findByText(/home/i));

  expect(getByText(/welcome home/i)).toBeInTheDocument();
});
