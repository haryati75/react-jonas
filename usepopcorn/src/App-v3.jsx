import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0).toFixed(1);

const KEY = "64772617";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  // custom hooks
  const { movies, isLoading, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(id) {
    setSelectedId((prev) => (prev === id ? null : id));
  }

  function handleAddWatched(movie) {
    setWatched((prev) => [...prev, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((prev) => prev.filter((movie) => movie.imdbID !== id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">💤 Loading...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>💔 </span>
      {message}
    </p>
  );
}

function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({ query, setQuery }) {
  // do not do this for DOM manipulation, instead use refs
  // useEffect(() => {
  //   document.querySelector(".search").focus();
  // }
  // , []);

  const inputRef = useRef(null);

  useEffect(() => {
    function callback(e) {
      if (document.activeElement === inputRef.current) return;

      if (e.key === "Enter") {
        // inputRef.current is the DOM element
        inputRef.current.focus();
        setQuery("");
      }
    }

    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [setQuery]);

  return (
    <input
      ref={inputRef}
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function NumResults({ movies }) {
  const numResults = movies.length || 0;
  return (
    <p className="num-results">
      Found <strong>{numResults}</strong> results
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <ButtonCollapse isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && children}
    </div>
  );
}

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectMovie }) {
  return (
    <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <IconLabel icon="🗓" text={movie.Year} />
      </div>
    </li>
  );
}

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) countRef.current++;
  }, [userRating]);

  const isWatched = !!watched.find((movie) => movie.imdbID === selectedId);
  const watchedRating = isWatched
    ? watched.find((movie) => movie.imdbID === selectedId).userRating
    : 0;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runTime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie || {};

  // #region Breaking the rules of hooks
  // 1. conditionally using hooks is not allowed
  // if (imdbRating > 8) {const [isHighRating, setIsHighRating] = useState(true); }

  // 2. early return is not allowed before all hooks are called
  // if (imdbRating > 8) return <p>🌟 This is a high rated movie!</p>;
  // #endregion

  function handleAddWatched() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      runtime: isNaN(parseInt(runTime)) ? 0 : parseInt(runTime),
      imdbRating: parseFloat(imdbRating),
      userRating,
      countRatingDecisions: countRef.current,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onCloseMovie();
      }
    };
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onCloseMovie]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchMovie = async () => {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`,
          { signal }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch movie");
        }

        const data = await res.json();
        setMovie(data);
      } catch (error) {
        if (error.name === "AbortError") return;
        setError(error?.message || "Something went wrong");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();

    return () => {
      controller.abort();
      setMovie(null);
      setError("");
    };
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return () => {
      document.title = "usePopcorn";
    };
  }, [title]);

  return (
    <div className="details">
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!isLoading && !error && movie && (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`${title} poster`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runTime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isWatched && <p>You rated this movie {watchedRating} 🌟</p>}
              {!isWatched && (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAddWatched}>
                      + Add to list
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>{" "}
        </>
      )}
    </div>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <IconLabel icon="#️⃣" text={watched.length + " movies"} />
        <IconLabel icon="⭐️" text={avgImdbRating} />
        <IconLabel icon="🌟" text={avgUserRating} />
        <IconLabel icon="⏳" text={avgRuntime} />
      </div>
    </div>
  );
}

function WatchedMoviesList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <IconLabel icon="⭐️" text={movie.imdbRating} />
        <IconLabel icon="🌟" text={movie.userRating} />
        <IconLabel icon="⏳" text={movie.runtime} />
        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}

function IconLabel({ icon, text }) {
  return (
    <p>
      <span>{icon}</span>
      <span>{text}</span>
    </p>
  );
}

function ButtonCollapse({ isOpen, setIsOpen }) {
  return (
    <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
      {isOpen ? "–" : "+"}
    </button>
  );
}
