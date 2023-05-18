import * as mainApi from "../../utils/MainApi";
import * as MoviesApi from "../../utils/MoviesApi";

export function getMovies(setMoviesData) {
  // Загрузка фильмов
  MoviesApi.getMovie()
    .then((res) => {
      localStorage.setItem("moviesData", JSON.stringify(res));
      setMoviesData(res);
    })
    .catch((err) => console.log(err));
}

export function getMainMoviesDB(setMainMovies) {
  // Загрузка основных фильмов из базы данных
  mainApi
    .getMainMovies()
    .then((res) => {
      localStorage.setItem("mainMovies", JSON.stringify(res));
      setMainMovies(res);
    })
    .catch((err) => {
      setMainMovies([]);
    });
}