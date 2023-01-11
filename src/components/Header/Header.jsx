import React from "react";
import "./Header.css";
import Logo from "../../images/logo.svg";


function Header(props) {
    return (
    <section className="header">
      <a className="header__link-logo" href="/">
        <img className="header__logo" alt="Логотип" src={Logo} />
      </a>
      <nav className="header__nav">
        {props.children}
      </nav>
    </section>
  );
}
export default Header;
