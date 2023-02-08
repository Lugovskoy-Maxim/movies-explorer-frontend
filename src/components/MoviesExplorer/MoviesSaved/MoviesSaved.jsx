import React, { useEffect, useState } from "react";
import Movie from "../../Movie/Movie.jsx";
import SearchForm from "./../SearchForm/SearchForm";

function MoviesSaved({
  searchResult,
  onSearch,
  setFirstCoutn,
  handleSavedMovies,
  mainMovies,
}) {
  const result =
    mainMovies.length > 0 ? (
      (searchResult.movies.length === 0
        ? mainMovies
        : searchResult.movies
      ).map((movie) => (
        <Movie
          mainMovies={mainMovies}
          handleSavedMovies={handleSavedMovies}
          movie={movie}
          trailerLink={movie.trailerLink}
          name={movie.nameRU}
          duration={movie.duration}
          imageUrl={movie.image}
          key={movie._id}
        />
      ))
    ) : (
      <p>У вас нет сохраненых фильмов</p>
    );
  const [filterStatus, setFilterStatus] = useState(false);

  // Если нет в памяти тогда выключено, если есть то принимает значение

  function toggleFilterStatus() {
    filterStatus === true ? setFilterStatus(false) : setFilterStatus(true);
  }

  //   const handleAddMovie = () => {
  //     AddMovies();
  // }

  const [informMessage, setInformMessage] = useState("");
  // function inforner() {
  //   if (searchResult.movies.length === 0) {
  //     setInformMessage("Ничего не найдено");
  //   } else {
  //     setInformMessage("");
  //   }
  // }

  // useEffect(()=>{
  //   inforner()
  // }, [searchResult])

  return (
    <section className="movies">
      <SearchForm
        setFirstCoutn={setFirstCoutn}
        filterStatus={filterStatus}
        toggleFilterstatus={toggleFilterStatus}
        onSearch={onSearch}
      />
      <ul className="movies__elements">{result}</ul>
      {/* <button
        type="button"
        className={
          searchResult.movies.length >= countItem
            ? !searchResult.movies.length === 0
              ? "movies__add-button"
              : "movies__add-button_hide"
            : "movies__add-button_hide"
        }
        onClick={handleAddMovie}
      >
        Ещё
      </button>
      <p>{informMessage}</p> */}
    </section>
  );
}

export default MoviesSaved;
