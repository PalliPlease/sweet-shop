import { Link, useNavigate } from "react-router-dom";
import { logout } from "../auth";

export default function Navbar({ role, setLoggedIn, setRole }) {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    setLoggedIn(false);
    setRole(null);
    navigate("/login");
  }

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>Sweet Shop</Link>
        <div style={styles.links}>
          {role === "ADMIN" && <Link to="/admin" style={styles.link}>Admin</Link>}
          <button onClick={handleLogout} style={styles.button}>Logout</button>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    background: "white",
    padding: "1rem 2rem",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    marginBottom: "2rem",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    textDecoration: "none",
    color: "#4f46e5",
  },
  links: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: "#333",
    fontWeight: "500",
  },
  button: {
    padding: "8px 16px",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  }
};
