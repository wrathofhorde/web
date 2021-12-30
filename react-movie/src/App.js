import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const response = await fetch(
      "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year"
    );
    const json = await response.json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="App">
      <h1>Movies</h1>
      <div>
        {loading === true ? (
          "Loading"
        ) : (
          <div>
            {movies.map((movie) => {
              console.log(movie);
              return (
                <div key={movie.id}>
                  <img src={movie.medium_cover_image} />
                  <h3>{movie.title}</h3>
                  <p>{movie.summary}</p>
                  <ul>
                    {movie.genres.map((genre) => (
                      <li key={genre}>{genre}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
