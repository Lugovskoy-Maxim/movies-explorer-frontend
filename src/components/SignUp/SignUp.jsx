import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";
import Logo from "../../images/logo.svg";

function SignUp(props) {
  const [name, setName ] = useState("");
  const [nameValid, setNameValid] = useState("")
  const [nameError, setNameError] = useState("")
  const [email, setEmail ] = useState("");
  const [password, setPassword] = useState("");

  const checkNameValid = (name) => {
    const regName =  /^[а-яА-Яa-zA-Z ]{2,20}$/;
    if (regName.test(String(name).toLowerCase())) {
      console.log(name);
      setNameValid("true");
      setNameError("")
    } else{
      console.log(name);
      setNameValid("false");
      errorMessageName(name)
    }
  }

  const errorMessageName = (name) =>{
    if((/[0-9_!?@#$%^&*(/)/]/i.test(name))){
      return setNameError("Имя не должно содержать цыфры и символы")
    } else if (name.length <= 2 || name.length >= 20) {
      return setNameError("Поле не может быть пустым")
    } else if (name.length = 0) {
      return setNameError("Дилина имени должна быть не менее 2 символои и не более 20")
    } else {
      return setNameError("Ошибка, неверное занчение имени")
    }
  }

  function onNameChange(evt) {

    checkNameValid(evt.target.value);
    setName(evt.target.value);
  }

  function onEmailChange(evt) {
    setEmail(evt.target.value);
  }

  // НУЖНА ВАЛИДАЦИЯ
  // регулярки
  // ^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$ name
  // /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/ email
  // (?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$ password
  function onPasswordChange(evt) {
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
          onChange={onNameChange}
        />
        <hr className="signup__line" />
        <span className="signup__field-error" id="name-error">
          { nameError }
        </span>
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
          onChange={onEmailChange}
        />
        <hr className="signup__line" />
        <span className="signup__field-error" id="email-error">
          {""}
        </span>
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
        <hr className="signup__line" />
        <span className="signup__field-error" id="password-error">
          {"sdsd"}
        </span>
        <div className="signup__button-container">
          <button type="submit" className="signup__save-button">
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
