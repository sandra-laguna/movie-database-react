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
  //console.log("movieListDTO: ",moviesListDTO.data.results);
  const moviesList = moviesListDTO.data.results.map(
    movie =>
      new Movie({
        title: movie.title, 
        poster_path: movie.poster_path, 
        overview: movie.overview,
        vote_average : movie.vote_average,
        id: movie.id
      })
  );

  //console.log({ moviesList });

  return moviesList;
};

const searchMovie = async movieName => await movieRepository.searchMovie(movieName);

const showTrailer = async movieID => {
  const trailerListDTO = await movieRepository.getTrailer(movieID);
  const trailerList = trailerListDTO.data.results.map(
    trailer =>
      new Trailer({
        id: trailer.id,
        key: trailer.key,
        site: trailer.site 
      })
  );

  console.log("trailerlist ",{ trailerList });

  return trailerList;
};

export const MovieService = {
  getAll,
  searchMovie,
  showTrailer
};
