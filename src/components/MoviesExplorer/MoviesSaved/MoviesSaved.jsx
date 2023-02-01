import React from "react";
import Movie from "../../Movie/Movie.jsx";
import SearchForm from "./../SearchForm/SearchForm"
import { WindiwSizeContext } from "../../../context/WindiwSizeContext.js";
import { useEffect } from "react";

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

  console.log(searchResult);
  console.log(searchResult);

  const result = searchResult.movies.slice(0, searchResult.visible);

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
            imageUrl={movie.image}
            key={movie._id}
          />
        ))}
      </ul>
      <button
        type="button"
        className={
          searchResult.movies.length >= countItem
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