import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Logo from "../../images/logo.svg";

function Header(props) {

  function toggleNavigation() {
    if (!props.onLogin){
      return(
        <button className="header__button">Аккаунт</button>
      )} else {
        return(
          <>
            <Link className="header__link header__link_register" to="/signup">Регистрация</Link>
            <div className="header__link_login">
              <Link className="header-link" to="/signin">Войти</Link>
            </div>
          </>
        )
      }
    }

    return (
        <section className="header">
          <a className="header__link-logo" href="/">
          <img className="header__logo" alt="Логотип" src={Logo} />
        </a>
        <div className="header__navInfo">
          {toggleNavigation()}
        </div>
        </section>
    );
  }
export default Header;
