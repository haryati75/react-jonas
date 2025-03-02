import { useEffect, useState } from "react";

const KEY = "64772617";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // callback?.();

    const controller = new AbortController();
    const { signal } = controller;

    const fetchMovies = async () => {
      setIsLoading(true);
      setError("");
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal }
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
        if (error.name === "AbortError") return;
        setError(error?.message || "Something went wrong");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();

    return () => {
      controller.abort();
      setMovies([]);
      setError("");
    };
  }, [query]);

  return { movies, isLoading, error };
}
