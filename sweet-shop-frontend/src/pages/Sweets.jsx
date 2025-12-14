import { useEffect, useState } from "react";
import { apiRequest } from "../api";
import { getToken } from "../auth";

export default function Sweets() {
  const [sweets, setSweets] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadSweets() {
    setLoading(true);
    try {
      const res = await apiRequest("/sweets");
      const data = await res.json();
      setSweets(data);
    } catch (e) {
      console.error("Failed to load sweets", e);
    } finally {
      setLoading(false);
    }
  }

  async function purchaseSweet(sweetId) {
    if (!confirm("Confirm purchase?")) return;

    // Fix: Using the correct endpoint /sweets/{id}/purchase
    const res = await apiRequest(`/sweets/${sweetId}/purchase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        quantity: 1,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      alert(data.detail || "Purchase failed");
      return;
    }

    const data = await res.json();
    alert("Purchase successful! " + (data.message || ""));
    loadSweets(); // Refresh stock
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
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>🍬 Our Sweets</h2>
        <div style={styles.filters}>
          <input
            placeholder="Search sweets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.input}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.select}
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
  
      {loading ? (
        <div style={styles.loading}>Loading yummy sweets...</div>
      ) : filtered.length === 0 ? (
        <div style={styles.empty}>No sweets found.</div>
      ) : (
        <div style={styles.grid}>
          {filtered.map((sweet) => (
            <div key={sweet.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>{sweet.name}</h3>
                <span style={styles.badge}>{sweet.category}</span>
              </div>
              
              <div style={styles.cardBody}>
                <div style={styles.price}>₹{sweet.price}</div>
                <div style={styles.stock}>
                  {sweet.stock > 0 ? `${sweet.stock} in stock` : "Out of stock"}
                </div>
              </div>

              <button
                disabled={sweet.stock === 0}
                onClick={() => purchaseSweet(sweet.id)}
                style={{
                  ...styles.button,
                  ...(sweet.stock === 0 ? styles.buttonDisabled : {})
                }}
              >
                {sweet.stock === 0 ? "Sold Out" : "Purchase Now"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    paddingBottom: "4rem",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    marginBottom: "2rem",
    alignItems: "center",
  },
  title: {
    fontSize: "2rem",
    color: "#1f2937",
  },
  filters: {
    display: "flex",
    gap: "1rem",
    width: "100%",
    maxWidth: "600px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  input: {
    padding: "0.75rem",
    borderRadius: "0.5rem",
    border: "1px solid #d1d5db",
    flex: "1",
    minWidth: "200px",
    outline: "none",
  },
  select: {
    padding: "0.75rem",
    borderRadius: "0.5rem",
    border: "1px solid #d1d5db",
    minWidth: "150px",
    outline: "none",
    backgroundColor: "white",
  },
  loading: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: "1.2rem",
    marginTop: "4rem",
  },
  empty: {
    textAlign: "center",
    color: "#6b7280",
    marginTop: "4rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "2rem",
  },
  card: {
    background: "white",
    borderRadius: "1rem",
    padding: "1.5rem",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.2s",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "1rem",
  },
  cardTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#111827",
  },
  badge: {
    background: "#e0e7ff",
    color: "#4f46e5",
    padding: "0.25rem 0.75rem",
    borderRadius: "9999px",
    fontSize: "0.75rem",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  cardBody: {
    marginBottom: "1.5rem",
  },
  price: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#111827",
  },
  stock: {
    fontSize: "0.875rem",
    color: "#6b7280",
    marginTop: "0.25rem",
  },
  button: {
    marginTop: "auto",
    padding: "0.75rem",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "0.5rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.2s",
    width: "100%",
  },
  buttonDisabled: {
    background: "#d1d5db",
    cursor: "not-allowed",
  }
};
