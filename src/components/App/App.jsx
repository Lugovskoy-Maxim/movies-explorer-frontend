// import React from "react";
import React, { useState } from 'react';
// import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";
// import Login from "./Login";
// import Register from "./Register";
// import Loading from "./Promo";
import Header from "../Header/Header.js";
import MoviesExplorer from "../MoviesExplorer/MoviesExplorer.js";
// import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
// import SignIn from "../SignIn/SignIn.jsx";
// import SignUp from "../SignUp/SignUp.jsx";
// import NotFaundPage from "../NotFaund/NotFaundPage.jsx";
// import ProtectedRoute from "./ProtectedRoute";
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState();
  return(
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header
          onLogin={currentUser}  />
          <MoviesExplorer/>
          {/* <Main />
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
    </CurrentUserContext.Provider>
  );
}

export default App;
