// import React from "react";
import React, { useState, useEffect } from 'react';
// import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext"; // слушатель пользователя
import { WindiwSizeContext } from "../../context/WindiwSizeContext"; // слушатель ширины окна
// import Login from "./Login";
// import Register from "./Register";
// import Loading from "./Promo";
import Header from "../Header/Header.jsx";
import Profile from "../Profile/Profile.jsx";
// import MoviesExplorer from "../MoviesExplorer/MoviesExplorer.jsx";
// import MoviesSaved from "../MoviesExplorer/MoviesSaved/MoviesSaved.jsx";
// import Main from "../Main/Main.jsx";
// import Footer from "../Footer/Footer.jsx";
// import SignIn from "../SignIn/SignIn.jsx";
// import SignUp from "../SignUp/SignUp.jsx";
// import NotFaundPage from "../NotFaund/NotFaundPage.jsx";
// import ProtectedRoute from "./ProtectedRoute";
import './App.css';
// import moviesDB from "../../utils/moviesBD"
// import moviesSaveDB from "../../utils/moviesSaveBD.js"


function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "Виталий",
    email: "Test@test.ru"
  });
  const [windowSize, setWindowSize] = React.useState(getWindowSize()); // слушатель размера окна для отображения и добавления разного количества карточек

  useEffect(() => { // обновление стейта переменной для подписки компонентов
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  function getWindowSize(){ // получение размера ширины окна
    const width = document.documentElement.clientWidth;
    return width;
  }

  function signOut(){
    setCurrentUser("");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <WindiwSizeContext.Provider value={windowSize}>
        <div className="App">
          <div className="page">
          <Header />
            <Profile
            signOut={signOut}
            />

         {/* <MoviesExplorer
            moviesDB={moviesDB}
            moviesSaveDB={moviesSaveDB}
          />
            <MoviesSaved
            moviesDB={moviesSaveDB}
            />
           <Main />
          <SignIn />
          <SignUp />
          <NotFaundPage />


        <Footer />
  */}
          </div>
        </div>
      </WindiwSizeContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
