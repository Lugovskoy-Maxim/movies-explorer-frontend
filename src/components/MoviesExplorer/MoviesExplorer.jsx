import React, { useEffect, useState } from "react";
import Movie from "../Movie/Movie.jsx";
import SearchForm from "./SearchForm/SearchForm";
import "./MoviesExplorer.css";
import { Link, useNavigate } from "react-router-dom";

function MoviesExplorer({
  searchResult,
  AddMovies,
  mainMovies,
  onSearch,
  countItem,
  setFirstCoutn,
  handleSavedMovies,
}) {
  const handleAddMovie = () => {
    AddMovies();
  };
  const [informMessage, setInformMessage] = useState("");
  const [filterStatus, setFilterStatus] = useState(() => {
    const saved = localStorage.getItem("filter");
    const initialValue = JSON.parse(saved);
    console.log(initialValue);
    return initialValue.toString() || "false";
  });

  // Если нет в памяти тогда выключено, если есть то принимает значение


  function toggleFilterStatus() {
    filterStatus === "true"
      ? setFilterStatus("false")
      : setFilterStatus("true");
    {
    filterStatus === "true"
      ? localStorage.setItem("filter", "false")
      : localStorage.setItem("filter", "true");
      }
  }
  // function inforner() {
  //   if (searchResult.movies.length === 0) {
  //     setInformMessage("Ничего не найдено");
  //   } else {
  //     setInformMessage("");
  //   }
  // }

  // useEffect(() => {
  //   inforner();
  // }, [searchResult]);

  const result = searchResult.movies.slice(0, countItem);
  return (
    <section className="movies">
      <SearchForm
        setFirstCoutn={setFirstCoutn}
        filterStatus={filterStatus}
        toggleFilterstatus={toggleFilterStatus}
        onSearch={onSearch}
      />
      <ul className="movies__elements">
        {result.map((movie) => (
          <Movie
            handleSavedMovies={handleSavedMovies}
            trailerLink={movie.trailerLink}
            movie={movie}
            mainMovies={mainMovies}
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
            searchResult.movies.length > countItem
              ? "movies__add-button"
              : "movies__add-button_hide"
        }
        onClick={handleAddMovie}
      >
        Ещё
      </button>
      <p>{informMessage}</p>
    </section>
  );
}

export default MoviesExplorer;
