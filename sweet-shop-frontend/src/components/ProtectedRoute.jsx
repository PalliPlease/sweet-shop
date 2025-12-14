import { Navigate } from "react-router-dom";
import { getToken } from "../auth";

export default function ProtectedRoute({ children, roleRequired }) {
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Add role check if needed
  // if (roleRequired && getUserRole() !== roleRequired) {
  //   return <Navigate to="/" replace />;
  // }

  return children;
}
