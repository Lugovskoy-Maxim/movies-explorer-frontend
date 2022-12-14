import React from "react";
import Movie from "../../Movie/Movie.jsx";
import SearchForm from "./../SearchForm/SearchForm"
import { WindiwSizeContext } from "../../../context/WindiwSizeContext.js";

function MoviesSaved({ moviesDB }){
  const windowSize = React.useContext(WindiwSizeContext);

  function getMoviesListLength(){
    if (windowSize >= 1000){
      return 12 // для десктопа
    } else if (windowSize >= 750){
      return 8 // для планшета
    } else {
      return 4 // для смартфона
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

  return(
    <section className="movies">
      <SearchForm />
      <ul className="movies__elements">
        {result.map(movie => (
          <Movie
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

export default MoviesSaved;