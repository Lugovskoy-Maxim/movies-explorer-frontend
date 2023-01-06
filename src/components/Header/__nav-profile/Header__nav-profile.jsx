import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../../context/CurrentUserContext";
import "./Header__nav-profile.css";
import closeButton from "../../../images/closeButton.svg";


function HeaderNavProfile() {
  const currentUser = React.useContext(CurrentUserContext);
  const navigate = useNavigate();
  const [popupOpen, setPopupOpen] = useState(false);

  // const toProfile = () => navigate("/profile");

  const togglePopup = () => {
    console.log(popupOpen)
    return  !popupOpen ? "header__popup" : "header__popup header__popup-opened";
  }

  React.useEffect(() => {
    toggleNavigation();
    togglePopup();
  }, [currentUser, popupOpen]);

  function toggleNavigation() {
    if (typeof currentUser == "object") {
      return (
        <>
          <button className="header__button" onClick={() => setPopupOpen(true)}>
            Аккаунт
          </button>
          <div className={togglePopup()}>
            <botton className="header__popup-button" onClick={() => setPopupOpen(false)}>
              <img className="header__popup-button-image" alt="Закрыть" src={closeButton} />
            </botton>
            <ul className="header__popup-links">
              <li className="header__popup-link">
                <Link className="header__popup-link-title" to="/">
                  Главная
                </Link>
              </li>
              <li className="header__popup-link">
                <Link className="header__popup-link-title header__popup-link-title-active" to="/movies">
                  Фильмы
                </Link>
              </li>
              <li className="header__popup-link">
                <Link className="header__popup-link-title" to="/saved-movies">
                  Сохранённые фильмы
                </Link>
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
