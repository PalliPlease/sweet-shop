import { useEffect, useState } from "react";
import { fetchSweets } from "../api/sweets";

export default function SweetsList() {
  const [sweets, setSweets] = useState([]);

  useEffect(() => {
    fetchSweets().then(setSweets);
  }, []);

  return (
    <div>
      <h2>Available Sweets</h2>

      {sweets.length === 0 && <p>No sweets available</p>}

      {sweets.map((sweet) => (
        <div
          key={sweet.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{sweet.name}</h3>
          <p>Category: {sweet.category}</p>
          <p>Price: ₹{sweet.price}</p>
          <p>Stock: {sweet.stock}</p>

          <button disabled={sweet.stock === 0}>
            {sweet.stock === 0 ? "Out of Stock" : "Buy"}
          </button>
        </div>
      ))}
    </div>
  );
}
