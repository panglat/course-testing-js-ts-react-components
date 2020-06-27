import React from 'react';

import './styles.scss';
import { loadGreeting } from 'api';

const GreetingLoader01: React.FC = () => {
  const [greeting, setGreeting] = React.useState('');
  async function loadGreetingForInput(
    e: React.FormEvent<HTMLFormElement> | any
  ) {
    e.preventDefault();
    const { data } = await loadGreeting(e.target.elements.name.value);
    setGreeting(data.greeting);
  }
  return (
    <form className="greeting-loader01" onSubmit={loadGreetingForInput}>
      <label htmlFor="name">Name</label>
      <input id="name" />
      <button type="submit">Load Greeting</button>
      <div aria-label="greeting">{greeting}</div>
    </form>
  );
};

export default GreetingLoader01;
