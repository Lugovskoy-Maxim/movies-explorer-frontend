import React, { useState, useEffect, useCallback } from "react";
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
  const [mainMovies, setMainMovies] = useState();
  const [searchResult, setSearchResult] = useState({
    movies: [],
    visible: 0,
  });

  function render(obj) {
    return obj.slice(0, countItem);
  }

  function setFirstCoutn() {
    setCountItem(countItemsOnDisplay());
  }
  const [countItem, setCountItem] = useState(
    !localStorage.getItem("countItemonDisplay") === null
      ? countItemsOnDisplay()
      : localStorage.getItem("countItemonDisplay")
  );

  useEffect(() => {
    // const searchMainMovies = localStorage.getItem("searchResultMain");
    // setSearchResultMain((prev) => ({
    //     ...prev,
    //     movies: localStorage.getItem("searchResultMain").movies,
    //     visible: localStorage.getItem("searchResultMain").visible
    //   })
    //   )
    // setSearchResult((prev) => ({
    //   ...prev,
    //   movies: searchResults,
    //   visible: countItemsOnDisplay()})
    // )
  }, []);

  const AddMovies = () => {
    // const searchResultCopy = {...searchResult, visible: countItem + countItemsOnDisplay()}
    localStorage.setItem("countItemonDisplay", countItem + addItemOnDisplay());
    setCountItem(countItem + addItemOnDisplay());
  };
  const searchMainMovies = localStorage.getItem("searchResultMain");
  console.log(searchMainMovies);
  const [errorMessage, setErrorMessage] = useState("");
  const [moviesData, setMoviesData] = useState();
  const [searchResultMain, setSearchResultMain] = useState(!localStorage.getItem("searchResultMain") ? {
    movies: [],
    visible: 0,
  } : {movies: [searchMainMovies],
  visible: 0,}
  );

  const [filterStatus, setFilterStatus] = useState(
    !localStorage.getItem("filter") === null
      ? "false"
      : localStorage.getItem("filter")
  ); // Если нет в памяти тогда выключено, если есть то принимает значение

  function toggleFilterStatus() {
    filterStatus === "true"
      ? setFilterStatus("false")
      : setFilterStatus("true");
    filterStatus === "true"
      ? localStorage.setItem("filter", "false")
      : localStorage.setItem("filter", "true");
  }

  useEffect(() => {
    if (!searchValue === undefined) {
      setFilterStatus(localStorage.getItem("filter"));
      handleSearch(searchValue);
    }
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

  useEffect(() => {
    handleTokenCheck();
    getMainMoviesDB();
  }, []);

  const countItemsOnDisplay = () =>
    windowSize > 980 ? 12 : windowSize > 520 ? 8 : 5;
  const addItemOnDisplay = (windowSize) => (windowSize < 520 ? 3 : 2);

  // useEffect(()=>{
  //   if(loggedIn){
  //     handleSearch(searchValue);
  //   }
  // })

  const filter = (movies, filterStatus, searchValue) => {
    console.log(movies, searchValue, filterStatus);
    const matched = (str, match) =>
      str.toLowerCase().includes(match.toLowerCase());
    return (filterStatus === "true"
      ? movies.filter((movie) => movie.duration <= 40)
      : movies
    ).filter(
      ({ nameRU, nameEN, description }) =>
        matched(nameRU, searchValue) ||
        matched(nameEN, searchValue) ||
        matched(description, searchValue)
    );
  };



  function getMovies() {
      MoviesApi.getMovie()
        .then((res) => {
          setMoviesData(
            localStorage.setItem("moviesData", JSON.stringify(res))
          )
        })
        .catch((err) => console.log(err));
  }

  const handleSearch = (searchValue) => {
    setIsLoading(true);
    // setCountItem(countItemsOnDisplay());
    // localStorage.setItem("countItemonDisplay", countItemsOnDisplay());

    if (!localStorage.getItem("moviesData") && !localStorage.getItem("mainMovies")) {
      Promise.all([MoviesApi.getMovie(), mainApi.getMainMovies()])
      .then((res) => {
        /// BeatFilm
        const searchResults = filter(res[0], filterStatus, searchValue);
        console.log(searchResults)
        setSearchResult((prev) => ({
          ...prev,
          movies: searchResults,
          visible: countItemsOnDisplay(),
        }))
        localStorage.setItem("moviesData", JSON.stringify(res[0]));
        localStorage.setItem("searchResult", JSON.stringify(searchResults));

        ////// MAIN
        const searchResultsMain = filter(res[1], filterStatus, searchValue);
        console.log(searchResultsMain)
        setSearchResultMain((prev) => ({
          ...prev,
          movies: searchResultsMain,
          visible: countItemsOnDisplay(),
        }))
        localStorage.setItem("mainMovies", JSON.stringify(res[1]));
        localStorage.setItem("searchResultMain", JSON.stringify({ movies: searchResultsMain, visible: countItemsOnDisplay()}));
      })
      .catch((err) => {
        setErrorMessage(
          `Во время запроса произошла ${err}. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.`
        );
      })
      .finally(() => setIsLoading(false));
    } else {
        /// BeatFilm
        if(location.pathname === "/movies") {
        const moviesData = JSON.parse(localStorage.getItem("moviesData"));
        const searchResults = filter(moviesData, filterStatus, searchValue);
        console.log(searchResults)
        setSearchResult((prev) => ({
          ...prev,
          movies: searchResults,
          visible: countItemsOnDisplay(),
        }))
        localStorage.setItem("moviesData", JSON.stringify(moviesData));
        localStorage.setItem("searchResult", JSON.stringify(searchResults));
      } else {
        ////// MAIN
        const mainMoviesData = JSON.parse(localStorage.getItem("mainMovies"));
        const searchResultsMain = filter(mainMoviesData, filterStatus, searchValue);
        console.log(searchResultsMain)
        setSearchResultMain((prev) => ({
          ...prev,
          movies: searchResultsMain,
          visible: countItemsOnDisplay(),
        }))
        localStorage.setItem("mainMovies", JSON.stringify(mainMoviesData));
        localStorage.searchResultMain = JSON.parse({ movies: searchResultsMain.movies, visible:  countItemsOnDisplay()});
      }
      //// придумать как сохранить что бы подгружать при перезагрузки страницы
    localStorage.setItem("search", searchValue);
    setIsLoading(false);
  }};
  ////////////////
  // const handleMainSearch = (searchValue) => {
  //   setIsLoading(true);
  //   // setCountItem(countItemsOnDisplay());
  //   // localStorage.setItem("countItemonDisplay", countItemsOnDisplay());

  //   if (!localStorage.getItem("mainMovies")) {
  //     mainApi
  //       .getMainMovies()
  //       .then((res) => {
  //         const searchResults = filter(res, filterStatus, searchValue);
  //         console.log(searchResults);
  //         setSearchResultMain((prev) => ({
  //           ...prev,
  //           movies: searchResults,
  //           visible: countItemsOnDisplay(),
  //         }));

  //         localStorage.setItem("mainMovies", JSON.stringify(res));
  //         localStorage.setItem("searchResultMain", searchResults);
  //       })
  //       .catch((err) => {
  //         setErrorMessage(
  //           `Во время запроса произошла ${err.toLowerCase()}. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.`
  //         );
  //       })
  //       .finally(() => setIsLoading(false));
  //   } else {
  //     const moviesData = localStorage.getItem("mainMovies");
  //     const searchResults = filter(moviesData, filterStatus, searchValue);
  //     setSearchResultMain((prev) => ({
  //       ...prev,
  //       movies: searchResults,
  //       visible: countItemsOnDisplay(),
  //     }));
  //     localStorage.setItem("searchResultMain", searchResults);
  //   }

  //   localStorage.setItem("search", searchValue);
  //   setIsLoading(false);
  // };

  const getMainMoviesDB = () => {
      mainApi
        .getMainMovies()
        .then((res) => {
          console.log(res);
          localStorage.setItem("mainMovies", JSON.stringify(res));
          setMainMovies(res);
        })
        .catch((err) => {
          console.log(err);
        });
  };



  const handleTokenCheck = () => {
      mainApi
        .checkToken()
        .then((res) => {
          if (res) {
            setCurrentUser({ id: res.id, name: res.name, email: res.email });
            setLoggedIn(true);
            getMovies();
            getMainMoviesDB();
            location.pathname === "/signin"
              ? navigate("/")
              : navigate(`${location.pathname}`);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoggedIn(false);
        });
  };

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
          setLoggedIn(true);
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
          setCurrentUser((prev) => ({
            ...prev,
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
                      <HeaderNavigationMovies loggedIn={loggedIn} />
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
                        setFirstCoutn={setFirstCoutn}
                        countItem={countItem}
                        AddMovies={AddMovies}
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
                        onSearch={handleSearch}
                        setFirstCoutn={setFirstCoutn}
                        countItem={countItem}
                        AddMovies={AddMovies}
                        countItemsOnDisplay={countItemsOnDisplay}
                        toggleFilterstatus={toggleFilterStatus}
                        filterStatus={filterStatus}
                        mainMovies={mainMovies}
                        searchResult={searchResultMain}
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
