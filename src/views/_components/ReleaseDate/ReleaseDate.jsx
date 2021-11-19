import { useEffect, useState } from 'react';
import styles from './ReleaseDate.module.scss';
import { MovieService } from 'services/MovieService';

export const ReleaseDate = ({ movieId }) => {
  const [releaseDates, setReleaseDates] = useState([]);

  useEffect(() => {
    getReleaseDate();
  }, [movieId]);

  const getReleaseDate = async () => {
    try {
      const releaseDates = await MovieService.getReleaseDate(movieId);
      setReleaseDates(releaseDates[0].release_dates[0].release_date);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.releaseDate}>
      <h2>Release date:</h2>
      <p>{new Date(`${releaseDates}`).toLocaleDateString()}</p>
    </div>
  );
};
