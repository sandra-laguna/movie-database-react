import isNil from 'lodash/isNil';
import { Movie } from '../entities/Movie';
import { movieRepository } from '../repositories/MovieRepository';

const getAll = async () => {
  const moviesListDTO = await movieRepository.getAll();
  console.log(moviesListDTO);
  if (isNil(moviesListDTO?.data?.results)) {
    return;
  }
  console.log(moviesListDTO.data.results);
  const moviesList = moviesListDTO.data.results.map(
    movie =>
      new Movie({
        title: movie.title, 
        poster_path: movie.poster_path, 
        overview: movie.overview,
        vote_average : movie.vote_average
      })
  );

  console.log({ moviesList });

  return moviesList;
};

const searchMovie = async movieName => await movieRepository.searchMovie(movieName);

export const MovieService = {
  getAll,
  searchMovie
};
