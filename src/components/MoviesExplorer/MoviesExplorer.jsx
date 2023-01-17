import React from "react";
import Movie from "../Movie/Movie.jsx";
import SearchForm from "./SearchForm/SearchForm"
import './MoviesExplorer.css';
import { WindiwSizeContext } from "../../context/WindiwSizeContext.js";
import { useEffect } from "react";
import * as MoviesApi from "../../utils/MoviesApi";
import { useState } from "react";

function MoviesExplorer({ moviesData, mainMovies, onSearch }){
  const windowSize = React.useContext(WindiwSizeContext);



  // const AllMovies = localStorage.getItem("AllMovies");

  // function getMoviesList (){
  //   MoviesApi
  //   .getMovie()
  //   .then((res) => {
  //     localStorage.setItem("AllMovies", res);
  //     const AllMovies = localStorage.getItem("AllMovies");
  //     console.log(AllMovies)
  //   })
  //   .catch((err) => console.log(err))
  // }

  // useEffect(() => {
  //   getMoviesList()
  // },[])

  function getMoviesListLength(){
    if (windowSize >= 1000){
      return 12
    } else if (windowSize >= 740){
      return 8
    } else {
      return 4
    }
  }
  const [quantity, setQuantity] = React.useState(getMoviesListLength());
  // const result = moviesDB.filter( movies => movies.id < quantity + 1); // поискать метод что бы не привязываться к id
  function addMovies(){
    setQuantity(quantity + getMoviesListLength())
    console.log(getMoviesListLength());
    console.log(quantity);
    console.log(quantity + getMoviesListLength());
  }

    return (
    <section className="movies">
      <SearchForm
        onSearch={onSearch}
      />
      <ul className="movies__elements">
        {moviesData.map(movie => (
          <Movie
            moviesSaveDB={mainMovies}
            name={movie.nameRU}
            duration={movie.duration}
            imageUrl={` https://api.nomoreparties.co${movie.image.url}`}
            key={movie.id} />
          )
        )
        }
      </ul>
      <button type="button" className={ moviesData.length >= quantity ? "movies__add-button" : "movies__add-button_hide" } onClick={addMovies}>Ещё</button>
    </section>
  )
}

export default MoviesExplorer;