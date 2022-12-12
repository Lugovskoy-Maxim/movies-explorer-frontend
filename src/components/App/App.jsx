// import React from "react";
import React, { useState, useEffect } from 'react';
// import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext"; // слушатель пользователя
import { WindiwSizeContext } from "../../context/WindiwSizeContext"; // слушатель ширины окна
// import Login from "./Login";
// import Register from "./Register";
// import Loading from "./Promo";
import Header from "../Header/Header.js";
import MoviesExplorer from "../MoviesExplorer/MoviesExplorer.jsx";
import MoviesSaved from "../MoviesExplorer/MoviesSaved/MoviesSaved.jsx";
// import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
// import SignIn from "../SignIn/SignIn.jsx";
// import SignUp from "../SignUp/SignUp.jsx";
// import NotFaundPage from "../NotFaund/NotFaundPage.jsx";
// import ProtectedRoute from "./ProtectedRoute";
import './App.css';
import moviesDB from "../../utils/moviesBD"
import moviesSaveDB from "../../utils/moviesSaveBD"

function App() {
  const [currentUser, setCurrentUser] = useState();
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

  return(
    <CurrentUserContext.Provider value={currentUser}>
      <WindiwSizeContext.Provider value={windowSize}>
      <div className="App">
        <div className="page">
          <Header
          onLogin={currentUser}  />
          <MoviesExplorer
            moviesDB={moviesDB}
            moviesSaved={moviesSaveDB}
          />
          {/* <MoviesSaved
            moviesDB={moviesSaveDB} />
          <Main />
          <SignIn />
          <SignUp />
          <NotFaundPage /> */}


        <Footer />


        {/*       <Switch>
              <Route path="/">
                <Loading/>
              </Route>
              <Route path="/signin">
                <Login/>
              </Route>
              <Route path="/signup">
                <Register/>
              </Route>
              <ProtectedRoute
                exact
                path="/"
                component={Main}
              />
              <Route path="*">
                <Redirect to="/404" />
              </Route>
            </Switch>
  */}

        </div>
      </div>
      </WindiwSizeContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
