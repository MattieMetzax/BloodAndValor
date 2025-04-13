// src/App.js
import React, { useState, useEffect } from "react";

function App() {
  // For demonstration purposes, we initialize with "login" screen.
  const [currentScreen, setCurrentScreen] = useState("login");

  // Log the current screen to help with debugging in the console.
  useEffect(() => {
    console.log("Current screen:", currentScreen);
  }, [currentScreen]);

  // Render different screens based on state.
  const renderScreen = () => {
    if (currentScreen === "login") {
      return (
        <div className="screen login-screen">
          <h1>Login Screen</h1>
          <form>
            <input type="text" placeholder="Player ID" />
            <input type="password" placeholder="Password" />
            <button type="button" onClick={() => setCurrentScreen("map")}>
              Login
            </button>
          </form>
          <p>
            Don't have an account?{" "}
            <span
              className="link"
              onClick={() => setCurrentScreen("register")}
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              Register
            </span>
          </p>
        </div>
      );
    } else if (currentScreen === "register") {
      return (
        <div className="screen register-screen">
          <h1>Register Screen</h1>
          <form>
            <input type="text" placeholder="Player ID" />
            <input type="text" placeholder="Name" />
            <input type="password" placeholder="Password" />
            <button type="button" onClick={() => setCurrentScreen("login")}>
              Register
            </button>
          </form>
          <p>
            Already have an account?{" "}
            <span
              className="link"
              onClick={() => setCurrentScreen("login")}
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              Login
            </span>
          </p>
        </div>
      );
    } else if (currentScreen === "map") {
      return (
        <div className="screen map-screen">
          <h1>World Map</h1>
          <p>Your map will be displayed here.</p>
          <button type="button" onClick={() => setCurrentScreen("login")}>
            Logout
          </button>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  };

  return (
    <div className="App">
      {/* Simple header for the app */}
      <header>
        <h1>Blood & Valor</h1>
      </header>
      {renderScreen()}
    </div>
  );
}

export default App;