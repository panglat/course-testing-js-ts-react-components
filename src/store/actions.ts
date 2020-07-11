import { INCREMENT, DECREMENT, Actions } from './types';

export function IncrementCounter(): Actions {
  return {
    type: INCREMENT,
  };
}

export function DecrementCounter(): Actions {
  return {
    type: DECREMENT,
  };
}
