import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignIn.css";
import Logo from "../../images/logo.svg";

function SignIn(props) {

  const [email, setEmail ] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    // функция отправки прокинутая пропсом
    setEmail("");
    setPassword("");
  }

  return (
    <section className="signin">
      <a className="signin__link-logo" href="/">
        <img className="signin__logo" alt="Логотип" src={Logo} />
      </a>
      <h1 className="signin__title">Рады видеть!</h1>
      <form onSubmit={handleSubmit} className="signin__form">
        <p className="signin__lable">E-mail</p>
        <label htmlFor="email"></label>
        <input
          className="signin__input"
          placeholder="Email"
          required
          id="email"
          name="email"
          type="email"
          value={email || ""}
          onChange={handleEmailChange}
        />
        <hr className="signin__line" />
        <p className="signin__lable">Пароль</p>
        <label htmlFor="password"></label>
        <input
          className="signin__input"
          placeholder="Пароль"
          required
          id="password"
          name="password"
          type="password"
          autoComplete="off"
          value={password || ""}
          onChange={handlePasswordChange}
        />
        <hr className="signin__line" />
        <div className="signin__button-container">
          <button type="submit" className="signin__save-button">
            Войти
          </button>
        </div>
        <div className="signin__register-container">
          <p className="signin__register-title">Ещё не зарегистрированы?</p>
          <Link className="signin__link" to="/signup">
            Регистрация
          </Link>
        </div>
      </form>
    </section>
  );
}

export default SignIn;
