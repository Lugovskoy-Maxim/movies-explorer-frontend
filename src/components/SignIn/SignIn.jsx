import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignIn.css";
import Logo from "../../images/logo.svg";
import { useEffect } from "react";

function SignIn(props) {
  const [email, setEmail] = useState();
  const [emailValid, setEmailValid] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState();
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
      const regExpPassword = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$/;
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
    } else if (!/[0-9]/.test(value)) {
      return "Пароль должен содержать минимум 1 цифру";
    } else if (!/[a-zA-Z]/.test(value)) {
      return "Пароль должен содержать минимум 1 букву";
    } else if (/[!@#$%^&*]/.test(value)) {
      return "Пароль должен состоять только из латинских символов и цифр";
    } else if (/[a-яА-Я]/.test(value)) {
      return "Пароль должен состоять только из латинских символов и цифр";
    }
  };

  const lineColorEffect = (props) => {
    if (props == null) {
      return "signin__line";
    } else if (props) {
      return "signin__line signin__line-valid";
    } else {
      return "signin__line signin__line-error";
    }
  };

  function onEmailChange(evt) {
    checkValid(evt.target.id, evt.target.value);
    setEmail(evt.target.value);
  }
  function onPasswordChange(evt) {
    checkValid(evt.target.id, evt.target.value);
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.login(email, password);
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
          autoComplete="off"
          name="email"
          type="email"
          value={email || ""}
          onChange={onEmailChange}
        />
        <hr className={lineColorEffect(emailValid)} />
        <p
          className={`signin__field-error ${
            emailValid ? "" : "signin__field-error-active"
          }`}
          id="email-error"
        >
          {emailError}
        </p>
        <p className="signin__lable">Пароль</p>
        <label htmlFor="password"></label>
        <input
          autoComplete="off"
          className="signin__input"
          placeholder="Пароль"
          required
          id="password"
          name="password"
          type="password"
          value={password || ""}
          onChange={onPasswordChange}
        />
        <hr className={lineColorEffect(passwordValid)} />
        <p
          className={`signin__field-error ${
            passwordValid ? "" : "signin__field-error-active"
          }`}
          id="password-error"
        >
          {passwordError}
        </p>
        <div className="signin__button-container">
          <button
            type="submit"
            disabled={availableButton ? "" : "disable"}
            className={`signin__save-button ${
              availableButton ? "" : "signin__save-button-disable"
            }`}
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
