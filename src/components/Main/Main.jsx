import React from "react";
import Promo from "./Promo/Promo.jsx";
import Techs from "./Techs/Techs.jsx";
import AboutProject from "./AboutProject/AboutProject.jsx";
import AboutMe from "./AboutMe/AboutMe.jsx";
import "./Main.css";
import Header from "../Header/Header.jsx";
import HeaderNavigationProfile from "../Header/__nav-profile/Header__nav-profile"
import Footer from "../Footer/Footer.jsx";

function Main() {
  return (
    <>
      <Header>
        {HeaderNavigationProfile()}
      </Header>
      <section className="main">
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
      </section>
      <Footer/>
    </>
  );
}

export default Main;
