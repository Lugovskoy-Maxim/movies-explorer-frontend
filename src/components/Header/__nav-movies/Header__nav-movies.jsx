import React  from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header__nav-movies.css";

function HeaderNavMovies({loggedIn}) {
  const location = useLocation();
  function chekPathname(pathname, className) {
    if (location.pathname === pathname) {
      return className + "-active";
    }
    else if (location.pathname === "/profile") {
      return "header__nav-movies-link-notactive";
    }
    else if (loggedIn === true && location.pathname === "/") {
      return "header__nav-movies-link-notactive";
    }
    else if (loggedIn === true && location.pathname === "/profile") {
      return "header__nav-movies-link-notactive";
    }
    else if (!location.pathname.includes("movies")) {
      return className + "-disabled";
    }

    return className + "-notactive";
  }

  return (
      <div className="header__nav-movie">
        <Link
          className={`${chekPathname(
            "/movies",
            "header__nav-movies-link"
          )} header__nav-movies-link `}
          to="/movies"
        >
          Фильмы
        </Link>
        <Link
          className={`${chekPathname(
            "/saved-movies",
            "header__nav-movies-link"
          )} header__nav-movies-link `}
          to="/saved-movies"
        >
          Сохранённые фильмы
        </Link>
      </div>
  );
}

export default HeaderNavMovies;
