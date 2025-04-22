import React from 'react';
import NewPlantForm from './NewPlantForm';
import PlantList from './PlantList';
import Search from './Search';

function PlantPage({ plants, onAddPlant, onSearch, onToggleSoldOut }) {
  function handleDelete(id) {
    // Note: This won't update App's state; consider moving to App.js or passing a callback
    console.warn('handleDelete not implemented in App state');
  }

  function handlePriceUpdate(updatedPlant) {
    // Note: This won't update App's state; consider moving to App.js or passing a callback
    console.warn('handlePriceUpdate not implemented in App state');
  }

  return (
    <main>
      <NewPlantForm onAddPlant={onAddPlant} />
      <Search onSearch={onSearch} />
      <PlantList
        plants={plants}
        onDelete={handleDelete}
        onPriceUpdate={handlePriceUpdate}
        onToggleSoldOut={onToggleSoldOut}
      />
    </main>
  );
}

export default PlantPage;