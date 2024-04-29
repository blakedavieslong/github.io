import React from "react";

export const Tile = ({name, description}) => {
  

  return (
    <div className="tile-container">
      <p className="tile-tile">{name}</p>
      {Object.entries(description).map(([key, value]) => <p className="tile" key={key}>{value}</p>)}
    </div>
  );
};
