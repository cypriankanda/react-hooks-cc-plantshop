import React, { useState } from "react";

function PlantCard({ plant, onUpdate, onDelete }) {
  const [inStock, setInStock] = useState(true);
  const [editing, setEditing] = useState(false);
  const [newPrice, setNewPrice] = useState(plant.price);

  const handleStockClick = () => {
    setInStock(!inStock);
  };

  const handlePriceSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ price: parseFloat(newPrice) })
    })
      .then(res => res.json())
      .then(updatedPlant => {
        onUpdate(updatedPlant);
        setEditing(false);
      });
  };

  const handleDelete = () => {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "DELETE"
    }).then(() => onDelete(plant.id));
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: ${plant.price.toFixed(2)}</p>

      <button className={inStock ? "primary" : ""} onClick={handleStockClick}>
        {inStock ? "In Stock" : "Out of Stock"}
      </button>

      {editing ? (
        <form onSubmit={handlePriceSubmit}>
          <input
            type="number"
            step="0.01"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <button onClick={() => setEditing(true)}>Edit Price</button>
      )}

      <button onClick={handleDelete} style={{ backgroundColor: "red", color: "white" }}>
        Delete
      </button>
    </li>
  );
}

export default PlantCard;
