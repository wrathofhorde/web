import { useState, useEffect } from "react";
import Movie from "../Components/Movie";
import styles from "./Home.module.css";

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
    <div>
      <div className={styles.container}>
        {loading === true ? (
          "Loading"
        ) : (
          <div className={styles.movies}>
            {movies.map((movie) => {
              console.log(movie);
              const [id, medium_cover_image, title, year, summary, genres] = [
                movie.id,
                movie.medium_cover_image,
                movie.title,
                movie.year,
                movie.summary,
                movie.genres,
              ];
              return (
                <Movie
                  key={movie.id}
                  id={id}
                  cover={medium_cover_image}
                  title={title}
                  year={year}
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
