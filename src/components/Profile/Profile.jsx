import React, { useState, useContext, useEffect } from "react";
import "./Profile.css";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function Profile({ onSignOut, updateUserInfo }) {
  const currentUser = useContext(CurrentUserContext);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser.name, currentUser.email]);

  useEffect(() => {
    setButtonStatus(name !== currentUser.name || email !== currentUser.email);
  }, [name, email, currentUser]);

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (buttonStatus) {
      updateUserInfo(name, email);
    }
  };

  return (
    <section className="profile">
      <h1 className="profile__title">Привет, {currentUser.name}!</h1>
      <form onSubmit={handleSubmit} className="profile__form">
        <div className="profile__container">
          <p className="profile__label">Имя</p>
          <label htmlFor="name" />
          <input
            className="profile__input"
            placeholder={name}
            required
            id="name"
            name="name"
            type="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <hr className="profile__line" />
        <div className="profile__container">
          <p className="profile__label">E-mail</p>
          <label htmlFor="email" />
          <input
            className="profile__input"
            placeholder={email}
            required
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="profile__button-container">
          <button
            disabled={!buttonStatus}
            type="submit"
            className={`profile__save-button button ${
              buttonStatus ? "" : "profile__save-button-disable"
            }`}
          >
            Редактировать
          </button>
        </div>
        <button
          type="button"
          className="profile__signout-button button"
          onClick={onSignOut}
        >
          Выйти из аккаунта
        </button>
      </form>
    </section>
  );
}

export default Profile;
