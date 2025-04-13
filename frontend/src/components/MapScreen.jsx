import React from "react";

function MapScreen({ user, onLogout }) {
  return (
    <div className="screen map-screen">
      <h2>World Map</h2>
      <p>Welcome, {user?.username || "Player"}!</p>
      <div className="map-container">
        {/* Replace this with your actual map rendering logic */}
        <p>[World map visualization goes here]</p>
      </div>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default MapScreen;