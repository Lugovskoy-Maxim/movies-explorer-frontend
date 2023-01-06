import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";
import Logo from "../../images/logo.svg";

function SignUp(props) {
  const [name, setName] = useState();
  const [nameValid, setNameValid] = useState(null);
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState();
  const [emailValid, setEmailValid] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState();
  const [passwordValid, setPasswordValid] = useState(null);
  const [passwordError, setPasswordError] = useState("");
  const [availableButton, setAvailableButton] = useState(false);

  useEffect(() => {
    toggleSubmitButton();
  }, [name, email, password]);

  const checkValid = (type, value) => {
    const regExpName = /^[а-яА-Яa-zA-Z ]{2,20}$/;
    if (type === "name") {
      if (regExpName.test(String(value).toLowerCase())) {
        setNameValid(true);
        setNameError("");
      } else {
        setNameValid(false);
        setNameError(errorMessageName(value));
      }
    } else if (type === "email") {
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

  const errorMessageName = (value) => {
    if (/[0-9_!?@#$%^&*(/)/]/i.test(value)) {
      return "Имя не должно содержать цыфры и символы";
    } else if (value.length <= 2 || value.length >= 20) {
      return "Дилина имени должна быть не менее 2 символов и не более 20";
    } else {
      return "Ошибка, неверное занчение имени";
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
      return "signup__line";
    } else if (props) {
      return "signup__line signup__line-valid";
    } else {
      return "signup__line signup__line-error";
    }
  };

  function onNameChange(evt) {
    checkValid(evt.target.id, evt.target.value);
    setName(evt.target.value);
  }

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
    // функция отправки прокинутая пропсом
    setEmail("");
    setPassword("");
  }

  function toggleSubmitButton() {
    if(nameValid === true && emailValid === true && passwordValid === true ){
      setAvailableButton(true)
    } else {
      setAvailableButton(false);
    }
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
          pattern="[а-яА-Яa-zA-Z ]{2,20}$"
          required
          id="name"
          name="name"
          type="text"
          value={name || ""}
          onChange={onNameChange}
        />
        <hr className={lineColorEffect(nameValid)} />
        <p
          className={`signup__field-error ${
            nameValid ? "" : "signup__field-error-active"
          }`}
          id="name-error"
        >
          {nameError}
        </p>
        <p className="signup__lable">E-mail</p>
        <label htmlFor="email"></label>
        <input
          className="signup__input"
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
          className={`signup__field-error ${
            emailValid ? "" : "signup__field-error-active"
          }`}
          id="email-error"
        >
          {emailError}
        </p>
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
          onChange={onPasswordChange}
        />
        <hr className={lineColorEffect(passwordValid)} />
        <p
          className={`signup__field-error ${
            passwordValid ? "" : "signup__field-error-active"
          }`}
          id="password-error"
        >
          {passwordError}
        </p>
        <div className="signup__button-container">
          <button
            type="submit"
            disabled={availableButton ? "" : "disable"}
            className={`signup__save-button ${
              availableButton ? "" : "signup__save-button-disable"
            }`}
          >
            Зарегистрироваться
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
