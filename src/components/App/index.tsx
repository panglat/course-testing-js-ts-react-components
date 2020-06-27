import React from 'react';
import './styles.scss';
import FavoriteNumber from 'components/FavoriteNumber';
import A11y from 'components/a11y';
import GreetingLoader01 from 'components/GreetingLoader01';

const App: React.FC = () => {
  return (
    <div className="app">
      <FavoriteNumber />
      <A11y />
      <GreetingLoader01 />
    </div>
  );
};

export default App;
