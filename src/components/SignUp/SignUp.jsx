import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import Logo from "../../images/logo.svg";
import InputField from "../InputField/InputField";

function SignUp(props) {
  const [name, setName] = useState("");
  const [nameValid, setNameValid] = useState(null);
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
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
      return "Имя не должно содержать цифры и символы";
    } else if (value.length <= 2 || value.length >= 20) {
      return "Длина имени должна быть не менее 2 символов и не более 20";
    } else {
      return "Ошибка, неверное значение имени";
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

  const onNameChange = (evt) => {
    checkValid(evt.target.id, evt.target.value);
    setName(evt.target.value);
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
    props.register(name, email, password);
    setEmail("");
    setPassword("");
  };

  const toggleSubmitButton = () => {
    if (nameValid === true && emailValid === true && passwordValid === true) {
      setAvailableButton(true);
    } else {
      setAvailableButton(false);
    }
  };

  return (
    <section className="signup">
      <a className="signup__link-logo" href="/">
        <img className="signup__logo" alt="Логотип" src={Logo} />
      </a>
      <h1 className="signup__title">Добро пожаловать!</h1>
      <form onSubmit={handleSubmit} className="signup__form">
        <InputField
          type="name"
          placeholder="Имя"
          value={name}
          onChange={onNameChange}
          isValid={nameValid}
          errorMessage={nameError}
          className={'signup'}
        />
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={onEmailChange}
          isValid={emailValid}
          errorMessage={emailError}
          className={'signup'}
        />
        <InputField
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={onPasswordChange}
          isValid={passwordValid}
          errorMessage={passwordError}
          className={'signup'}
        />
        <div className="signup__button-container">
          <button
            type="submit"
            disabled={!availableButton}
            className={`signup__save-button ${availableButton ? "" : "signup__save-button-disable"}`}
          >
            Зарегистрироваться
          </button>
        </div>
        <div className="signup__register-container">
          <p className="signup__register-title">Уже зарегистрированы?</p>
          <Link className="signup__link" to="/signin">
            Войти
          </Link>
        </div>
      </form>
    </section>
  );
}

export default SignUp;