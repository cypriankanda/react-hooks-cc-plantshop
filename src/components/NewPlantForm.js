import React, { useState } from 'react';

function NewPlantForm({ onAddPlant }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const newPlant = {
      name,
      image,
      price, // Send as string to match test
    };

    fetch('http://localhost:6001/plants', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON', // Match test expectation
      },
      body: JSON.stringify(newPlant),
    })
      .then((r) => r.json())
      .then((data) => {
        const sanitizedPlant = {
          ...data,
          id: data.id || Date.now(), // Fallback ID
          price: Number(data.price), // Convert to number for state
          soldOut: false, // Initialize soldOut
        };
        onAddPlant(sanitizedPlant);
        setName('');
        setImage('');
        setPrice('');
      });
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;