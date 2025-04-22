import React, { useState } from "react";

function PlantCard({ plant, onDelete, onPriceUpdate }) {
  const [isInStock, setIsInStock] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [price, setPrice] = useState(Number(plant.price));

  function handleToggleStock() {
    setIsInStock((prev) => !prev);
  }

  function handlePriceEdit() {
    setIsEditing(true);
  }

  function handlePriceChange(e) {
    setPrice(e.target.value);
  }

  function handlePriceSubmit(e) {
    e.preventDefault();
    const updatedPrice = parseFloat(price);
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: updatedPrice }),
    })
      .then((r) => r.json())
      .then((updatedPlant) => {
        onPriceUpdate(updatedPlant);
        setIsEditing(false);
      });
  }

  function handleDelete() {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "DELETE",
    }).then(() => onDelete(plant.id));
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>

      {isEditing ? (
        <form onSubmit={handlePriceSubmit}>
          <input
            type="number"
            value={price}
            onChange={handlePriceChange}
            step="0.01"
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <p onClick={handlePriceEdit}>Price: ${Number(price).toFixed(2)}</p>
      )}

      <button className="primary" onClick={handleToggleStock}>
        {isInStock ? "In Stock" : "Out of Stock"}
      </button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default PlantCard;
