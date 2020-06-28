import React from 'react';
import './styles.scss';
import FavoriteNumber from 'components/FavoriteNumber';
import A11y from 'components/a11y';
import GreetingLoader01 from 'components/GreetingLoader01';
import HiddenMessage from 'components/HiddenMessage';

const App: React.FC = () => {
  return (
    <div className="app">
      <FavoriteNumber />
      <A11y />
      <GreetingLoader01 />
      <HiddenMessage>This is a test of HiddenMessage component</HiddenMessage>
    </div>
  );
};

export default App;
