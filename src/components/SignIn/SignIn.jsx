import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SignIn.css";
import Logo from "../../images/logo.svg";
import InputField from "../InputField/InputField";

function SignIn(props) {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(null);
  const [passwordError, setPasswordError] = useState("");
  const [availableButton, setAvailableButton] = useState(false);

  useEffect(() => {
    toggleSubmitButton();
  }, [email, password]);

  function toggleSubmitButton() {
    if (emailValid === true && passwordValid === true) {
      setAvailableButton(true);
    } else {
      setAvailableButton(false);
    }
  }

  const checkValid = (type, value) => {
    if (type === "email") {
      const regExpEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (regExpEmail.test(String(value).toLowerCase())) {
        setEmailValid(true);
        setEmailError("");
      } else {
        setEmailValid(false);
        setEmailError(errorMessageEmail(value));
      }
    } else if (type === "password") {
      const regExpPassword = /[a-zA-Z0-9]{8,}$/;
      if (regExpPassword.test(String(value).toLowerCase())) {
        setPasswordValid(true);
        setPasswordError("");
      } else {
        setPasswordValid(false);
        setPasswordError(errorMessagePassword(value));
      }
    }
  };

  const errorMessageEmail = () => {
    return "Неверный формат почты, пример почты: email@domain.com";
  };

  const errorMessagePassword = (value) => {
    if (value.length < 8) {
      return "Пароль должен состоять минимум из 8 символов";
    } else if (/[!@#$%^&*]/.test(value)) {
      return "Пароль должен состоять только из латинских символов и цифр";
    } else if (/[a-яА-Я]/.test(value)) {
      return "Пароль должен состоять только из латинских символов и цифр";
    }
  };

  const onEmailChange = (evt) => {
    checkValid(evt.target.id, evt.target.value);
    setEmail(evt.target.value);
  };

  const onPasswordChange = (evt) => {
    checkValid(evt.target.id, evt.target.value);
    setPassword(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.login(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <section className="signin">
      <a className="signin__link-logo" href="/">
        <img className="signin__logo" alt="Логотип" src={Logo} />
      </a>
      <h1 className="signin__title">Рады видеть!</h1>
      <form onSubmit={handleSubmit} className="signin__form">
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={onEmailChange}
          isValid={emailValid}
          errorMessage={emailError}
          className={'signin'}
        />
        <InputField
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={onPasswordChange}
          isValid={passwordValid}
          errorMessage={passwordError}
          className={'signin'}
        />
        <div className="signin__button-container">
          <button
            type="submit"
            disabled={!availableButton}
            className={`signin__save-button ${availableButton ? "" : "signin__save-button-disable"}`}
          >
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