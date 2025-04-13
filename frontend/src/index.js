// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

// Get the root element from index.html
const container = document.getElementById("root");

if (!container) {
  console.error("Error: No root element found in index.html");
} else {
  // Create a root and render the App component
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
