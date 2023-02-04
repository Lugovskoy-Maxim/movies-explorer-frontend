import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import movieDefaultImage from "../../images/movieDefaultImage.png";
import "./Movie.css";
import { CurrentUserContext } from "../../context/CurrentUserContext";


function Movie({ movie, name, duration, imageUrl, mainMovies, handleSavedMovies, trailerLink }) {
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();
  const pathname = location.pathname;

  function chekSaved(className) { // проверка наличия фильма в сохраненных (позможно придется возвращять кнопки а не классы)
    if ( location.pathname === "/movies" ) {
      return mainMovies.find(i => i.nameRU === name) ? className + " " + className + "-active" : className
    } else {
      return pathname === '/saved-movies' ? "movie-removeButton": className
    }
}

function handlePreview(){
  window.open(trailerLink);
}

function saveButton(){
  const isSaved = mainMovies.find(i => i.nameRU === name)
  console.log(isSaved)
  handleSavedMovies(isSaved ? isSaved : movie)
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
          <p className="movie-title" onClick={handlePreview}>{name}</p>
          <p className="movie-duraption">{getTimeFromMins(duration)}</p>
        </div>
        <button type="button" onClick={saveButton} className={chekSaved("movie-saveButton")}
        ></button>
      </div>
      <img
        onClick={handlePreview}
        className="movie-preview"
        src={imageUrl}
        alt={name}
      />
    </li>
  );
}

export default Movie;
