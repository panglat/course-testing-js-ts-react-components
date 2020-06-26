import React from 'react';
import './styles.scss';
import FavoriteNumber from 'components/FavoriteNumber';
import A11y from 'components/a11y';

const App: React.FC = () => {
  return (
    <div className="app">
      <FavoriteNumber />
      <A11y />
    </div>
  );
};

export default App;
