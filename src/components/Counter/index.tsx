import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCount } from 'store/selectors';
import { IncrementCounter, DecrementCounter } from 'store/actions';

import './styles.scss';

const Counter: React.FC = () => {
  const dispatch = useDispatch();
  const count = useSelector(getCount);
  const increment = () => dispatch(IncrementCounter());
  const decrement = () => dispatch(DecrementCounter());
  return (
    <div className="counter">
      <h2>Counter</h2>
      <div>
        <button onClick={decrement}>-</button>
        <span aria-label="count">{count}</span>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
};

export default Counter;
