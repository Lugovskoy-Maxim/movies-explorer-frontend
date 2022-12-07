import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Logo from "../../images/logo.svg";

function Header() {
    return (
        <section className="header">
          <a className="header__link-logo" href="/">
          <img className="header__logo" alt="Логотип" src={Logo} />
        </a>
        <div className="header__navInfo">
        {/* <Routes> */}
          {/* <Route path='/signup'> */}
            <Link className="header__link header__link_register" to="/signup">Регистрация</Link>
          {/* </Route> */}
          {/* <Route path='/signin'> */}
          <div className="header__link_login">
          <Link className="header__link " to="/signin">Войти</Link>
          </div>
          {/* </Route> */}
        {/* </Routes> */}
        </div>
        </section>
    );
}

export default Header;
