import React from 'react';
import * as api from 'api';

import './styles.scss';
interface GreetingLoader01Props {
  loadGreeting: jest.Mock<
    Promise<{
      data: {
        greeting: string;
      };
    }>
  >;
}

const GreetingLoader01: React.FC<GreetingLoader01Props> = ({
  loadGreeting = api.loadGreeting,
}) => {
  const [greeting, setGreeting] = React.useState('');
  async function loadGreetingForInput(
    e: React.FormEvent<HTMLFormElement> | any
  ) {
    e.preventDefault();
    const value = e.target.elements.name.value as string;
    const { data } = await loadGreeting(value);
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
