export function saveToken(token) {
    localStorage.setItem("token", token);
  }
  
  export function getToken() {
    return localStorage.getItem("token");
  }
  
  export function logout() {
    localStorage.removeItem("token");
  }
  
  export function getUserRole() {
    const token = getToken();
    if (!token) return null;
  
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.role || null;
    } catch {
      return null;
    }
  }
  