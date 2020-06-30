import React, { useState } from 'react';

import './styles.scss';

const PostEditor01Markups: React.FC = () => {
  const [isSaving, setIsSaving] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSaving(true);
  }

  return (
    <form className="post-editor01-markups" onSubmit={handleSubmit}>
      <label htmlFor="title-input">Title</label>
      <input id="title-input" />
      <label htmlFor="content-input">Content</label>
      <textarea id="content-input" />
      <label htmlFor="tags-input">Tags</label>
      <input id="tags-input" />
      <button type="submit" disabled={isSaving}>
        Submit
      </button>
    </form>
  );
};

export default PostEditor01Markups;
