import React from "react";
import "./Promo.css";

function Promo() {

  function scrollerToProject() {
    window.scrollBy({
      top: 600,
      behavior : "smooth"
      })
  }

  function scrollerToTech() {
    window.scrollBy({
      top: 1100,
      behavior : "smooth"
      })
  }

  function scrollerToMe() {
    window.scrollBy({
      top: 1850,
      behavior : "smooth"
      })
  }

    return (
        <section className="promo">
            <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
              <ul className="promo__nav_links">
                <li className="promo_nav_link promo__link" onClick={scrollerToProject}>О проекте</li>
                <li className="promo_nav_link promo__link" onClick={scrollerToTech}>Технологии</li>
                <li className="promo_nav_link promo__link" onClick={scrollerToMe}>Студент</li>
              </ul>
              <scroll-page id="project"></scroll-page>
        </section>
    );
}

export default Promo;