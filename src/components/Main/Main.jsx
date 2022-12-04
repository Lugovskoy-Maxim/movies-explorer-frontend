import React from "react";
// import { Link, useLocation, Switch, Route } from "react-router-dom";
import Promo from "./Promo/Promo.jsx";
import AboutProject from "./AboutProject/AboutProject.jsx";
import "./Main.css";
function Main(props) {

  return(
    <section className="Main">
    <Promo />
    <AboutProject />
    {/*<Techs />
    <AboutMe /> */}
    </section>
  )
}

export default Main;
