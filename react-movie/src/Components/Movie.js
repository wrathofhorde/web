import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Movie.module.css";

function Movie({ id, cover, title, year, summary, genres }) {
  return (
    <div className={styles.movie}>
      <img src={cover} alt={title} className={styles.movie__img} />
      <div>
        <h3 className={styles.movie__title}>
          <Link to={`/movie/${id}`}>{title}</Link>
        </h3>
        <h3 className={styles.movie__year}>{year}</h3>
        <p>{summary.length > 256 ? `${summary.slice(0, 256)}...` : summary}</p>
        <ul className={styles.movie__genres}>
          {genres.map((genre) => (
            <li key={genre}>{genre}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

Movie.propTypes = {
  cover: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
