import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import Logo from "../../images/logo.svg";

function Header(props) {
  const location = useLocation();

  function chekPathname(pathname, className) {
    if (location.pathname === pathname){
      return className + "-active"
    } else if (!location.pathname.includes('movies')) {
      return className + "-disabled"
    }
      return className + "-notactive"
  }

  function toggleNavigation() {
    if (props.onLogin) {
      return <button className="header__button">Аккаунт</button>;
    } else {
      return (
        <div className="header__nav_info">
          <Link className="header__link header__link_register" to="/signup">
            Регистрация
          </Link>
          <div className="header__link_login">
            <Link className="header__link" to="/signin">
              Войти
            </Link>
          </div>
        </div>
      );
    }
  }

  return (
    <section className="header">
      <a className="header__link-logo" href="/">
        <img className="header__logo" alt="Логотип" src={Logo} />
      </a>
      <nav className="header__nav">
        <div className="header__nav_movie">
          <Link
            className={chekPathname("/movies", "header__link_movies") + " " + "header__link_movies"}
            to="/movies"
          >
            Фильмы
          </Link>
          <Link
            className={chekPathname("/movies/saved", "header__link_movies") + " " + "header__link_movies"}
            to="/movies/saved"
          >
            Сохранённые фильмы
          </Link>
        </div>
        {toggleNavigation()}
      </nav>
    </section>
  );
}
export default Header;
