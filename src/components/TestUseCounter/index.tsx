import React from 'react';

import './styles.scss';
import useCounter from 'hooks/useCounter';

const TestUseCounter: React.FC = () => {
  const { count, increment, decrement } = useCounter();

  return (
    <div className="test-use-counter">
      TestCounter:
      <button onClick={() => decrement()}>-</button>
      {count}
      <button onClick={() => increment()}>+</button>
    </div>
  );
};

export default TestUseCounter;
