import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";
import MapScreen from "./components/MapScreen";

function App() {
  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>Blood &amp; Valor Kingdom Strategy Game</h1>
        </header>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/map" element={<MapScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;