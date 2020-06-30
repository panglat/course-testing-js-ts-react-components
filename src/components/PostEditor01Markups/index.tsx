import React from 'react';

import './styles.scss';

const PostEditor01Markups: React.FC = () => (
  <form className="post-editor01-markups">
    <label htmlFor="title-input">Title</label>
    <input id="title-input" />
    <label htmlFor="content-input">Content</label>
    <textarea id="content-input" />
    <label htmlFor="tags-input">Tags</label>
    <input id="tags-input" />
    <button type="submit">Submit</button>
  </form>
);

export default PostEditor01Markups;
