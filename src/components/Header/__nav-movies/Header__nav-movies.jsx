import React  from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header__nav-movies.css";

function HeaderNavMovies() {
  const location = useLocation();

  function chekPathname(pathname, className) {
    if (location.pathname === pathname) {
      return className + "-active";
    } else if (location.pathname === "/profile") {
      return "header__link_movies-notactive";
    } else if (!location.pathname.includes("movies")) {
      return className + "-disabled";
    }
    return className + "-notactive";
  }


  return (
      <div className="header__nav-movie">
        <Link
          className={`${chekPathname(
            "/movies",
            "header__link_movies"
          )} header__link_movies `}
          to="/movies"
        >
          Фильмы
        </Link>
        <Link
          className={`${chekPathname(
            "/saved-movies",
            "header__link_movies"
          )} header__link_movies `}
          to="/saved-movies"
        >
          Сохранённые фильмы
        </Link>
      </div>
  );
}

export default HeaderNavMovies;
