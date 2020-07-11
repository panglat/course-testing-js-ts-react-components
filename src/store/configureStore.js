import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { reducer, initialState } from './reducer';

export default function configureStore(preloadedState = initialState) {
  const store = createStore(reducer, preloadedState, devToolsEnhancer());
  return store;
}

export const store = configureStore();
