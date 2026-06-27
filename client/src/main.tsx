import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";
import "./index.css";

// Light theme by default — overrides any previously cached `dark` preference
// from earlier dev iterations. The user can still toggle via the sun/moon button.
document.documentElement.classList.remove("dark");
try { localStorage.setItem("theme", "light"); } catch { /* ignore */ }

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
