import { useEffect, useState } from "react";
import { apiRequest } from "../api";

export default function Admin() {
  const [sweets, setSweets] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  async function loadSweets() {
    const res = await apiRequest("/sweets");
    const data = await res.json();
    setSweets(data);
  }

  async function addSweet(e) {
    e.preventDefault();

    const res = await apiRequest("/sweets", {
      method: "POST",
      body: JSON.stringify({
        name,
        category,
        price: Number(price),
        stock: Number(stock),
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      alert(data.detail || "Failed to add sweet");
      return;
    }

    alert("Sweet added");
    setName("");
    setCategory("");
    setPrice("");
    setStock("");
    loadSweets();
  }

  async function deleteSweet(id) {
    if (!confirm("Delete this sweet?")) return;

    const res = await apiRequest(`/sweets/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Failed to delete");
      return;
    }

    loadSweets();
  }

  useEffect(() => {
    loadSweets();
  }, []);

  return (
    <div
      style={{
        background: "#fff7ed",
        border: "1px solid #fed7aa",
        padding: 20,
        borderRadius: 12,
      }}
    >
      <h2>Admin Panel</h2>

      <form onSubmit={addSweet}>
        <h3>Add Sweet</h3>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />

        <button type="submit">Add Sweet</button>
      </form>

      <hr />

      <h3>All Sweets</h3>
      <ul>
        {sweets.map((s) => (
          <li key={s.id}>
            <b>{s.name}</b> ({s.category}) – ₹{s.price} | Stock: {s.stock}
            <button onClick={() => deleteSweet(s.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
