import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, onDelete, onPriceUpdate }) {
  return (
    <ul className="cards">
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          plant={plant}
          onDelete={onDelete}
          onPriceUpdate={onPriceUpdate}
        />
      ))}
    </ul>
  );
}

export default PlantList;
