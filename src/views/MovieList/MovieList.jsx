import React, { useState, useEffect, useReducer } from "react";
import Movie from "./_components/Movie/Movie";
import styles from "./MovieList.module.scss";
import {MovieService} from "../../services/MovieService"
import { movieReducer } from "./_functions/Reducers/movieReducer";
import logo from "../_assets/images/logo.svg";

export const MovieList = () => {

  const initialState = {
    searchedMovie: '',
  };

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState ('');
  //const [movieState, moviesDispatcher] = useReducer(movieReducer, initialState);
  //const { searchedMovie } = movieState;

  useEffect(() => {
    getMovies()
  }, []);

  const getMovies = async () =>{
    const movieData = await MovieService.getAll()
    console.log("Respuesta", movieData)
    setMovies(movieData)
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const searchedMovie = await MovieService.searchMovie(searchTerm)
      setMovies(searchedMovie.data.results)
     // moviesDispatcher({type:'SET_SEARCHED_MOVIES', payload:searchTerm})
    } catch (error) {
      console.error(error)
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const refreshPage = () => {
    window.location.reload(false);
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
        {movies.length > 0 && movies.map((movie) => (
          <Movie key={movie.id} {...movie}/>
        ))}
      </div>
    </div>
  );
}
