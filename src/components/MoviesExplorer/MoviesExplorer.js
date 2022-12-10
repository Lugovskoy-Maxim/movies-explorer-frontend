import React from "react";
import Movie from "../Movie/Movie.jsx";
import moviesDB from "../../utils/moviesBD"
import './MoviesExplorer.css';

function MoviesExplorer(){

  return(
    <section className="movies">
      <div className="movies__search">

      </div>
      <ul className="movies__elements">
        {moviesDB.map(movie => (
          <Movie
            name={movie.nameRU}
            duration={movie.duration}
            imageUrl={movie.image.url}
            key={movie.id} />
          )
        )
        }
      </ul>
    </section>
  )
}

export default MoviesExplorer;