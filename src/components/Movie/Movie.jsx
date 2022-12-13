import React from "react";
import { useLocation } from "react-router-dom";
import movieDefaultImage from "../../images/movieDefaultImage.png";
import "./Movie.css";

function Movie({ name, duration, imageUrl, moviesSaveDB }) {
  const location = useLocation();
  const pathname = location.pathname;

  function chekSaved(className) { // проверка наличия фильма в сохраненных (позможно придется возвращять кнопки а не классы)
    if ( moviesSaveDB ) {
      return moviesSaveDB.find(i => i.nameRU == name) ? className + " " + className + "_active" : className
    } else {
      return pathname === '/movies/saved' ? "movieElement__removeButton": className
    }

}

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
        <button className={chekSaved("movieElement__seveButton")}
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
