import React from "react";
// import { Route, Switch, useHistory, Redirect } from "react-router-dom";

// import Login from "./Login";
// import Register from "./Register";
// import Loading from "./Promo";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
// import ProtectedRoute from "./ProtectedRoute";
import './App.css';

function App() {
  return(
    <div className="App">
      <div className="page">
        {/* <Header/>
        <Main /> */}
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
  );
}

export default App;
