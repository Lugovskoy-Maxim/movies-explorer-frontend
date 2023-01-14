import React, { useState, useEffect, useNav } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext"; // слушатель пользователя
import { WindiwSizeContext } from "../../context/WindiwSizeContext"; // слушатель ширины окна

import Promo from "../Promo/Promo.jsx";
import Techs from "../Techs/Techs.jsx";
import AboutProject from "../AboutProject/AboutProject.jsx";
import AboutMe from "../AboutMe/AboutMe.jsx";
import Header from "../Header/Header.jsx";
import HeaderNavigationProfile from "../Header/__nav-profile/Header__nav-profile"
import HeaderNavigationMovies from "../Header/__nav-movies/Header__nav-movies"
import Footer from "../Footer/Footer.jsx";
import Profile from "../Profile/Profile.jsx";
import MoviesExplorer from "../MoviesExplorer/MoviesExplorer.jsx";
import MoviesSaved from "../MoviesExplorer/MoviesSaved/MoviesSaved.jsx";
import Main from "../Main/Main.jsx";
import SignIn from "../SignIn/SignIn.jsx";
import SignUp from "../SignUp/SignUp.jsx";
import NotFaundPage from "../NotFaund/NotFaundPage.jsx";
import "./App.css";
import moviesDB from "../../utils/moviesBD";
import moviesSaveDB from "../../utils/moviesSaveBD.js";
import * as mainApi from "../../utils/MainApi";
import * as MoviesApi from "../../utils/MoviesApi";

function App() {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState("");
  const [windowSize, setWindowSize] = useState(getWindowSize()); // слушатель размера окна для отображения и добавления разного количества карточек
  const [loggedIn, setLoggedIn] = useState(false);

  function handleTokenCheck() {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      mainApi
        .checkToken(jwtToken)
        .then((res) => {
          if (res) {
            setCurrentUser({name: res.name, email: res.email});
            setLoggedIn(true);
            // history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    handleTokenCheck();
  }, []);


  useEffect(() => {
    // обновление стейта переменной для подписки компонентов
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function getWindowSize() {
    // получение размера ширины окна
    const width = document.documentElement.clientWidth;
    return width;
  }

  function signOut() {
    setCurrentUser("");
  }

  function handleAuthorize(email, password) {
    mainApi
      .authorize(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("jwtToken", res.jwtToken);
          handleTokenCheck();
          // history.push("/");
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRegister(name, email, password) {
    mainApi
      .register(name, email, password)
      .then((res) => {
        if (res) {
          setCurrentUser({ name: res.name, email: res.email })
          handleAuthorize(email, password)
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      // .finally();
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <WindiwSizeContext.Provider value={windowSize}>
        <div className="app">
          <div className="page">
            <Routes>
              <Route path="/" element={
                <>
                  <Header>
                    <HeaderNavigationProfile/>
                  </Header>
                  <Main>
                    <Promo />
                    <AboutProject />
                    <Techs />
                    <AboutMe />
                  </Main>
                  <Footer/>
                </>
              } />
              <Route
                path="/profile"
                element={<Profile onSignOut={signOut} />}
              />
              <Route
                path="/movies"
                element={
                  <>
                  <Header>
                  <HeaderNavigationProfile/>
                  <HeaderNavigationMovies/>
                  </Header>
                  <Main>
                    <MoviesExplorer
                      moviesDB={moviesDB}
                      moviesSaveDB={moviesSaveDB}
                    />
                  </Main>
                  <Footer/>
                </>
                }
              />
              <Route
                path="/saved-movies"
                element={
                  <>
                  <Header>
                      <HeaderNavigationProfile />
                      <HeaderNavigationMovies />
                    </Header>
                    <Main>
                    <MoviesSaved moviesDB={moviesSaveDB} />
                  </Main>
                  <Footer/>
                </>
}
              />
              <Route path="/signup" element={<SignUp
                register={handleRegister}
              />} />
              <Route path="/signin" element={<SignIn
                login={handleAuthorize}
              />} />
              <Route path="*" element={<NotFaundPage />} />
            </Routes>
          </div>
        </div>
      </WindiwSizeContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
