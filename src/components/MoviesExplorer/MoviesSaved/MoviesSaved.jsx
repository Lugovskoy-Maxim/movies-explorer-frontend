import React from "react";
import Movie from "../../Movie/Movie.jsx";
import SearchForm from "./../SearchForm/SearchForm"
import { WindiwSizeContext } from "../../../context/WindiwSizeContext.js";

function MoviesSaved({
  searchResult,
  AddMovies,
  mainMovies,
  onSearch,
  filterStatus,
  toggleFilterstatus,
  countItem,
  setFirstCoutn,
}){
  const movies = mainMovies;
  const windowSize = React.useContext(WindiwSizeContext);

  // function render (){
  //   if(movies === null){
  //     return (<p>У вас нет сохраненных фильмов</p>)
  //   } else {
  //     return (
  //       movies.filter( movies => movies.id < quantity + 1).map(movie => (
  //       <Movie
  //         name={movie.nameRU}
  //         duration={movie.duration}
  //         imageUrl={movie.image.url}
  //         key={movie.id} />
  //       )
  //     )
  //   )
  // }
  // }

  // function getMoviesListLength(){
  //   if (windowSize >= 1000){
  //     return 12 // для десктопа
  //   } else if (windowSize >= 750){
  //     return 8 // для планшета
  //   } else {
  //     return 4 // для смартфона
  //   }
  // }
  // const [quantity, setQuantity] = React.useState(getMoviesListLength());
  // // const result = mainMovies.filter( movies => movies.id < quantity + 1); // поискать метод что бы не привязываться к id
  // const AllMovies = localStorage.getItem("AllMovies");
  // console.log(AllMovies);
  // function addMovies(){
  //   setQuantity(quantity + getMoviesListLength())
  //   console.log(getMoviesListLength());
  //   console.log(quantity);
  //   console.log(quantity + getMoviesListLength());
  // }

  const result = mainMovies.movies.slice(0, countItem);

  const handleAddMovie = () => {
    AddMovies();
}

  return(
    <section className="movies">
      <SearchForm
        setFirstCoutn={setFirstCoutn}
        filterStatus={filterStatus}
        toggleFilterstatus={toggleFilterstatus}
        onSearch={onSearch}
      />
      <ul className="movies__elements">
        {result.map((movie) => (
          <Movie
            // moviesSaveDB={mainMovies}
            name={movie.nameRU}
            duration={movie.duration}
            imageUrl={`https://api.nomoreparties.co${movie.image.url}`}
            key={movie.id}
          />
        ))}
      </ul>
      <button
        type="button"
        className={
          mainMovies.movies.length >= countItem
            ? "movies__add-button"
            : "movies__add-button_hide"
        }
        onClick={handleAddMovie}
      >
        Ещё
      </button>
    </section>
  )
}

export default MoviesSaved;