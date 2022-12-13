import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import Logo from "../../images/logo.svg";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function Header() {
  const location = useLocation();
  const currentUser = React.useContext(CurrentUserContext);
  const navigate = useNavigate();

  const toProfile = () => navigate("/profile");
   React.useEffect(() => {
    toggleNavigation()
   }, [currentUser])

  function chekPathname(pathname, className) {
    if (location.pathname === pathname){
      return className + "-active"
    } else if (location.pathname === "/profile" ){
      return "header__link_movies-notactive"
    } else if (!location.pathname.includes('movies')) {
      return className + "-disabled"
    }
      return className + "-notactive"
  }

  function toggleNavigation() {
    if (typeof currentUser == 'object') {
      return <button className="header__button" onClick={toProfile}>Аккаунт</button>;
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
            className={ `${chekPathname("/movies", "header__link_movies")} header__link_movies `}
            to="/movies"
          >
            Фильмы
          </Link>
          <Link
            className={ `${chekPathname("/movies/saved", "header__link_movies")} header__link_movies `}
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
