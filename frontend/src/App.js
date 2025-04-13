import React, { useState } from "react";
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";
import MapScreen from "./components/MapScreen";

function App() {
  const [currentScreen, setCurrentScreen] = useState("login"); // options: 'login', 'register', 'map'
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    // In a real app, verify credentials via API.
    setUser(userData);
    setCurrentScreen("map");
  };

  const handleRegister = (userData) => {
    // Simulate successful registration and log in user.
    setUser(userData);
    setCurrentScreen("map");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen("login");
  };

  let content;
  if (currentScreen === "login") {
    content = (
      <LoginScreen 
        onLogin={handleLogin}
        onSwitchToRegister={() => setCurrentScreen("register")}
      />
    );
  } else if (currentScreen === "register") {
    content = (
      <RegisterScreen 
        onRegister={handleRegister}
        onSwitchToLogin={() => setCurrentScreen("login")}
      />
    );
  } else if (currentScreen === "map") {
    content = <MapScreen user={user} onLogout={handleLogout} />;
  } else {
    content = <div>Loading...</div>;
  }

  return (
    <div className="app-container">
      <header>
        <h1>Blood &amp; Valor Kingdom Strategy Game</h1>
      </header>
      {content}
    </div>
  );
}

export default App;