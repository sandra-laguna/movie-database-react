import React, { useState, useEffect, useReducer } from "react";
import {Movie} from "./_components/Movie/Movie";
import styles from "./MovieList.module.scss";
import {MovieService} from "../../services/MovieService"
import { movieReducer } from "./_functions/Reducers/movieReducer";
import logo from "../_assets/images/logo.svg";
import { Spinner } from "views/_components/Spinner";

export const MovieList = () => {

  const initialState = {
    searchTerm: '',
    isLoading: false,
    trailerId: ''
  };

  const [movies, setMovies, setTrailers] = useState([]);
  //const [searchTerm, setSearchTerm] = useState ('');
  const [movieState, moviesDispatcher] = useReducer(movieReducer, initialState);
  const { searchTerm, isLoading } = movieState;
  const [trailerId,setTrailerId]=useState([]);

  useEffect(() => {
    getMovies()
  }, []);

  const getMovies = async () =>{
    moviesDispatcher({ type: 'SET_IS_LOADING', payload: true });
    try {
      const movieData = await MovieService.getAll()
      console.log("Respuesta", movieData)
      setMovies(movieData)
    } catch (error) {
      console.error(error);
    } finally {
      moviesDispatcher({ type: 'SET_IS_LOADING', payload: false });
    }
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const searchedMovie = await MovieService.searchMovie(searchTerm)
      setMovies(searchedMovie.data.results)
    } catch (error) {
      console.error(error)
    }
  };

  const handleOnChange = (e) => {
    //setSearchTerm(e.target.value);
    moviesDispatcher({type:'SET_SEARCHED_FILTER', payload:e.target.value})
  }

  const refreshPage = () => {
    window.location.reload(false);
  }

  const getTrailer = async (e) => {
    e.preventDefault();
    try {
      const trailer = await MovieService.showTrailer(trailerId)
      console.log("hola ",trailerId)
      setTrailers(trailer.data.results)
    } catch (error) {
      console.error(error)
    }
  };

  const onTrailerClick = (id) => {
    setTrailerId(id)
  }

    return (
      <div>
        <header>
        <a href="#" onClick={refreshPage}><img className={styles.logo} alt="logo" src={logo}/></a>
          <form onSubmit={handleOnSubmit}>
            <input className={styles.search} type="search" placeholder="Search..." value={searchTerm} onChange={handleOnChange}/>
          </form>
        </header>
        <div className={styles.moviecontainer}>
          { isLoading?<Spinner/>:
          movies.length > 0 && movies.map((movie) =>  (
                <Movie key={movie.id} {...movie} onMovieClick={getTrailer}/>
              )
          )}
        </div>
      </div>
    );
  
}