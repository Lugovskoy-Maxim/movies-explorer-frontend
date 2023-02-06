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
import * as mainApi from "../../utils/MainApi";
import * as MoviesApi from "../../utils/MoviesApi";
import ProtectedRoute from "../protectedRoute";

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
  const jwtToken = localStorage.getItem("jwtToken");
  const searchValue = localStorage.getItem("search");
  const [isLoading, setIsLoading] = useState(false);
  const [mainMovies, setMainMovies] = useState([{}]);

  const [errorMessage, setErrorMessage] = useState("");
  const [moviesData, setMoviesData] = useState();
  const [searchResult, setSearchResult] = useState(() => {
    const saved = localStorage.getItem("searchResult");
    const initialValue = JSON.parse(saved);
    return (
      initialValue || {
        movies: [],
        // visible: 0,
      }
    );
  });
  const [searchResultMain, setSearchResultMain] = useState(() => {
    const saved = localStorage.getItem("searchResultMain");
    const initialValue = JSON.parse(saved);
    return (
      initialValue || {
        movies: [],
        // visible: 0,
      }
    );
  });

  const [filterStatus, setFilterStatus] = useState(() => {
    const saved = localStorage.getItem("filter");
    const initialValue = JSON.parse(saved);
    return initialValue || "false";
  });

  // Если нет в памяти тогда выключено, если есть то принимает значение

  function toggleFilterStatus() {
    filterStatus === "true"
      ? setFilterStatus("false")
      : setFilterStatus("true");
    filterStatus === "true"
      ? localStorage.setItem("filter", "false")
      : localStorage.setItem("filter", "true");
  }

  useEffect(() => {
    // if (!searchValue === undefined) {
    //   setFilterStatus(localStorage.getItem("filter"));
    //   handleSearch(searchValue);
    // }
    handleTokenCheck();
    getMainMoviesDB();
  }, []);

  // useEffect(()=> {
  //   setSearchResult()
  //   setSearchResultMain()
  // },[])

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
    const matched = (str, match) =>
      str.toLowerCase().includes(match.toLowerCase());
    return (
      filterStatus === "true"
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
        setMoviesData(localStorage.setItem("moviesData", JSON.stringify(res)));
      })
      .catch((err) => console.log(err));
  }

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

  const handleSearch = (searchValue) => {
    setIsLoading(true);
    // setCountItem(countItemsOnDisplay());
    // localStorage.setItem("countItemonDisplay", countItemsOnDisplay());

    if (
      !localStorage.getItem("moviesData") &&
      !localStorage.getItem("mainMovies")
    ) {
      if (location.pathname === "/movies") {
        MoviesApi.getMovie()
          .then((res) => {
            /// BeatFilm
            const searchResults = filter(res, filterStatus, searchValue);
            console.log(searchResults);
            setSearchResult((prev) => ({
              ...prev,
              movies: searchResults,
              // visible: countItemsOnDisplay(),
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
        ////// MAIN
        mainApi
          .getMainMovies()
          .then((res) => {
            const searchResultsMain = filter(res, filterStatus, searchValue);
            console.log(searchResultsMain);
            setSearchResultMain((prev) => ({
              ...prev,
              movies: searchResultsMain,
              // visible: countItemsOnDisplay(),
            }));
            localStorage.setItem("mainMovies", JSON.stringify(res));
            localStorage.setItem(
              "searchResultMain",
              JSON.stringify({
                movies: searchResultsMain,
                // visible: countItemsOnDisplay(),
              })
            );
          })
          .catch((err) => {
            setErrorMessage(
              `Во время запроса произошла ${err}. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.`
            );
          })
          .finally(() => setIsLoading(false));
      }
    } else {
      /// BeatFilm
      if (location.pathname === "/movies") {
        const moviesData = JSON.parse(localStorage.getItem("moviesData"));
        const searchResults = filter(moviesData, filterStatus, searchValue);
        setSearchResult((prev) => ({
          ...prev,
          movies: searchResults,
          // visible: countItemsOnDisplay(),
        }));
        localStorage.setItem("moviesData", JSON.stringify(moviesData));
        const object = {
          movies: searchResults,
          // visible: countItemsOnDisplay(),
        };
        localStorage.setItem(
          "searchResult",
          JSON.stringify(object)
          // .replace(/"([^"]+)":/g, '$1:')
        );
      } else {
        ////// MAIN
        const mainMoviesData = JSON.parse(localStorage.getItem("mainMovies"));
        const searchResultsMain = filter(mainMovies, filterStatus, searchValue);
        setSearchResultMain((prev) => ({
          ...prev,
          movies: searchResultsMain,
          // visible: countItemsOnDisplay(),  ////////////////////////////////
        }));
        localStorage.setItem("mainMovies", JSON.stringify(mainMoviesData));

        const object = {
          movies: searchResultsMain,
          // visible: countItemsOnDisplay(), ////////////////////////////////
        };
        localStorage.setItem(
          "searchResultMain",
          JSON.stringify(object)
          // .replace(/"([^"]+)":/g, '$1:')
        );
      }
      //// придумать как сохранить что бы подгружать при перезагрузки страницы
      localStorage.setItem("search", searchValue);
      setIsLoading(false);
    }
  };

  const getMainMoviesDB = () => {
    mainApi
      .getMainMovies()
      .then((res) => {
        localStorage.setItem("mainMovies", JSON.stringify(res));
        setMainMovies(res);
      })
      .catch((err) => {
        setMainMovies([{}]);
        console.log(err);
      });
  };

  const handleTokenCheck = () => {
    mainApi
      .checkToken()
      .then((res) => {
        setCurrentUser({ id: res._id, name: res.name, email: res.email });
        setLoggedIn(true);
        getMovies();
        getMainMoviesDB();
        location.pathname === "/signin"
          ? navigate("/")
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

  // const cookieValue = (name) => {
  //   return document.cookie.split('; ').find(cookie =>  cookie.trim().startsWith(name + ""))?.split('=')[1];
  // }

  // console.log(get_cookie(jwtToken))
  // function delete_cookie(name, path, domain) {
  //     document.cookie = name + "=" +
  //       ((path) ? ";path=" + path:"")+
  //       ((domain)? ";domain=" + domain:"")+
  //       ";expires, 01 Jan 1970 00:00:00 GMT"
  function signOut() {
    mainApi
      .signout()
      .then((res) => {
        console.log(res);
        navigate("/");
        setLoggedIn(false);
        localStorage.clear();
        setCurrentUser({ id: 0, name: "", email: "" });
      })
      .catch((err) => console.log(err));
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
        setCurrentUser((prev) => ({
          ...prev,
          id: res.user._id,
          name: res.user.name,
          email: res.user.email,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // const handleCardLike = (card) => {
  //   const isLiked = card.likes.some((i) => i === currentUser._id);
  //   return api
  //     .changeStatusLikeCard(card._id, isLiked)
  //     .then((currentCard) => {
  //       setCards(
  //         cards.map((item) => (item._id === card._id ? currentCard : item))
  //       );
  //     })
  //     .catch((err) => {
  //       console.log(`${err}`);
  //     });
  // };

  function handleSavedMovies(movie) {
    const isSaved = movie.owner === currentUser.id;
    if (isSaved === true) {
      mainApi
        .removeMovie(movie._id) /// нужно засунуть сохраненный фильм если он есть, если нет то не нужно засовывать
        .then((res) => {
          setMainMovies(mainMovies.filter((i) => i != movie)); // удалить фильм который я отправлял из стейта
          const newArr = localStorage.getItem("searchResultMain");
          const saved = JSON.parse(newArr).movies;
          const removeIndex = saved
            .map((item) => item.nameRU)
            .indexOf(movie.nameRU);
          saved.splice(removeIndex, 1);

          setSearchResultMain((prev) => ({
            ...prev,
            movies: saved,
          }));

          const object = {
            movies: saved,
            // visible: countItemsOnDisplay(), ////////////////////////////////
          };

          localStorage.setItem("searchResultMain", JSON.stringify(object));
        })
        .catch((err) => console.log(err));
    } else {
      mainApi
        .createMovies(movie)
        .then((newMovie) => {
          setMainMovies([...mainMovies, newMovie]);
        })
        .catch((err) => console.log(err));
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
                  <ProtectedRoute user={loggedIn}>
                    <Header>
                      <HeaderNavigationProfile loggedIn={loggedIn} />
                      <HeaderNavigationMovies loggedIn={loggedIn} />
                    </Header>
                    <Profile
                      onSignOut={signOut}
                      updateUserInfo={updateUserInfo}
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
                          toggleFilterstatus={toggleFilterStatus}
                          filterStatus={filterStatus}
                          onSearch={handleSearch}
                          mainMovies={mainMovies}
                          searchResult={searchResult}
                          handleSavedMovies={handleSavedMovies}
                        />
                      </Main>
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
                        onSearch={handleSearch}
                        setFirstCoutn={setFirstCoutn}
                        countItem={countItemMain}
                        AddMovies={addMoviesMain}
                        countItemsOnDisplay={countItemsOnDisplay}
                        toggleFilterstatus={toggleFilterStatus}
                        filterStatus={filterStatus}
                        mainMovies={mainMovies}
                        searchResult={searchResultMain}
                        handleSavedMovies={handleSavedMovies}
                      />
                    </Main>
                    <Footer />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/signup"
                loggedIn={loggedIn}
                element={
                  <ProtectedRoute path="/signup" user={loggedIn}>
                    <SignUp register={handleRegister} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/signin"
                loggedIn={loggedIn}
                element={
                  <ProtectedRoute path="/signin" user={loggedIn}>
                    <SignIn login={handleAuthorize} />{" "}
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
