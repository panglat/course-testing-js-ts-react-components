import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PostEditor01Markups from '.';

test('renders a form with title, content, tags, and a submit button', () => {
  const { getByText, getByLabelText } = render(<PostEditor01Markups />);
  getByLabelText(/title/i);
  getByLabelText(/content/i);
  getByLabelText(/tags/i);
  const submitButton = getByText(/submit/i);
  fireEvent.click(submitButton);
  expect(submitButton).toBeDisabled();
});
