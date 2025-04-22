import React, { useEffect, useState } from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((res) => res.json())
      .then((data) => {
        const sanitized = data.map((plant, index) => ({
          ...plant,
          id: plant.id || index + 1, // Fallback ID
          price: Number(plant.price),
          soldOut: plant.soldOut || false, // Initialize soldOut
        }));
        setPlants(sanitized);
      });
  }, []);

  function handleAddPlant(newPlant) {
    setPlants([...plants, { ...newPlant, soldOut: false }]); // Initialize soldOut
  }

  function handleToggleSoldOut(id) {
    const updated = plants.map((plant) =>
      plant.id === id ? { ...plant, soldOut: !plant.soldOut } : plant
    );
    setPlants(updated);
  }

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <Header />
      <PlantPage
        plants={filteredPlants}
        onAddPlant={handleAddPlant}
        onSearch={setSearchTerm}
        onToggleSoldOut={handleToggleSoldOut}
      />
    </div>
  );
}

export default App;