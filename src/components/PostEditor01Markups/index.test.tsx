import React from 'react';
import { Redirect as mockRedirect } from 'react-router';
import { render, fireEvent, wait } from '@testing-library/react';
import PostEditor01Markups from '.';
import { savePost as mockSavePost } from 'api';

jest.mock('react-router', () => {
  return {
    Redirect: jest.fn(() => null),
  };
});

jest.mock('api');

afterEach(() => jest.clearAllMocks());

test('renders a form with title, content, tags, and a submit button', async () => {
  (mockSavePost as jest.Mock).mockReturnValueOnce(Promise.resolve());
  const fakeUser = { id: 'user-1' };
  const fakePost = {
    title: 'Test Title',
    content: 'Test content',
    tags: ['tag1', 'tag2'],
  };
  const { getByText, getByLabelText } = render(
    <PostEditor01Markups user={fakeUser} />
  );
  (getByLabelText(/title/i) as HTMLInputElement).value = fakePost.title;
  (getByLabelText(/content/i) as HTMLInputElement).value = fakePost.content;
  (getByLabelText(/tags/i) as HTMLInputElement).value = fakePost.tags.join(
    ', '
  );
  const submitButton = getByText(/submit/i);
  fireEvent.click(submitButton);
  expect(submitButton).toBeDisabled();
  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    authorId: fakeUser.id,
  });
  expect(mockSavePost).toHaveBeenCalledTimes(1);
  await wait(() => expect(mockRedirect).toHaveBeenCalledWith({ to: '/' }, {}));
});
