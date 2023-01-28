import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext"; // слушатель пользователя
import { WindiwSizeContext } from "../../context/WindiwSizeContext"; // слушатель ширины окна

import Promo from "../Promo/Promo.jsx";
import Techs from "../Techs/Techs.jsx";
import AboutProject from "../AboutProject/AboutProject.jsx";
import AboutMe from "../AboutMe/AboutMe.jsx";
import Header from "../Header/Header.jsx";
import HeaderNavigationProfile from "../Header/__nav-profile/Header__nav-profile";
import HeaderNavigationMovies from "../Header/__nav-movies/Header__nav-movies";
import Footer from "../Footer/Footer.jsx";
import Profile from "../Profile/Profile.jsx";
import MoviesExplorer from "../MoviesExplorer/MoviesExplorer.jsx";
import MoviesSaved from "../MoviesExplorer/MoviesSaved/MoviesSaved.jsx";
import Main from "../Main/Main.jsx";
import SignIn from "../SignIn/SignIn.jsx";
import SignUp from "../SignUp/SignUp.jsx";
import NotFaundPage from "../NotFaund/NotFaundPage.jsx";
import "./App.css";
// import moviesDB from "../../utils/moviesBD";
// import moviesSaveDB from "../../utils/moviesSaveBD.js";
import * as mainApi from "../../utils/MainApi";
import * as MoviesApi from "../../utils/MoviesApi";
import ProtectedRoute from "../protectedRoute";
// import { filterDuration, filter } from "../../utils/searchFilter.js";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");
  const [windowSize, setWindowSize] = useState(getWindowSize()); // слушатель размера окна для отображения и добавления разного количества карточек
  const [loggedIn, setLoggedIn] = useState(false);
  const jwtToken = localStorage.getItem("jwtToken");
  const searchValue = localStorage.getItem("search");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState({
    movies: [],
    visible: 0,
  });


  const [errorMessage, setErrorMessage] = useState("");
  const [moviesData, setMoviesData] = useState();
  const [mainMovies, setMainMovies] = useState();
  const [filterStatus, setFilterStatus] = useState(!localStorage.getItem("filter") === null ? "false" : localStorage.getItem("filter")); // Если нет в памяти тогда выключено, если есть то принимает значение

  function toggleFilterStatus() {
    filterStatus === "true"
      ? setFilterStatus("false")
      : setFilterStatus("true");
    filterStatus === "true"
      ? localStorage.setItem("filter", "false")
      : localStorage.setItem("filter", "true");
  }


        useEffect(() => {
          setFilterStatus(localStorage.getItem("filter"));
          handleSearch(searchValue)
        }, [])



  const countItemsOnDisplay = () =>
    windowSize > 980 ? 12 : windowSize > 520 ? 8 : 5;
  const addItemOnDisplay = (windowSize) => (windowSize > 520 ? 3 : 2);

  // useEffect(()=>{
  //   if(loggedIn){
  //     handleSearch(searchValue);
  //   }
  // })

  ////////////////////////////////////////////////////

  const filter = (movies, filterStatus, searchValue) => {
    console.log(movies, searchValue, filterStatus);
    const matched = (str, match) =>
      str.toLowerCase().includes(match.toLowerCase());
    return (filterStatus === "true"
      ? movies.filter((movie) => movie.duration <= 40)
      : movies)
    .filter(
      ({ nameRU, nameEN, description }) =>
        matched(nameRU, searchValue) ||
        matched(nameEN, searchValue) ||
        matched(description, searchValue)
    );
  };


  const handleSearch = (searchValue) => {
    setIsLoading(true);

    if (!localStorage.getItem("moviesData")) {
      MoviesApi.getMovie()
        .then((res) => {
          const searchResults = filter(res, filterStatus, searchValue);
          console.log(searchResults);
          setSearchResult((prev) => ({
            ...prev,
            movies: searchResults,
            visible: countItemsOnDisplay(),
          }));

          localStorage.setItem("moviesData", JSON.stringify(res));
          localStorage.setItem("searchResult", JSON.stringify(searchResults));
        })
        .catch((err) => {
          setErrorMessage(
            `Во время запроса произошла ${err}. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.`
          );
        })
        .finally(() => setIsLoading(false));
    } else {
      const moviesData = JSON.parse(localStorage.getItem("moviesData"));
      const searchResults = filter(moviesData, filterStatus, searchValue);
      setSearchResult((prev) => ({
        ...prev,
        movies: searchResults,
        visible: countItemsOnDisplay(),
      }))
      localStorage.setItem("searchResult", JSON.stringify(searchResults));
    }

    localStorage.setItem("search", searchValue);
    setIsLoading(false);
  };
  ////////////////

  function getMainMovies() {
    mainApi
      .getMainMovie()
      .then((res) => {
        setMainMovies(localStorage.setItem("mainMovies", JSON.stringify(res)));
      })
      .catch((err) => {
        localStorage.removeItem("mainMovies");
        console.log(err);
      });
  }
  function getMovies() {
    if (!localStorage.getItem("moviesData")) {
      MoviesApi.getMovie()
        .then((res) => {
          setMoviesData(
            localStorage.setItem("moviesData", JSON.stringify(res))
          );
          // localStorage.setItem("shortFilms", JSON.stringify((res) =>{
          //   res.filter(({ duration }) => duration <= 40);
          // }));
        })
        .catch((err) => console.log(err));
    } else {
      MoviesApi.getMovie().then((res) => {
        setMoviesData(localStorage.setItem("moviesData", JSON.stringify(res)));
        console.log(localStorage.getItem("moviesData"));
        // localStorage.setItem("shortFilm", filterDuration(localStorage.getItem("moviesData")))
      });
    }
  }

  // console.log(localStorage.getItem("shortFilm"));

  function handleTokenCheck() {
    if (jwtToken) {
      mainApi
        .checkToken(jwtToken)
        .then((res) => {
          if (res) {
            setCurrentUser({ id: res.id, name: res.name, email: res.email });
            setLoggedIn(true);
            getMovies();
            location.pathname === "/signin"
              ? navigate("/movies")
              : navigate(`${location.pathname}`);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoggedIn(false);
        });
    }
  }

  // useEffect(() => {
  //   handleTokenCheck();
  // getMainMovies()
  // }, [loggedIn]);

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
    setLoggedIn(false);
    localStorage.clear();
    setCurrentUser("");
  }

  function handleAuthorize(email, password) {
    mainApi
      .authorize(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("jwtToken", res.jwtToken);
          setLoggedIn(true);
          console.log(res);
          console.log(currentUser);
          navigate("/movies");
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
          handleAuthorize(email, password);
          navigate("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // .finally();
  }

  function updateUserInfo(name, email) {
    mainApi
      .updateUserUnfo(name, email)
      .then((res) => {
        if (res) {
          setCurrentUser((currentUser) => ({
            ...currentUser,
            name: res.name,
            email: res.email,
          }));
          console.log(currentUser);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <WindiwSizeContext.Provider value={windowSize}>
        <div className="app">
          <div className="page">
            <Routes>
              <Route
                loggedIn={loggedIn}
                exact
                path="/"
                element={
                  <>
                    <Header>
                      <HeaderNavigationProfile />
                      <HeaderNavigationMovies
                      loggedIn={loggedIn}
                      />
                    </Header>
                    <Main>
                      <Promo />
                      <AboutProject />
                      <Techs />
                      <AboutMe />
                    </Main>
                    <Footer />
                  </>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute user={loggedIn}>
                    <Profile
                      updateInfo={updateUserInfo}
                      onSignOut={signOut}
                      updateUserInfo={updateUserInfo}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/movies"
                element={
                  // <ProtectedRoute user={loggedIn}>
                  <>
                    <Header>
                      <HeaderNavigationProfile />
                      <HeaderNavigationMovies />
                    </Header>
                    <Main>
                      <MoviesExplorer
                        countItemsOnDisplay={countItemsOnDisplay}
                        toggleFilterstatus={toggleFilterStatus}
                        filterStatus={filterStatus}
                        onSearch={handleSearch}
                        mainMovies={mainMovies}
                        searchResult={searchResult}
                      />
                    </Main>
                    <Footer />
                  </>
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/saved-movies"
                element={
                  <ProtectedRoute user={loggedIn}>
                    <Header>
                      <HeaderNavigationProfile />
                      <HeaderNavigationMovies />
                    </Header>
                    <Main>
                      <MoviesSaved
                        // onSearch={handleSearch}
                        mainMovies={mainMovies}
                      />
                    </Main>
                    <Footer />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/signup"
                element={<SignUp register={handleRegister} />}
              />
              <Route
                path="/signin"
                element={<SignIn login={handleAuthorize} />}
              />
              <Route path="*" element={<NotFaundPage />} />
            </Routes>
          </div>
        </div>
      </WindiwSizeContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
