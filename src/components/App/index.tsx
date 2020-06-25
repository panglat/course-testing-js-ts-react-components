import React from "react";
import "./styles.scss";
import FavoriteNumber from "components/FavoriteNumber";

const App: React.FC = () => {
  return (
    <div className="app">
      <FavoriteNumber />
    </div>
  );
};

export default App;
