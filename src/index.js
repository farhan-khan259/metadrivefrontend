import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // unified App containing both user and admin routes

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
