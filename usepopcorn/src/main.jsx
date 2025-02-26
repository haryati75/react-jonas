import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App";
// import "./index.css";
import StarRating from "./StarRating";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <StarRating maxRating={5} />
  </StrictMode>
);
