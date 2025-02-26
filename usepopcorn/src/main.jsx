import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App";
// import "./index.css";
import StarRating from "./StarRating";

function Test() {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <div>
      <StarRating
        color="lightblue"
        maxRating={10}
        onSetRating={setMovieRating}
      />
      <p>This movie was rated {movieRating} stars</p>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <StarRating
      messages={["Terrible", "Bad", "Okay", "Good", "Awesome"]}
      defaultRating={3}
    />
    <StarRating color="olive" size={28} className="test" />
    <Test />
  </StrictMode>
);
