import React, { useState, useEffect } from "react";

function App() {
  const [playerInfo, setPlayerInfo] = useState(null);
  const [mapData, setMapData] = useState([]);
  const [playerId, setPlayerId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const apiUrl = "https://bloodandvalor.onrender.com"; // Backend base URL

  // Fetch Map Data
  const fetchMap = async () => {
    const response = await fetch(`${apiUrl}/get-map/`);
    const data = await response.json();
    setMapData(data.map);
  };

  // Register Player
  const registerPlayer = async (e) => {
    e.preventDefault();
    const response = await fetch(`${apiUrl}/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ player_id: playerId, name, password }),
    });
    const data = await response.json();
    if (response.ok) {
      alert(data.message);
      setPlayerId("");
      setName("");
      setPassword("");
    } else {
      alert(`Registration failed: ${data.detail}`);
    }
  };

  // Fetch Player Info
  const fetchPlayer = async (playerId) => {
    const response = await fetch(`${apiUrl}/player/${playerId}`);
    if (response.ok) {
      const data = await response.json();
      setPlayerInfo(data);
    } else {
      alert("Player not found.");
    }
  };

  useEffect(() => {
    fetchMap();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Blood & Valor</h1>
        <p>Kingdom Strategy Game</p>
      </header>

      <div>
        {/* Registration Form */}
        <form onSubmit={registerPlayer}>
          <h2>Register</h2>
          <input
            type="text"
            placeholder="Player ID"
            value={playerId}
            onChange={(e) => setPlayerId(e.target.value)}
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
      </div>

      <div>
        <h2>Map</h2>
        <div className="map-grid">
          {mapData.map((tile, index) => (
            <div key={index} className={`tile ${tile.tile_type}`}>
              {tile.tile_type}
            </div>
          ))}
        </div>
      </div>

      {playerInfo && (
        <div>
          <h2>Player Info</h2>
          <p>ID: {playerInfo.id}</p>
          <p>Name: {playerInfo.name}</p>
          <p>Coins: {playerInfo.coins}</p>
        </div>
      )}
    </div>
  );
}

export default App;