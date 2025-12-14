import { useEffect, useState } from "react";
import { apiRequest } from "../api";

export default function Sweets() {
  const [sweets, setSweets] = useState([]);

  async function loadSweets() {
    const res = await apiRequest("/sweets/");
    const data = await res.json();
    setSweets(data);
  }

  async function buySweet(id) {
    const res = await apiRequest(`/orders/`, {
      method: "POST",
      body: JSON.stringify({ sweet_id: id, quantity: 1 }),
    });

    if (res.ok) {
      loadSweets();
    } else {
      alert("Purchase failed");
    }
  }

  useEffect(() => {
    loadSweets();
  }, []);

  return (
    <div>
      <h2>Sweets</h2>
      {sweets.map(s => (
        <div key={s.id}>
          <b>{s.name}</b> ₹{s.price} | Stock: {s.stock}
          <button disabled={s.stock === 0} onClick={() => buySweet(s.id)}>
            Buy
          </button>
        </div>
      ))}
    </div>
  );
}
