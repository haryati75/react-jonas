import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(
  <StrictMode>
    <App />
  </StrictMode>
);
