import { useState } from "react";
import { apiRequest } from "../api";

export default function Admin() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  async function addSweet() {
    const res = await apiRequest("/sweets/", {
      method: "POST",
      body: JSON.stringify({
        name,
        price: Number(price),
        stock: Number(stock),
      }),
    });

    if (res.ok) alert("Sweet added");
    else alert("Admin only!");
  }

  return (
    <div>
      <h2>Admin Panel</h2>
      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Price" onChange={e => setPrice(e.target.value)} />
      <input placeholder="Stock" onChange={e => setStock(e.target.value)} />
      <button onClick={addSweet}>Add Sweet</button>
    </div>
  );
}
