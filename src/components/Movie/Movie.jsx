import React from 'react';
import movieDefaultImage from "../../images/movieDefaultImage.png"
import './Movie.css';

function Movie({
  name, duration, imageUrl,
}){
  function getTimeFromMins(duration) {
    const hours = Math.trunc(duration/60);
    const minutes = duration % 60;
    return (hours === 0 ? "" : hours + "ч " )  + minutes + "м";
  }
  return(
    <li className="movieElement">
      <div className="movieElement__header">
        <div className="movieElement__info">
          <p className="movieElement__title">{name}</p>
          <p className="movieElement__duraption">{getTimeFromMins(duration)}</p>

        </div>
        <button className="movieElement__seveButton"></button>
      </div>
      <img className="movieElement__preview"
        src={movieDefaultImage || imageUrl}
        alt={name}
        />
    </li>
  )
}

export default Movie;