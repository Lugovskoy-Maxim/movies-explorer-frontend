import React, { useState, useContext, useEffect } from "react";
import { useNavigate  } from "react-router-dom";
import "./Profile.css";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function Profile({ onSignOut, updateUserInfo }) {

  const currentUser = useContext(CurrentUserContext);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [name, setName ] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const navigate = useNavigate();

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  useEffect(()=> {
    if(name === currentUser.name && email === currentUser.email){
      setButtonStatus(false);
      // стейт для передачи информации в попап или под импутами
    } else {
      setButtonStatus(true);
    }
  })

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();    // функция блокирующая отправку запроса без изменения данных
    if(buttonStatus === true){
      updateUserInfo(name, email)
    }
  }

  return (
    <>
    <section className="profile">
      <h1 className="profile__title">Привет, {currentUser.name}!</h1>
      <form onSubmit={handleSubmit} className="profile__form">
        <div className="profile__container">
          <p className="profile__lable">Имя</p>
          <label htmlFor="name"></label>
          <input
            className="profile__input"
            placeholder={name}
            required
            id="name"
            name="name"
            type="name"
            value={name }
            onChange={handleNameChange}
          />
        </div>
        <hr className="profile__line" />
        <div className="profile__container">
          <p className="profile__lable">E-mail</p>
          <label htmlFor="email"></label>
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
          type="submit" className={`profile__save-button button ${buttonStatus?  "" : "profile__save-button-disable" }`}>
            Редактировать
          </button>
        </div>
        <button

            type="button"
            className="profile__signout-button button"
            onClick={
              () => {
                onSignOut();
              }
            }
          >
            Выйти из аккаунта
          </button>
      </form>

    </section>
    </>
  );
}

export default Profile;
