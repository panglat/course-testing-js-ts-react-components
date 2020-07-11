import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer } from './reducer';

export default function configureStore(preloadedState = {}) {
  const composeEnhancers = composeWithDevTools();
  const store = createStore(reducer, preloadedState, composeEnhancers);
  return store;
}

export const store = createStore(reducer);
