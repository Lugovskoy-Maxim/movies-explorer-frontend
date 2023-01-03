import React  from "react";
import { Link, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../../context/CurrentUserContext";
import "./Header__nav-profile.css";

function HeaderNavProfile() {
  const currentUser = React.useContext(CurrentUserContext);
  const navigate = useNavigate();

  const toProfile = () => navigate("/profile");
  React.useEffect(() => {
    toggleNavigation();
  }, [currentUser]);


  function toggleNavigation() {
    if (typeof currentUser == "object") {
      return (
        <button className="header__button" onClick={toProfile}>
          Аккаунт
        </button>
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

  return (
    <div className="header__nav-profile">
      {toggleNavigation()}
    </div>
  );
}

export default HeaderNavProfile;
