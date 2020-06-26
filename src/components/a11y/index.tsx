import React from 'react';

import './styles.scss';

const A11y: React.FC = () => (
  <form className="a11y">
    <label htmlFor="email">Email</label>
    <input id="email" placeholder="email" />
  </form>
);

export default A11y;
