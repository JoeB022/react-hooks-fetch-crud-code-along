import React, { useState } from "react";

function ItemForm({ onAddItem }) {  // Use lowercase "onAddItem" for the prop
  const [name, setName] = useState("");  // State for item name
  const [category, setCategory] = useState("Produce");  // State for item category

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();  // Prevent the default form submission behavior

    const itemData = {  // Define the item data to be sent in the POST request
      name: name,
      category: category,
      IsInCart: false,  // Default to false, indicating the item is not in the cart
    };

    // Make the POST request to the server
    fetch("http://localhost:4000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",  // Ensure the body is sent as JSON
      },
      body: JSON.stringify(itemData),  // Convert the itemData object to a JSON string
    })
      .then((r) => r.json())  // Parse the response as JSON
      .then((newItem) => onAddItem(newItem)); // Use the correctly named prop here

    // Clear the form fields after submission
    setName("");
    setCategory("Produce");
  }

  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}  // Update the name state on input change
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}  // Update the category state on change
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;