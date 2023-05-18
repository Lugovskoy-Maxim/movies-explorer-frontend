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
import Popup from "../Popup/Popup";
import "./App.css";
import * as mainApi from "../../utils/MainApi";
import * as MoviesApi from "../../utils/MoviesApi";
import ProtectedRoute from "../protectedRoute";
import { isLoggedIn, getCurrentUser } from "../helpers/authHelpers";
import { getMovies, getMainMoviesDB } from "../helpers/apiHelpers";
import { searchMovies } from "../helpers/searchHelper";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({
    id: 0,
    name: "",
    email: "",
  });
  const [windowSize, setWindowSize] = useState(getWindowSize()); // слушатель размера окна для отображения и добавления разного количества карточек
  const [loggedIn, setLoggedIn] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [mainMovies, setMainMovies] = useState([]);
  const [serverMessage, setServerMessage] = useState("");
  const [moviesData, setMoviesData] = useState();
  const [popupOpened, setPopupOpened] = useState(false);
  const [searchResult, setSearchResult] = useState(() => {
    const saved = localStorage.getItem("searchResult");
    const initialValue = JSON.parse(saved);
    return (
      initialValue || {
        movies: [],
      }
    );
  });
  const [searchResultMain, setSearchResultMain] = useState({
    movies: [],
  });

  function closePopup() {
    setTimeout(() => {
      setServerMessage("");
      setPopupOpened(false);
    }, 500);
  }

  function removeServerMessage() {
    setTimeout(() => {
      setServerMessage("");
    }, 1500);
  }

  useEffect(() => {
    setPopupOpened(true);
    closePopup();
    removeServerMessage();
  }, [serverMessage]);

  useEffect(() => {
    handleTokenCheck();
    // getMainMoviesDB())
    getMainMoviesDB(setMainMovies);
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

  const countItemsOnDisplay = () =>
    windowSize > 980 ? 12 : windowSize > 520 ? 8 : 5;
  const addItemOnDisplay = (windowSize) => (windowSize < 520 ? 3 : 2);

  const filter = (movies, filterStatus, searchValue) => {
    console.log(movies, filterStatus, searchValue)
    const matched = (str, match) =>
      str.toLowerCase().includes(match.toLowerCase());
    return (filterStatus === true
      ? movies.filter((movie) => movie.duration <= 40)
      : movies
    ).filter(
      ({ nameRU, nameEN }) =>
        matched(nameRU, searchValue) ||
        matched(nameEN, searchValue)
    );
  };

  function setFirstCoutn(location) {
    if (location === "/movies") {
      setCountItem(countItemsOnDisplay());
      localStorage.setItem("countItemonDisplay", countItemsOnDisplay());
    } else if (location === "/saved-movies") {
      setCountItemMain(countItemsOnDisplay());
      localStorage.setItem("countItemonDisplayMain", countItemsOnDisplay());
    }
  }

  const [countItem, setCountItem] = useState(
    !localStorage.getItem("countItemonDisplay") === null
      ? countItemsOnDisplay()
      : localStorage.getItem("countItemonDisplay")
  );

  const [countItemMain, setCountItemMain] = useState(() => {
    !localStorage.getItem("countItemonDisplayMain") === null
      ? countItemsOnDisplay()
      : localStorage.getItem("countItemonDisplayMain");
  });

  const addMovies = () => {
    localStorage.setItem("countItemonDisplay", countItem + addItemOnDisplay());
    setCountItem(countItem + addItemOnDisplay());
  };

  const addMoviesMain = () => {
    localStorage.setItem(
      "countItemonDisplayMain",
      countItemMain + addItemOnDisplay()
    );
    setCountItemMain(countItemMain + addItemOnDisplay());
  };

  const handleSearch = (searchValue, filterStatus) => {
    setIsLoading(true);

    if (!localStorage.getItem("moviesData")) {
      MoviesApi.getMovie()
        .then((res) => {
          const searchResults = filter(res, filterStatus, searchValue);
          setSearchResult((prev) => ({
            ...prev,
            movies: searchResults,
          }));
          localStorage.setItem("moviesData", JSON.stringify(res));
          const object = {
            movies: searchResults,
          };
          localStorage.setItem("searchResult", JSON.stringify(object));
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    } else {
      const moviesData = JSON.parse(localStorage.getItem("moviesData"));
      const searchResults = filter(moviesData, filterStatus, searchValue);
      setSearchResult((prev) => ({
        ...prev,
        movies: searchResults,
      }));
      const object = {
        movies: searchResults,
      };
      localStorage.setItem("searchResult", JSON.stringify(object));
      localStorage.setItem("search", searchValue);
      setIsLoading(false);
    }
  };

  function handleSearchMain(searchValue, filterStatus) {
    setIsLoading(true);
    if (mainMovies.length === 0) {
      mainApi
        .getMainMovies()
        .then((res) => {
          const searchResultsMain = filter(res, filterStatus, searchValue);
          setSearchResultMain((prev) => ({
            ...prev,
            movies: searchResultsMain,
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const searchResultsMain = filter(mainMovies, filterStatus, searchValue);
      setSearchResultMain((prev) => ({
        ...prev,
        movies: searchResultsMain,
      }));

      setIsLoading(false);
    }
  }

  const handleTokenCheck = () => {
    mainApi
      .checkToken()
      .then((res) => {
        setCurrentUser({ id: res._id, name: res.name, email: res.email });
        setLoggedIn(true);
        getMovies(setMoviesData);
        // getMovies();
        // getMainMoviesDB();
        getMainMoviesDB(setMainMovies);
        location.pathname === "/signin"
          ? navigate("/movies")
          : navigate(`${location.pathname}`);
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
    mainApi
      .signout()
      .then((res) => {
        console.log(res);
        navigate("/");
        setLoggedIn(false);
        localStorage.clear();
        setCurrentUser({ id: 0, name: "", email: "" });
        setSearchResult({
          movies: [],
        });
        setMainMovies([]);
        setMoviesData([]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAuthorize(email, password) {
    mainApi
      .authorize(email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          navigate("/movies");
          handleTokenCheck();
        }
      })
      .catch((err) => {
        console.log(err);
        setServerMessage(`Неверная почта или пароль`);
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
  }

  function updateUserInfo(name, email) {
    mainApi
      .updateUserInfo(name, email)
      .then((res) => {
        setCurrentUser((prev) => ({
          ...prev,
          id: res.user._id,
          name: res.user.name,
          email: res.user.email,
        }));
        setServerMessage("Информация успешно обнавлена");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSavedMovies(movie) {
    const isSaved = movie.owner === currentUser.id;
    if (isSaved === true) {
      mainApi
        .removeMovie(movie._id) /// нужно засунуть сохраненный фильм если он есть, если нет то не нужно засовывать
        .then((res) => {
          setMainMovies(mainMovies.filter((i) => i !== movie)); // удалить фильм который я отправлял из стейта
          const newArr = localStorage.getItem("searchResultMain");
          const saved = JSON.parse(newArr).movies;
          const removeIndex = saved
            .map((item) => item.nameRU)
            .indexOf(movie.nameRU);
          saved.splice(removeIndex, 1);

          setSearchResultMain((prev) => ({
            ...prev,
            movies: saved,
          }))
          const object = {
            movies: saved,
          };
          localStorage.setItem("searchResultMain", JSON.stringify(object));

        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      mainApi
        .createMovie(movie)
        .then((newMovie) => {
            setMainMovies([...mainMovies, newMovie]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
                      <HeaderNavigationProfile loggedIn={loggedIn} />
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
                  <ProtectedRoute path="/profile" user={loggedIn}>
                    <Header>
                      <HeaderNavigationProfile loggedIn={loggedIn} />
                      <HeaderNavigationMovies loggedIn={loggedIn} />
                    </Header>
                    <Profile
                      onSignOut={signOut}
                      updateUserInfo={updateUserInfo}
                    />
                    <Popup
                      popupOpened={popupOpened}
                      serverMessage={serverMessage}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/movies"
                element={
                  <ProtectedRoute user={loggedIn}>
                    <>
                      <Header>
                        <HeaderNavigationProfile loggedIn={loggedIn} />
                        <HeaderNavigationMovies loggedIn={loggedIn} />
                      </Header>
                      <Main>
                        <MoviesExplorer
                          setFirstCoutn={setFirstCoutn}
                          countItem={countItem}
                          AddMovies={addMovies}
                          countItemsOnDisplay={countItemsOnDisplay}
                          onSearch={searchMovies}
                          setSearchResult={setSearchResult}
                          mainMovies={mainMovies}
                          searchResult={searchResult}
                          handleSavedMovies={handleSavedMovies}
                        />
                      </Main>
                      <Popup
                      popupOpened={popupOpened}
                      serverMessage={serverMessage}
                    />
                      <Footer />
                    </>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/saved-movies"
                element={
                  <ProtectedRoute path="/saved-movies" user={loggedIn}>
                    <Header>
                      <HeaderNavigationProfile loggedIn={loggedIn} />
                      <HeaderNavigationMovies />
                    </Header>
                    <Main>
                      <MoviesSaved
                        onSearch={handleSearchMain}
                        setFirstCoutn={setFirstCoutn}
                        countItem={countItemMain}
                        AddMovies={addMoviesMain}
                        countItemsOnDisplay={countItemsOnDisplay}
                        mainMovies={mainMovies}
                        searchResult={searchResultMain}
                        handleSavedMovies={handleSavedMovies}
                      />
                    </Main>
                    <Popup
                      popupOpened={popupOpened}
                      serverMessage={serverMessage}
                    />
                    <Footer />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/signup"
                element={
                  <ProtectedRoute path="/signup" user={loggedIn}>
                    <SignUp register={handleRegister} />
                    <Popup
                      popupOpened={popupOpened}
                      serverMessage={serverMessage}
                    />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/signin"
                element={
                  <ProtectedRoute path="/signin" user={loggedIn}>
                    <SignIn login={handleAuthorize} />
                    <Popup
                      popupOpened={popupOpened}
                      serverMessage={serverMessage}
                    />
                  </ProtectedRoute>
                }
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
