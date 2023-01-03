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
      return pathname === '/saved-movies' ? "movie__element-removeButton": className
    }
}

  function getTimeFromMins(duration) {
    const hours = Math.trunc(duration / 60);
    const minutes = duration % 60;
    return (hours === 0 ? "" : hours + "ч ") + minutes + "м";
  }

  // нужно сравнить 2 массива и поставить лайки на фильм
  return (
    <li className="movie__element">
      <div className="movie__element-header">
        <div className="movie__element-info">
          <p className="movie__element-title">{name}</p>
          <p className="movie__element-duraption">{getTimeFromMins(duration)}</p>
        </div>
        <button className={chekSaved("movie__element-saveButton")}
        ></button>
      </div>
      <img
        className="movie__element-preview"
        src={movieDefaultImage || imageUrl}
        alt={name}
      />
    </li>
  );
}

export default Movie;
