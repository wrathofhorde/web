import { useState, useEffect } from "react";
import Movie from "../Components/Movie";

function Home() {
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
              const [medium_cover_image, title, summary, genres] = [
                movie.medium_cover_image,
                movie.title,
                movie.title,
                movie.genres,
              ];
              return (
                <Movie
                  key={movie.id}
                  cover={medium_cover_image}
                  title={title}
                  summary={summary}
                  genres={genres}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
