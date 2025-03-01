# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Resolving Strict Mode repeated component mounts

https://taig.medium.com/prevent-react-from-triggering-useeffect-twice-307a475714d7

```jsx
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const initialize = useRef(false);

  useEffect(() => {
    console.log("useEffect...");
    if (!initialize.current) {
      initialize.current = true;
      console.log("fetching data...");
      fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
        .then((res) => res.json())
        .then((data) => setMovies(data.Search));
    }
    return () => {
      console.log("cleanup...");
    };
  }, []);
```

### Debounce Search Query to optimize fetch

```js
// useDebounce.js
import { useState, useEffect } from "react";

export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

```jsx
// App.js
import useDebounce from "./useDebounce";
// ...
export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const debouncedQuery = useDebounce(query, 500); // Debounce the query with a delay of 500ms

  useEffect(() => {
    const fetchMovies = async () => {
      if (!debouncedQuery) return;

      setIsLoading(true);
      setError("");
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${debouncedQuery}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data = await res.json();

        if (data.Error) {
          throw new Error(data.Error);
        }

        setMovies(data.Search);
      } catch (error) {
        setError(error?.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();

    return () => {
      console.log("fetch cleanup");
    };
  }, [debouncedQuery]);
  // ...
}
```
