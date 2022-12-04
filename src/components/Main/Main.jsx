import React from "react";
// import { Link, useLocation, Switch, Route } from "react-router-dom";
import Promo from "./Promo/Promo";
import "./Main.css";
function Main(props) {

  return(
    <section className="Main">
    <Promo />
    {/* <AboutProject />
    <Techs />
    <AboutMe /> */}
    </section>
  )
}

export default Main;
