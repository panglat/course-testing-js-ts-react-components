import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer } from './reducer';

const composeEnhancers = composeWithDevTools();
export const store = createStore(reducer, composeEnhancers);
