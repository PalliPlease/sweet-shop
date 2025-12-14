import { useEffect, useState } from "react";
import { apiRequest } from "../api";

export default function Admin() {
  const [sweets, setSweets] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadSweets() {
    const res = await apiRequest("/sweets");
    const data = await res.json();
    setSweets(data);
  }

  async function addSweet(e) {
    e.preventDefault();
    setLoading(true);

    try {
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

      alert("Sweet added successfully");
      setName("");
      setCategory("");
      setPrice("");
      setStock("");
      loadSweets();
    } finally {
      setLoading(false);
    }
  }

  async function deleteSweet(id) {
    if (!confirm("Are you sure you want to delete this sweet?")) return;

    const res = await apiRequest(`/sweets/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Failed to delete");
      return;
    }

    loadSweets();
  }

  async function restockSweet(id) {
    const qty = prompt("Enter quantity to add:");
    if (!qty || isNaN(qty)) return;

    const res = await apiRequest(`/sweets/${id}/restock?quantity=${qty}`, {
      method: "POST",
    });

    if (!res.ok) {
      const data = await res.json();
      alert(data.detail || "Restock failed");
      return;
    }

    alert("Restocked successfully");
    loadSweets();
  }

  useEffect(() => {
    loadSweets();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Admin Panel</h2>

      <div style={styles.card}>
        <h3 style={styles.subHeader}>Add New Sweet</h3>
        <form onSubmit={addSweet} style={styles.form}>
          <div style={styles.grid}>
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
            <input
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Price (₹)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Initial Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Adding..." : "Add Sweet"}
          </button>
        </form>
      </div>

      <div style={styles.card}>
        <h3 style={styles.subHeader}>Inventory</h3>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Price</th>
                <th style={styles.th}>Stock</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sweets.map((s) => (
                <tr key={s.id} style={styles.tr}>
                  <td style={styles.td}>{s.name}</td>
                  <td style={styles.td}>{s.category}</td>
                  <td style={styles.td}>₹{s.price}</td>
                  <td style={styles.td}>{s.stock}</td>
                  <td style={styles.td}>
                    <div style={styles.actions}>
                      <button 
                        onClick={() => restockSweet(s.id)}
                        style={styles.actionBtn}
                      >
                        Restock
                      </button>
                      <button 
                        onClick={() => deleteSweet(s.id)}
                        style={{...styles.actionBtn, ...styles.deleteBtn}}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    paddingBottom: "4rem",
  },
  header: {
    fontSize: "2rem",
    marginBottom: "2rem",
    color: "#1f2937",
  },
  subHeader: {
    fontSize: "1.25rem",
    marginBottom: "1rem",
    color: "#374151",
    borderBottom: "1px solid #e5e7eb",
    paddingBottom: "0.5rem",
  },
  card: {
    background: "white",
    borderRadius: "0.75rem",
    padding: "1.5rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    marginBottom: "2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1rem",
  },
  input: {
    padding: "0.75rem",
    borderRadius: "0.375rem",
    border: "1px solid #d1d5db",
    width: "100%",
  },
  button: {
    padding: "0.75rem 1.5rem",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "0.375rem",
    fontWeight: "600",
    cursor: "pointer",
    alignSelf: "flex-start",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },
  th: {
    padding: "0.75rem 1rem",
    background: "#f9fafb",
    color: "#6b7280",
    fontWeight: "600",
    fontSize: "0.875rem",
    textTransform: "uppercase",
  },
  td: {
    padding: "1rem",
    borderTop: "1px solid #e5e7eb",
    verticalAlign: "middle",
  },
  tr: {
    // hover effect handled by css if needed, but inline difficult
  },
  actions: {
    display: "flex",
    gap: "0.5rem",
  },
  actionBtn: {
    padding: "0.5rem 0.75rem",
    fontSize: "0.875rem",
    borderRadius: "0.375rem",
    border: "1px solid #e5e7eb",
    background: "white",
    color: "#374151",
    cursor: "pointer",
  },
  deleteBtn: {
    color: "#ef4444",
    borderColor: "#fecaca",
    background: "#fef2f2",
  }
};
