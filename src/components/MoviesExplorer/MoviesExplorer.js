import React, { useEffect, useState } from "react";
import Movie from "../Movie/Movie.jsx";
import moviesDB from "../../utils/moviesBD"
import './MoviesExplorer.css';

function MoviesExplorer(){
  const [windowSize, setWindowSize] = React.useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  function getWindowSize(){
    const width = document.documentElement.clientWidth;
    return width;
  }

  function getMoviesListLength(){
    if (windowSize >= 1000){
      return 12
    } else if (windowSize >= 600){
      return 8
    } else {
      return 4
    }
  }
  const [quantity, setQuantity] = React.useState(getMoviesListLength());
  const result = moviesDB.filter(movies => movies.id < quantity + 1);

  function addMovies(){
    setQuantity(quantity + getMoviesListLength())
  }

  return(
    <section className="movies">
      <div className="movies__search">

      </div>
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
      <button className="movies__add-button" onClick={addMovies}>Ещё</button>
    </section>
  )
}

export default MoviesExplorer;