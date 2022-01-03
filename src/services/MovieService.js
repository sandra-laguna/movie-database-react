import isNil from 'lodash/isNil';
import { Movie } from '../entities/Movie';
import { Trailer } from '../entities/Trailer';
import { ReleaseDate } from 'entities/ReleaseDate';
import { movieRepository } from '../repositories/MovieRepository';

const getAll = async page => {
  const moviesListDTO = await movieRepository.getAll(page);
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

const getReleaseDate = async movieId => {
  const releaseDateListDTO = await movieRepository.getReleaseDate(movieId);
  const releaseDateList = releaseDateListDTO.data.results.map(
    releaseDate =>
      new ReleaseDate({
        iso_3166_1: releaseDate.iso_3166_1,
        release_dates: releaseDate.release_dates
      })
  );
  return releaseDateList;
};

const getPages = async () => await movieRepository.getPages();

export const MovieService = {
  getAll,
  searchMovie,
  getTrailer,
  getReleaseDate,
  getPages
};
