import React, { useState } from "react";

import "./styles.scss";

interface FavoriteNumberProps {
  min?: number;
  max?: number;
}

const FavoriteNumber: React.FC<FavoriteNumberProps> = ({
  min = 1,
  max = 9,
}) => {
  const [number, setNumber] = useState(0);
  const [numberEntered, setNumberEntered] = useState(false);

  const handleChange = (event: any) => {
    setNumber(Number(event.target.value));
    setNumberEntered(true);
  };

  const isValid = numberEntered && number >= min && number <= max;

  return (
    <div className="favorite-number">
      <label htmlFor="favorite-number">Favorite Number</label>
      <input
        id="favorite-number"
        type="number"
        value={number}
        onChange={handleChange}
      />
      {!isValid && <div role="alert">The number is invalid</div>}
    </div>
  );
};

export default FavoriteNumber;
