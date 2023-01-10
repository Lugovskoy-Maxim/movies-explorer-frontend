import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
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

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "Виталий",
    email: "test@test.ru"
  });
  console.log(currentUser)
  const [windowSize, setWindowSize] = useState(getWindowSize()); // слушатель размера окна для отображения и добавления разного количества карточек

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
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="*" element={<NotFaundPage />} />
            </Routes>
          </div>
        </div>
      </WindiwSizeContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
