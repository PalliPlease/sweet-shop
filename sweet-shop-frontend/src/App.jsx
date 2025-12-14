import { useState } from "react";

import Register from "./pages/Register";
import Login from "./pages/login";
import Sweets from "./pages/Sweets";
import Admin from "./pages/Admin";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  if (!loggedIn) {
    return (
      <>
        <Register />
        <Login onLogin={() => setLoggedIn(true)} />
      </>
    );
  }

  return (
    <>
      <Sweets />
      <Admin />
    </>
  );
}
