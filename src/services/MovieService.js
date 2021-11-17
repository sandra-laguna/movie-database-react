import isNil from 'lodash/isNil';
import { Movie } from '../entities/Movie';
import { Trailer } from '../entities/Trailer';
import { movieRepository } from '../repositories/MovieRepository';

const getAll = async () => {
  const moviesListDTO = await movieRepository.getAll();
  console.log(moviesListDTO);
  if (isNil(moviesListDTO?.data?.results)) {
    return;
  }

  const moviesList = moviesListDTO.data.results.map(
    movie =>
      new Movie({
        title: movie.title,
        poster_path: movie.poster_path,
        overview: movie.overview,
        vote_average: movie.vote_average,
        id: movie.id
      })
  );

  return moviesList;
};

const searchMovie = async movieName => await movieRepository.searchMovie(movieName);

const getTrailer = async movieId => {
  const trailerListDTO = await movieRepository.getTrailer(movieId);
  const trailerList = trailerListDTO.data.results.map(
    trailer =>
      new Trailer({
        id: trailer.id,
        key: trailer.key,
        site: trailer.site
      })
  );
  return trailerList;
};

export const MovieService = {
  getAll,
  searchMovie,
  getTrailer
};
