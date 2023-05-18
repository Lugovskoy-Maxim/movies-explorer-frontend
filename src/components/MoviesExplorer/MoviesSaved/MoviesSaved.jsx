import React, { useState } from 'react';
import Movie from '../../Movie/Movie.jsx';
import SearchForm from './../SearchForm/SearchForm';

function MoviesSaved({
  searchResult,
  onSearch,
  setFirstCoutn,
  handleSavedMovies,
  mainMovies,
  setMainMovies,
}) {
  const [filterStatus, setFilterStatus] = useState(false);

  function toggleFilterStatus() {
    setFilterStatus(!filterStatus);
  }

  return (
    <section className="movies">
      <SearchForm
        setFirstCoutn={setFirstCoutn}
        filterStatus={filterStatus}
        toggleFilterstatus={toggleFilterStatus}
        onSearch={onSearch}
      />
      <ul className="movies__elements">
        {mainMovies.length > 0 ? (
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
        )}
      </ul>
    </section>
  );
}

export default MoviesSaved;
