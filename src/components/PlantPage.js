import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then((data) => {
        const sanitized = data.map((plant) => ({
          ...plant,
          price: Number(plant.price),
        }));
        setPlants(sanitized);
      });
  }, []);

  const displayedPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleDelete(id) {
    setPlants(plants.filter((plant) => plant.id !== id));
  }

  function handlePriceUpdate(updatedPlant) {
    updatedPlant.price = Number(updatedPlant.price);
    const updatedList = plants.map((p) =>
      p.id === updatedPlant.id ? updatedPlant : p
    );
    setPlants(updatedList);
  }

  function handleAddPlant(newPlant) {
    newPlant.price = Number(newPlant.price);
    setPlants([...plants, newPlant]);
  }

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search onSearch={setSearch} />
      <PlantList
        plants={displayedPlants}
        onDelete={handleDelete}
        onPriceUpdate={handlePriceUpdate}
      />
    </main>
  );
}

export default PlantPage;
