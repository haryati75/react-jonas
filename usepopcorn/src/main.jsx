import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App";
// import "./index.css";
import StarRating from "./StarRating";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <StarRating
      messages={["Terrible", "Bad", "Okay", "Good", "Awesome"]}
      defaultRating={3}
    />
    <StarRating maxRating={10} color="olive" size={28} className="test" />
  </StrictMode>
);
