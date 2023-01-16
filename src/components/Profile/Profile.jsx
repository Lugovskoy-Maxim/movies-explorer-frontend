import React, { useState } from "react";
import { useNavigate  } from "react-router-dom";
import "./Profile.css";
import Header from "../Header/Header.jsx";
import HeaderNavigationProfile from "../Header/__nav-profile/Header__nav-profile"
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { useEffect } from "react";

function Profile({ onSignOut, updateInfo }) {

  const currentUser = React.useContext(CurrentUserContext);
  const HelloName = currentUser.name;
  const [name, setName ] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const navigate = useNavigate();

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    updateInfo(name, email);
  }

  // React.useEffect(()=> {
  //   checkUser()
  // }, [currentUser])

  // function checkUser(){
  //   if (!typeof currentUser === 'object'){
  //     return navigate("/404")
  //   } else {
  //     setName(currentUser.name)
  //     setEmail(currentUser.email)
  //   }
  // }

  return (
    <>
    <Header>
      {HeaderNavigationProfile()}
    </Header>
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
          <button type="submit" className="profile__save-button button">
            Редактировать
          </button>
        </div>
        <button
            type="button"
            className="profile__signout-button button"
            onClick={
              () => {
                onSignOut()
                navigate("/signin")
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
