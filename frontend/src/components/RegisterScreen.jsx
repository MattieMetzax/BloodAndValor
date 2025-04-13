import React, { useState } from "react";

function RegisterScreen({ onRegister, onSwitchToLogin }) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && name && password) {
      // Replace with API call if needed
      onRegister({ username, name });
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="screen register-screen">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?{" "}
        <span
          onClick={onSwitchToLogin}
          style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
        >
          Login
        </span>
      </p>
    </div>
  );
}

export default RegisterScreen;