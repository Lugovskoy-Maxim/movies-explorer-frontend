import React from "react";
import Movie from "../Movie/Movie.jsx";
import SearchForm from "./SearchForm/SearchForm";
import "./MoviesExplorer.css";
import { WindiwSizeContext } from "../../context/WindiwSizeContext.js";
import { useEffect } from "react";
import * as MoviesApi from "../../utils/MoviesApi";
import { useState } from "react";

function MoviesExplorer({
  searchResult,
  AddMovies,
  mainMovies,
  onSearch,
  filterStatus,
  toggleFilterstatus,
  countItem,
  setFirstCoutn,
}) {

  console.log(searchResult);

  const handleAddMovie = () => {
    AddMovies();
}

  const result = searchResult.movies.slice(0, countItem);

  return (
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
            moviesSaveDB={mainMovies}
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
          searchResult.movies.length >= countItem
            ? "movies__add-button"
            : "movies__add-button_hide"
        }
        onClick={handleAddMovie}
      >
        Ещё
      </button>
    </section>
  );
}

export default MoviesExplorer;
