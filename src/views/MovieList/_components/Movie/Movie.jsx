import FilmLogo from 'views/_assets/images/film.svg';
import styles from './Movie.module.scss';

const IMG_API = 'https://image.tmdb.org/t/p/w1280';
const noimage = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';

const setVoteClass = vote => {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 6) {
    return 'orange';
  } else {
    return 'red';
  }
};

export const Movie = ({ title, poster_path, overview, vote_average, id, onTrailerClick }) => (
  <div className={styles.movie}>
    <img src={poster_path ? IMG_API + poster_path : noimage} alt={title} />
    <div className={styles.movieInfo}>
      <h3>{title}</h3>
      <span className={`tag ${setVoteClass(vote_average)}`}>{vote_average}</span>
    </div>

    <div className={styles.movieOver}>
      <h2>Overview:</h2>
      <img
        onClick={() => onTrailerClick(id)}
        className={styles.trailerBtn}
        alt={`Trailer ${title}`}
        src={FilmLogo}
        title="Trailer"
      />
      <p>{overview}</p>
    </div>
  </div>
);
