import { useState } from "react";
import { getToken, getUserRole, logout } from "./auth";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Sweets from "./pages/Sweets";
import Admin from "./pages/Admin";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(!!getToken());
  const [role, setRole] = useState(getUserRole());
  const [showLogin, setShowLogin] = useState(true);

  function handleLogin() {
    setLoggedIn(true);
    setRole(getUserRole());
  }

  function handleLogout() {
    logout();
    setLoggedIn(false);
    setRole(null);
    setShowLogin(true);
  }

  if (!loggedIn) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "white",
            padding: 30,
            borderRadius: 12,
            width: 350,
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          }}
        >
          {showLogin ? (
            <>
              <Login onLogin={handleLogin} />
              <p style={{ textAlign: "center" }}>
                Don’t have an account?{" "}
                <span
                  style={{ color: "#4f46e5", cursor: "pointer" }}
                  onClick={() => setShowLogin(false)}
                >
                  Register
                </span>
              </p>
            </>
          ) : (
            <>
              <Register />
              <p style={{ textAlign: "center" }}>
                Already have an account?{" "}
                <span
                  style={{ color: "#4f46e5", cursor: "pointer" }}
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <button
        onClick={handleLogout}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          padding: "6px 12px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>

      <h1>Sweet Shop</h1>

      {role === "ADMIN" ? <Admin /> : <Sweets />}
    </div>
  );
}
