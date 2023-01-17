import React from "react";
import Movie from "../../Movie/Movie.jsx";
import SearchForm from "./../SearchForm/SearchForm"
import { WindiwSizeContext } from "../../../context/WindiwSizeContext.js";

function MoviesSaved({ mainMovies, onSearch }){
  const windowSize = React.useContext(WindiwSizeContext);

  function render (){
    if(mainMovies === null){
      return (<p>У вас нет сохраненных фильмов</p>)
    } else {
      return (
        mainMovies.filter( movies => movies.id < quantity + 1).map(movie => (
        <Movie
          name={movie.nameRU}
          duration={movie.duration}
          imageUrl={movie.image.url}
          key={movie.id} />
        )
      )
    )
  }
  }

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
  // const result = mainMovies.filter( movies => movies.id < quantity + 1); // поискать метод что бы не привязываться к id
  const AllMovies = localStorage.getItem("AllMovies");
  console.log(AllMovies);
  function addMovies(){
    setQuantity(quantity + getMoviesListLength())
    console.log(getMoviesListLength());
    console.log(quantity);
    console.log(quantity + getMoviesListLength());
  }

  return(
    <section className="movies">
      <SearchForm
        onSearch={onSearch}
      />
      <ul className="movies__elements">
        {render}
      </ul>
      <button type="button" className={ mainMovies === null ? mainMovies.length >= quantity ? "movies__add-button" : "movies__add-button_hide" :  "movies__add-button_hide"} onClick={addMovies}>Ещё</button>
    </section>
  )
}

export default MoviesSaved;