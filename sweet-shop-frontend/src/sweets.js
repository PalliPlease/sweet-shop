import { apiRequest } from "./api";

export async function fetchSweets() {
  const res = await apiRequest("/sweets", {
    method: "GET",
  });
  return res.json();
}
