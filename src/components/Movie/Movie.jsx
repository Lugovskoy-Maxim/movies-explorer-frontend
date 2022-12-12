import React from "react";
import { useLocation } from "react-router-dom";
import movieDefaultImage from "../../images/movieDefaultImage.png";
import "./Movie.css";

function Movie({ name, duration, imageUrl, savedMoviesDB, moviesDB }) {
  const location = useLocation();
  const pathname = location.pathname;

  function getTimeFromMins(duration) {
    const hours = Math.trunc(duration / 60);
    const minutes = duration % 60;
    return (hours === 0 ? "" : hours + "ч ") + minutes + "м";
  }

  // нужно сравнить 2 массива и поставить лайки на фильм
  return (
    <li className="movieElement">
      <div className="movieElement__header">
        <div className="movieElement__info">
          <p className="movieElement__title">{name}</p>
          <p className="movieElement__duraption">{getTimeFromMins(duration)}</p>
        </div>
        <button
          className={
              pathname === '/movies/saved'
              ? "movieElement__removeButton"
              : "movieElement__seveButton"
          }
        ></button>
      </div>
      <img
        className="movieElement__preview"
        src={movieDefaultImage || imageUrl}
        alt={name}
      />
    </li>
  );
}

export default Movie;
