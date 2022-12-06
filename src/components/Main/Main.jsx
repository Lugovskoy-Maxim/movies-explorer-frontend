import React from "react";
import Promo from "./Promo/Promo.jsx";
import Techs from "./Techs/Techs.jsx";
import AboutProject from "./AboutProject/AboutProject.jsx";
import AboutMe from "./AboutMe/AboutMe.jsx";
import "./Main.css";

function Main(props) {

  return(
    <section className="Main">
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
    </section>
  )
}

export default Main;
