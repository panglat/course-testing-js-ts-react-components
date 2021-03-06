import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import './styles.scss';
import FavoriteNumber from 'components/FavoriteNumber';
import A11y from 'components/a11y';
import GreetingLoader01 from 'components/GreetingLoader01';
import HiddenMessage from 'components/HiddenMessage';
import ErrorBoundary from 'components/ErrorBoundary';
import PostEditor01Markups from 'components/PostEditor01Markups';
import Main from 'components/Main';
import { store } from 'store/configureStore';
import Counter from 'components/Counter';
import TestUseCounter from 'components/TestUseCounter';
import Modal from 'components/Modal';
import Countdown from 'components/Countdown';
import App2 from 'components/App2';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <FavoriteNumber />
        <A11y />
        <GreetingLoader01 />
        <HiddenMessage>This is a test of HiddenMessage component</HiddenMessage>
        <ErrorBoundary>
          Everything is OK{' '}
          <button
            onClick={() => {
              throw new Error('💣');
            }}
          >
            Throw Error
          </button>
        </ErrorBoundary>
        <PostEditor01Markups user={{ id: 'user-1' }} />
        <Main />
        <Provider store={store}>
          <Counter />
        </Provider>
        <TestUseCounter />
        <Modal>Modal Portal Test</Modal>
        Counter: <Countdown />
      </Router>
      <App2 />
    </>
  );
};

export default App;
