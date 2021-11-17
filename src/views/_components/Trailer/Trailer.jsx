import { useEffect, useState } from 'react';
import styles from './Trailer.module.scss';
import { MovieService } from 'services/MovieService';

export const Trailer = ({ movieId }) => {
  const [trailers, setTrailers] = useState([]);

  useEffect(() => {
    getTrailer();
  }, [movieId]);

  const getTrailer = async () => {
    try {
      const trailers = await MovieService.getTrailer(movieId);
      setTrailers(trailers);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <iframe
      src={`https://www.youtube.com/embed/${trailers[0]?.key}`}
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen></iframe>
  );
};
