import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { Greeting } from 'models/Greeting';

import GreetingLoader from '.';

/*
import { loadGreeting as mockLoadGreeting } from 'api';

jest.mock('api');

test('loads greetings on click', async () => {
  const mockLoadGreeting = jest.fn();
  const testGreeting = 'TEXT_GREETING';
  (mockLoadGreeting as jest.Mock<Promise<Greeting>>).mockResolvedValueOnce({
    data: { greeting: testGreeting },
  });
  const { getByLabelText, getByText } = render(<GreetingLoader />);
  const nameInput = getByLabelText(/name/i) as HTMLInputElement;
  const loadButton = getByText(/load/i);
  nameInput.value = 'Mary';
  fireEvent.click(loadButton);
  expect(mockLoadGreeting).toHaveBeenCalledWith('Mary');
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1);
  await wait(() =>
    expect(getByLabelText(/greeting/i)).toHaveTextContent(testGreeting)
  );
});
*/

test('loads greetings on click', async () => {
  const mockLoadGreeting = jest.fn<Promise<Greeting>, any>();
  const testGreeting = 'TEXT_GREETING';
  mockLoadGreeting.mockResolvedValueOnce({ data: { greeting: testGreeting } });
  const { getByLabelText, getByText } = render(
    <GreetingLoader loadGreeting={mockLoadGreeting} />
  );
  const nameInput = getByLabelText(/name/i) as HTMLInputElement;
  const loadButton = getByText(/load/i);
  nameInput.value = 'Mary';
  fireEvent.click(loadButton);
  expect(mockLoadGreeting).toHaveBeenCalledWith('Mary');
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1);
  await wait(() =>
    expect(getByLabelText(/greeting/i)).toHaveTextContent(testGreeting)
  );
});
