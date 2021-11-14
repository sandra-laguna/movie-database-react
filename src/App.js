import React, { useState, useEffect } from "react";
import axios from "axios";
import Movie from "./views/Movies/Movies";

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a03066c5d8bc0cacef0bf9aeed31def9&page=1"

const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=a03066c5d8bc0cacef0bf9aeed31def9&query="

const App = () => {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState ('');

  useEffect(() => {
    getMovies(FEATURED_API)
  }, []);

  const getMovies = (API) =>{
    axios(API)
    .then((response) => {
      console.log(response)
      setMovies(response.data.results)
    });
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if(setSearchTerm){
      getMovies(SEARCH_API+searchTerm)
      setSearchTerm('');
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  }

  return (
    <div>
      <header>
        <form onSubmit={handleOnSubmit}>
          <input className="search" type="search" placeholder="Search..." value={searchTerm} onChange={handleOnChange}/>
        </form>
      </header>
      <div className="movie-container">
        {movies.length > 0 && movies.map((movie) => (
          <Movie key={movie.id} {...movie}/>
        ))}
      </div>
    </div>
  );
}

export default App;