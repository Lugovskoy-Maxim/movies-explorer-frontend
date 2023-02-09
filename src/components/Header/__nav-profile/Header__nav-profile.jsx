import React from "react";
import { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Header__nav-profile.css";
import closeButton from "../../../images/closeButton.svg";
import menuButton from "../../../images/mainburger.svg";
import { WindiwSizeContext } from "../../../context/WindiwSizeContext.js";

function HeaderNavProfile(loggedIn) {
  const navigate = useNavigate();
  const location = useLocation();

  const [popupOpen, setPopupOpen] = useState(false);
  const windowSize = useContext(WindiwSizeContext);

  function desctopProfile(){
    if(windowSize >= 768) {
      return (
        <button className="header__button" onClick={() =>navigate("/profile") }>
        Аккаунт
      </button>
      )
    } else {
      return (
        <button className="header__button-menu" onClick={() => setPopupOpen(true)}>
          <img className="header__button-menu-image" alt="Меню" src={menuButton} />
      </button>
      )
    }
  }

  const togglePopup = () => {
    return  !popupOpen ? "header__popup" : "header__popup header__popup-opened";
  }

  React.useEffect(() => {
    toggleNavigation();
    togglePopup();
  }, []);

  function toggleNavigation() {
    if (loggedIn.loggedIn === true) {
      return (
        <>
          {desctopProfile()}
          <div className={togglePopup()}>
            <button className="header__popup-button" onClick={() => setPopupOpen(false)}>
              <img className="header__popup-button-image" alt="Закрыть" src={closeButton} />
            </button>
            <ul className="header__popup-links">
              <li className="header__popup-link">
                <Link className={`header__popup-link-title ${location.pathname === "/" ? "header__popup-link-title-active": ""}`} to="/">
                  Главная
                </Link>
              </li>
              <li className="header__popup-link">
                <Link className={`header__popup-link-title ${location.pathname === "/movies" ? "header__popup-link-title-active": ""}`} to="/movies">
                  Фильмы
                </Link>
              </li>
              <li className="header__popup-link">
                <Link className={`header__popup-link-title ${location.pathname === "/saved-movies" ? "header__popup-link-title-active": ""}`} to="/saved-movies">
                  Сохранённые фильмы
                </Link>
              </li>
              <li className="header__popup-link">
                <button className="header__button" onClick={() =>navigate("/profile") }>
          Аккаунт
        </button>
              </li>
            </ul>
          </div>
        </>
      );
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

  return <div className="header__nav-profile">{toggleNavigation()}</div>;
}

export default HeaderNavProfile;
