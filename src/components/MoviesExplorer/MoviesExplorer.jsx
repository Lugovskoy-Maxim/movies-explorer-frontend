import React from "react";
import Movie from "../Movie/Movie.jsx";
import SearchForm from "./SearchForm/SearchForm"
import './MoviesExplorer.css';
import { WindiwSizeContext } from "../../context/WindiwSizeContext.js";

function MoviesExplorer({ moviesDB, moviesSaveDB}){
  const windowSize = React.useContext(WindiwSizeContext);

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
  const result = moviesDB.filter( movies => movies.id < quantity + 1); // поискать метод что бы не привязываться к id

  function addMovies(){
    setQuantity(quantity + getMoviesListLength())
    console.log(getMoviesListLength());
    console.log(quantity);
    console.log(quantity + getMoviesListLength());
  }

    return (
    <section className="movies">
      <SearchForm />
      <ul className="movies__elements">
        {result.map(movie => (
          <Movie
            moviesSaveDB={moviesSaveDB}
            name={movie.nameRU}
            duration={movie.duration}
            imageUrl={movie.image.url}
            key={movie.id} />
          )
        )
        }
      </ul>
      <button type="button" className={ moviesDB.length >= quantity ? "movies__add-button" : "movies__add-button_hide" } onClick={addMovies}>Ещё</button>
    </section>
  )
}

export default MoviesExplorer;