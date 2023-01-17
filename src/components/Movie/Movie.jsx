import React from "react";
import { useLocation } from "react-router-dom";
import movieDefaultImage from "../../images/movieDefaultImage.png";
import "./Movie.css";

function Movie({ name, duration, imageUrl, moviesSaveDB }) {
  const location = useLocation();
  const pathname = location.pathname;

  function chekSaved(className) { // проверка наличия фильма в сохраненных (позможно придется возвращять кнопки а не классы)
    if ( moviesSaveDB ) {
      return moviesSaveDB.find(i => i.nameRU === name) ? className + " " + className + "-active" : className
    } else {
      return pathname === '/saved-movies' ? "movie-removeButton": className
    }
}

  function getTimeFromMins(duration) {
    const hours = Math.trunc(duration / 60);
    const minutes = duration % 60;
    return (hours === 0 ? "" : hours + "ч ") + minutes + "м";
  }

  // нужно сравнить 2 массива и поставить лайки на фильм
  return (
    <li className="movie">
      <div className="movie-header">
        <div className="movie-info">
          <p className="movie-title">{name}</p>
          <p className="movie-duraption">{getTimeFromMins(duration)}</p>
        </div>
        <button type="button" className={chekSaved("movie-saveButton")}
        ></button>
      </div>
      <img
        className="movie-preview"
        src={imageUrl}
        alt={name}
      />
    </li>
  );
}

export default Movie;
