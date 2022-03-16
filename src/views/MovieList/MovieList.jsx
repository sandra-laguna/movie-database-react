import { useState, useEffect, useReducer } from 'react';

import styles from './MovieList.module.scss';

import logo from '../_assets/images/logo.svg';

import { Dialog } from 'views/_components/Dialog/Dialog';
import { Movie } from './_components/Movie/Movie';
import { movieReducer } from './_functions/Reducers/movieReducer';
import { MovieService } from 'services/MovieService';
import { Spinner } from 'views/_components/Spinner';
import { Info } from 'views/_components/Info';
import { Trailer } from 'views/_components/Trailer';
import { ReleaseDate } from 'views/_components/ReleaseDate';
import { Pagination } from 'views/_components/Pagination/Pagination';

export const MovieList = () => {
  const initialState = {
    searchTerm: '',
    isLoading: false,
    pageNumber: 1
  };

  const [movies, setMovies] = useState([]);
  const [movieSelectedId, setMovieSelectedId] = useState();
  const [movieState, moviesDispatcher] = useReducer(movieReducer, initialState);
  const [movieInfoVisible, setMovieInfoVisible] = useState(false);
  const { searchTerm, isLoading, pageNumber } = movieState;

  useEffect(() => {
    getMovies();
  }, [pageNumber]);

  const onChangePage = number => {
    moviesDispatcher({ type: 'SET_PAGE_NUMBER', payload: number });
  };

  const getMovies = async () => {
    moviesDispatcher({ type: 'SET_IS_LOADING', payload: true });
    try {
      const movieData = await MovieService.getAll(pageNumber);
      setMovies(movieData);
    } catch (error) {
      console.error(error);
    } finally {
      moviesDispatcher({ type: 'SET_IS_LOADING', payload: false });
    }
  };

  const handleOnSubmit = async e => {
    e.preventDefault();
    try {
      const searchedMovie = await MovieService.searchMovie(searchTerm);
      setMovies(searchedMovie.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnChange = e => {
    moviesDispatcher({ type: 'SET_SEARCHED_FILTER', payload: e.target.value });
  };

  const onCloseMovieTrailer = () => {
    setMovieInfoVisible(false);
  };

  const onTrailerClick = id => {
    setMovieInfoVisible(true);
    setMovieSelectedId(id);
  };

  const renderMovieInfo = () => {
    if (movieInfoVisible) {
      return (
        <Dialog onClose={onCloseMovieTrailer}>
          <Trailer movieId={movieSelectedId} />
          <Info text="" />
          <ReleaseDate movieId={movieSelectedId} />
        </Dialog>
      );
    }
  };

  const refreshPage = () => {
    window.location.reload(false);
  };

  return (
    <div>
      <header>
        <a href="#" onClick={refreshPage}>
          <img className={styles.logo} alt="logo" src={logo} />
        </a>
        <form onSubmit={handleOnSubmit}>
          <input
            className={styles.search}
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </header>
      <div className={styles.moviecontainer}>
        {isLoading ? (
          <Spinner />
        ) : (
          movies.length > 0 && movies.map(movie => <Movie key={movie.id} {...movie} onTrailerClick={onTrailerClick} />)
        )}
        {renderMovieInfo()}
        <Pagination paginate={onChangePage} maxPages={25} />
      </div>
    </div>
  );
};
