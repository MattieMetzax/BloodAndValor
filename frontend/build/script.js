const API_BASE_URL = "https://your-backend-url.com/api";

// Utility function to handle API requests
async function apiRequest(endpoint, method, body = null, token = null) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  return response.json();
}

// Login logic
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      try {
        const result = await apiRequest("/login", "POST", { username, password });
        localStorage.setItem("token", result.token); // Store token
        window.location.href = "map.html"; // Redirect to map screen
      } catch (error) {
        document.getElementById("login-error").textContent = error.message;
        document.getElementById("login-error").style.display = "block";
      }
    });
  }

  // Register logic
  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("reg-username").value;
      const name = document.getElementById("reg-name").value;
      const password = document.getElementById("reg-password").value;

      try {
        await apiRequest("/register", "POST", { username, name, password });
        window.location.href = "index.html"; // Redirect to login screen
      } catch (error) {
        document.getElementById("register-error").textContent = error.message;
        document.getElementById("register-error").style.display = "block";
      }
    });
  }

  // Map screen logic
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "index.html"; // Redirect to login if not authenticated
    }

    document.getElementById("welcome-message").textContent = `Welcome, Player!`;

    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("token"); // Clear token
      window.location.href = "index.html"; // Redirect to login
    });
  }
});