import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { getToken, getUserRole } from "./auth";

import Register from "./pages/Register";
import Login from "./pages/login"; // Note: file is login.jsx
import Sweets from "./pages/Sweets";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function Layout({ role, setLoggedIn, setRole }) {
  return (
    <>
      <Navbar role={role} setLoggedIn={setLoggedIn} setRole={setRole} />
      <div style={{ padding: "0 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <Outlet />
      </div>
    </>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(!!getToken());
  const [role, setRole] = useState(getUserRole());

  useEffect(() => {
    setLoggedIn(!!getToken());
    setRole(getUserRole());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/login" 
          element={
            loggedIn ? <Navigate to="/" replace /> : <Login setLoggedIn={setLoggedIn} setRole={setRole} />
          } 
        />
        <Route 
          path="/register" 
          element={
            loggedIn ? <Navigate to="/" replace /> : <Register />
          } 
        />
        
        <Route element={<ProtectedRoute><Layout role={role} setLoggedIn={setLoggedIn} setRole={setRole} /></ProtectedRoute>}>
          <Route path="/" element={role === 'ADMIN' ? <Navigate to="/admin" replace /> : <Sweets />} />
          <Route path="/admin" element={role === 'ADMIN' ? <Admin /> : <Navigate to="/" replace />} /> 
          {/* Wait, duplicate route path "/" above. I should decide. 
             If I want generic separate dashboard for Admin, I can do:
             User -> / (Sweets)
             Admin -> /admin (Admin Panel)
             
             Let's keep it simple:
             / -> Sweets (Everyone sees sweets)
             /admin -> Admin Panel (Only Admin)
             
             So I will remove the redirect from / to /admin.
          */}
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
