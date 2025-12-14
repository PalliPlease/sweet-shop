const API_URL = "https://fastapi-sage-nu.vercel.app/api";

export function getToken() {
  return localStorage.getItem("token");
}

export async function apiRequest(path, options = {}) {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  return fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });
}
