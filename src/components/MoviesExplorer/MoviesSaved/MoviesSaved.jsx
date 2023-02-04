import React, { useEffect, useState } from "react";
import Movie from "../../Movie/Movie.jsx";
import SearchForm from "./../SearchForm/SearchForm"

function MoviesSaved({
  searchResult,
  AddMovies,
  onSearch,
  filterStatus,
  toggleFilterstatus,
  countItem,
  setFirstCoutn,
  handleSavedMovies,
  mainMovies,
}){

  const result = searchResult.movies.slice(0, countItem)
  const handleAddMovie = () => {
    AddMovies();
}

const [informMessage, setInformMessage] = useState('')
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
            mainMovies={mainMovies}
            handleSavedMovies={handleSavedMovies}
            movie={movie}
            trailerLink={movie.trailerLink}
            name={movie.nameRU}
            duration={movie.duration}
            imageUrl={movie.image}
            key={movie._id}
          />
        )) }
      </ul>
      <button
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
      <p>{informMessage}</p>
    </section>
  )
}

export default MoviesSaved;