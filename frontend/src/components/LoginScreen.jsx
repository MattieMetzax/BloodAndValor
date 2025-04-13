// In LoginScreen.jsx
import React, { useState } from "react";

function LoginScreen({ onLogin, onSwitchToRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      onLogin({ username });
    } else {
      alert("Please enter both username and password.");
    }
  };

  return (
    <div className="screen login-screen">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{" "}
        <span
          onClick={onSwitchToRegister}
          style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
        >
          Register
        </span>
      </p>
    </div>
  );
}

export default LoginScreen;