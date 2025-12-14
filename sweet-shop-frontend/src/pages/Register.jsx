import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("https://fastapi-sage-nu.vercel.app/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registered successfully. Please login.");
        navigate("/login");
      } else {
        setError(data.detail || "Register failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleRegister} style={styles.form}>
        <h2 style={styles.title}>Create Account</h2>
        {error && <div style={styles.error}>{error}</div>}
        
        <div style={styles.field}>
          <label>Email</label>
          <input
            placeholder="admin@sweetshop.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button}>Register</button>
        
        <p style={styles.text}>
          Already have an account? <Link to="/login" style={styles.link}>Login</Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f3f4f6",
  },
  form: {
    background: "white",
    padding: "2rem",
    borderRadius: "1rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#1f2937",
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  error: {
    background: "#fee2e2",
    color: "#b91c1c",
    padding: "0.75rem",
    borderRadius: "0.375rem",
    marginBottom: "1rem",
    fontSize: "0.875rem",
  },
  field: {
    marginBottom: "1rem",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "0.375rem",
    border: "1px solid #d1d5db",
    marginTop: "0.25rem",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    background: "#4f46e5",
    color: "white",
    borderRadius: "0.375rem",
    border: "none",
    fontWeight: "600",
    marginTop: "0.5rem",
    cursor: "pointer",
  },
  text: {
    textAlign: "center",
    marginTop: "1rem",
    color: "#6b7280",
    fontSize: "0.875rem",
  },
  link: {
    color: "#4f46e5",
    textDecoration: "none",
    fontWeight: "500",
  }
};
