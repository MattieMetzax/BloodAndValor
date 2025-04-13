import React, { useState, useEffect } from "react";

function App() {
  const [currentScreen, setCurrentScreen] = useState("login"); // Should default to 'login'
  const [playerId, setPlayerId] = useState("");
  const [password, setPassword] = useState("");
  const [mapData, setMapData] = useState([]);

  const apiUrl = "https://bloodandvalor.onrender.com";

  // Fetch Map Data
  const fetchMap = async () => {
    const response = await fetch(`${apiUrl}/get-map/`);
    const data = await response.json();
    setMapData(data.map);
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(`${apiUrl}/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ player_id: playerId, password }),
    });
    const data = await response.json();
    if (response.ok) {
      alert(data.message);
      setCurrentScreen("map");
      fetchMap();
    } else {
      alert(`Login failed: ${data.detail}`);
    }
  };

  // Handle Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch(`${apiUrl}/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ player_id: playerId, password, name: "Player Name" }),
    });
    const data = await response.json();
    if (response.ok) {
      alert(data.message);
      setCurrentScreen("login");
    } else {
      alert(`Registration failed: ${data.detail}`);
    }
  };

  // Render Screens
  const renderScreen = () => {
    switch (currentScreen) {
      case "login":
        return (
          <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Player ID"
                value={playerId}
                onChange={(e) => setPlayerId(e.target.value)}
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
              <span style={{ cursor: "pointer", color: "blue" }} onClick={() => setCurrentScreen("register")}>
                Register
              </span>
            </p>
          </div>
        );
      case "register":
        return (
          <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
              <input
                type="text"
                placeholder="Player ID"
                value={playerId}
                onChange={(e) => setPlayerId(e.target.value)}
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
              <span style={{ cursor: "pointer", color: "blue" }} onClick={() => setCurrentScreen("login")}>
                Login
              </span>
            </p>
          </div>
        );
      case "map":
        return (
          <div>
            <h2>World Map</h2>
            <div className="map-grid">
              {mapData.map((tile, index) => (
                <div key={index} className={`tile ${tile.tile_type}`}>
                  {tile.tile_type}
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Blood & Valor</h1>
      </header>
      {renderScreen()}
    </div>
  );
}

export default App;