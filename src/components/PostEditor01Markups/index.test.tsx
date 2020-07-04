import React from 'react';
import { Redirect as mockRedirect } from 'react-router';
import { render, fireEvent, wait, findByRole } from '@testing-library/react';
import PostEditor01Markups from '.';
import { savePost as mockSavePost } from 'api';
import { build, fake, sequence } from '@jackfranklin/test-data-bot';

jest.mock('react-router', () => {
  return {
    Redirect: jest.fn(() => null),
  };
});

jest.mock('api');

afterEach(() => jest.clearAllMocks());

const userBuilder = build<{ id: string }>('User', {
  fields: {
    id: sequence((s) => `user-${s}`),
  },
});
const postBuilder = build<{ title: string; content: string; tags: string[] }>(
  'Post',
  {
    fields: {
      title: fake((f) => f.lorem.words()),
      content: fake((f) => f.lorem.paragraphs().replace(/\r/g, '')),
      tags: fake((f) => [f.lorem.word(), f.lorem.word(), f.lorem.word()]),
    },
  }
);

const renderEditor = () => {
  const fakeUser = userBuilder();
  const fakePost = postBuilder();
  const utils = render(<PostEditor01Markups user={fakeUser} />);
  (utils.getByLabelText(/title/i) as HTMLInputElement).value = fakePost.title;
  (utils.getByLabelText(/content/i) as HTMLInputElement).value =
    fakePost.content;
  (utils.getByLabelText(
    /tags/i
  ) as HTMLInputElement).value = fakePost.tags.join(', ');
  const submitButton = utils.getByText(/submit/i);

  return {
    ...utils,
    fakeUser,
    fakePost,
    submitButton,
  };
};

test('renders a form with title, content, tags, and a submit button', async () => {
  const preDate = new Date().getTime();
  (mockSavePost as jest.Mock).mockReturnValueOnce(Promise.resolve());
  const { submitButton, fakeUser, fakePost } = renderEditor();
  fireEvent.click(submitButton);
  expect(submitButton).toBeDisabled();
  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    date: expect.any(String),
    authorId: fakeUser.id,
  });
  expect(mockSavePost).toHaveBeenCalledTimes(1);
  const postDate = new Date().getTime();
  const date = new Date(
    (mockSavePost as jest.Mock).mock.calls[0][0].date
  ).getTime();
  expect(date).toBeGreaterThanOrEqual(preDate);
  expect(date).toBeLessThanOrEqual(postDate);
  await wait(() => expect(mockRedirect).toHaveBeenCalledWith({ to: '/' }, {}));
});

test('renders a form with title, content, tags, and a submit button', async () => {
  const testError = 'Test error';
  (mockSavePost as jest.Mock).mockRejectedValueOnce({
    data: { error: testError },
  });

  const { getByText, findByRole } = renderEditor();
  const submitButton = getByText(/submit/i);
  fireEvent.click(submitButton);
  const postError = await findByRole('alert');
  expect(postError).toHaveTextContent(testError);
  expect(submitButton).not.toBeDisabled();
});
