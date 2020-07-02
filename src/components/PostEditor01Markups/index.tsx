import React, { useState } from 'react';
import { savePost } from 'api';
import { Redirect } from 'react-router';

import './styles.scss';

type props = {
  user: { id: string };
};
const PostEditor01Markups: React.FC<props> = ({ user }) => {
  interface elements {
    title: HTMLInputElement;
    content: HTMLInputElement;
    tags: HTMLInputElement;
  }
  const [isSaving, setIsSaving] = useState(false);
  const [redirect, setRedirect] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSaving(true);
    const { title, content, tags } = ((e.target as HTMLFormElement)
      .elements as unknown) as elements;
    savePost({
      title: title.value,
      content: content.value,
      tags: tags.value.split(',').map((t) => t.trim()),
      authorId: user.id,
    }).then(() => setRedirect(true));
  }
  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <form className="post-editor01-markups" onSubmit={handleSubmit}>
      <label htmlFor="title-input">Title</label>
      <input id="title-input" name="title" />
      <label htmlFor="content-input">Content</label>
      <textarea id="content-input" name="content" />
      <label htmlFor="tags-input">Tags</label>
      <input id="tags-input" name="tags" />
      <button type="submit" disabled={isSaving}>
        Submit
      </button>
    </form>
  );
};

export default PostEditor01Markups;
