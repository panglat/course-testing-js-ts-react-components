import React from 'react';
import './styles.scss';
import FavoriteNumber from 'components/FavoriteNumber';
import A11y from 'components/a11y';
import GreetingLoader01 from 'components/GreetingLoader01';
import HiddenMessage from 'components/HiddenMessage';
import ErrorBoundary from 'components/ErrorBoundary';
import PostEditor01Markups from 'components/PostEditor01Markups';

const App: React.FC = () => {
  return (
    <div className="app">
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
    </div>
  );
};

export default App;
