import { useEffect, useState } from "react";
import { apiRequest } from "../api";

export default function Sweets() {
  const [sweets, setSweets] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  async function loadSweets() {
    const res = await apiRequest("/sweets");
    const data = await res.json();
    setSweets(data);
  }

  async function purchaseSweet(sweetId) {
    const res = await apiRequest("/orders", {
      method: "POST",
      body: JSON.stringify({
        sweet_id: sweetId,
        quantity: 1,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      alert(data.detail || "Purchase failed");
      return;
    }

    alert("Purchase successful!");
    loadSweets();
  }

  useEffect(() => {
    loadSweets();
  }, []);

  const filtered = sweets.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "" || s.category === category)
  );

  const categories = [...new Set(sweets.map((s) => s.category))];

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 10 }}>🍬 Sweets</h2>
  
      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 20,
          flexWrap: "wrap",
        }}
      >
        <input
          placeholder="Search sweets"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: 200 }}
        />
  
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ minWidth: 180 }}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
  
      {filtered.length === 0 && <p>No sweets available.</p>}
  
      {/* Sweet Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 16,
        }}
      >
        {filtered.map((sweet) => (
          <div
            key={sweet.id}
            style={{
              background: "white",
              padding: 16,
              borderRadius: 12,
              boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <h3 style={{ margin: 0 }}>{sweet.name}</h3>
  
            <span style={{ fontSize: 14, color: "#666" }}>
              {sweet.category}
            </span>
  
            <strong style={{ fontSize: 18 }}>₹{sweet.price}</strong>
  
            <span style={{ fontSize: 14 }}>
              Stock: {sweet.stock}
            </span>
  
            <button
              disabled={sweet.stock === 0}
              onClick={() => purchaseSweet(sweet.id)}
              style={{ marginTop: "auto" }}
            >
              {sweet.stock === 0 ? "Out of stock" : "Buy"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
  
}
