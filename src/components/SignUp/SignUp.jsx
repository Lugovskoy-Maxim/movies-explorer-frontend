import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";
import Logo from "../../images/logo.svg";

function SignUp(props) {

  const [name, setName ] = useState("");
  const [email, setEmail ] = useState("");
  const [password, setPassword] = useState("");

  function handlNameChange(evt) {
    setName(evt.target.value);
  }

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
    <section className="signup">
      <a className="signup__link-logo" href="/">
        <img className="signup__logo" alt="Логотип" src={Logo} />
      </a>
      <h1 className="signup__title">Добро пожаловать!</h1>
      <form onSubmit={handleSubmit} className="signup__form">
      <p className="signup__lable">Имя</p>
        <label htmlFor="name"></label>
        <input
          className="signup__input"
          placeholder="Имя"
          required
          id="name"
          name="name"
          type="text"
          value={name || ""}
          onChange={handlNameChange}
        />
        <hr className="signup__line" />
        <p className="signup__lable">E-mail</p>
        <label htmlFor="email"></label>
        <input
          className="signup__input"
          placeholder="Email"
          required
          id="email"
          name="email"
          type="email"
          value={email || ""}
          onChange={handleEmailChange}
        />
        <hr className="signup__line" />
        <p className="signup__lable">Пароль</p>
        <label htmlFor="password"></label>
        <input
          className="signup__input"
          placeholder="Пароль"
          required
          id="password"
          name="password"
          type="password"
          value={password || ""}
          onChange={handlePasswordChange}
        />
        <hr className="signup__line" />
        <div className="signup__button-container">
          <button type="submit" className="signup__save-button">
            Войти
          </button>
        </div>
        <div className="signup__register-container">
          <p className="signup__register-title">Уже зарегистрированы?</p>
          <Link className="signup__link" to="/signup">
            Войти
          </Link>
        </div>
      </form>
    </section>
  );
}

export default SignUp;
