import { INCREMENT, DECREMENT, Actions, State } from './types';

export const initialState: State = {
  count: 0,
};

export function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case INCREMENT:
      return {
        count: state.count + 1,
      };
    case DECREMENT:
      return {
        count: state.count - 1,
      };
    default:
      return state;
  }
}
