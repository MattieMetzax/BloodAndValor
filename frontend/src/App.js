// frontend/src/App.js
import React, { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const [mapData, setMapData] = useState([]);
  const [playerInfo, setPlayerInfo] = useState(null);

  const fetchMap = async () => {
    const res = await fetch("http://localhost:8000/get-map/");
    const data = await res.json();
    setMapData(data.map);
  };

  const createPlayer = async () => {
    // Replace with desired player ID and name
    const playerId = "player_001";
    const res = await fetch(`http://localhost:8000/create-player/${playerId}?name=Michaela`, {
      method: "POST",
    });
    const data = await res.json();
    console.log(data);
    fetchPlayer(playerId);
  };

  const fetchPlayer = async (playerId) => {
    const res = await fetch(`http://localhost:8000/player/${playerId}`);
    const data = await res.json();
    setPlayerInfo(data);
  };

  useEffect(() => {
    fetchMap();
  }, []);

  return (
    <div className="App">
      <h1>Kingdom Strategy Game</h1>
      <button onClick={createPlayer}>Create Player</button>
      {playerInfo && (
        <div className="player-info">
          <h2>Player Info</h2>
          <p>ID: {playerInfo.id}</p>
          <p>Name: {playerInfo.name}</p>
          <p>Coins: {playerInfo.coins}</p>
          <p>Well-Being: {playerInfo.well_being}</p>
        </div>
      )}
      <h2>Map Data</h2>
      <div className="map">
        {mapData.map((tile, index) => (
          <div key={index} className={`tile ${tile.tile_type}`}>
            {tile.tile_type}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;