import React from 'react';

function PlantCard({ plant, onDelete, onPriceUpdate, onToggleSoldOut }) {
  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p> {/* Remove .toFixed(2) */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onPriceUpdate({ id: plant.id, price: e.target.price.value });
        }}
      >
        <input type="number" name="price" placeholder="New price" step="0.01" />
        <button type="submit">Update Price</button>
      </form>
      <button onClick={() => onDelete(plant.id)}>Delete</button>
      <button onClick={() => onToggleSoldOut(plant.id)}>
        {plant.soldOut ? 'Out of Stock' : 'In Stock'}
      </button>
    </li>
  );
}

export default PlantCard;