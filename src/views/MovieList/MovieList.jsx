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

export const MovieList = () => {
  const initialState = {
    searchTerm: '',
    isLoading: false,
    trailerId: ''
  };

  const [movies, setMovies, setTrailers] = useState([]);
  const [movieSelectedId, setMovieSelectedId] = useState();
  const [movieState, moviesDispatcher] = useReducer(movieReducer, initialState);
  const [movieInfoVisible, setMovieInfoVisible] = useState(false);
  const { searchTerm, isLoading } = movieState;

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    moviesDispatcher({ type: 'SET_IS_LOADING', payload: true });
    try {
      const movieData = await MovieService.getAll();
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

  const refreshPage = () => {
    window.location.reload(false);
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
        </Dialog>
      );
    }
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
      </div>
    </div>
  );
};
