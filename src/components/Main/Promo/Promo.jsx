import React from "react";
import "./Promo.css";

function Promo() {
    return (
        <section className="promo">
            <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
              <ul className="promo__nav_links">
                <li className="promo_nav_link">О проекте</li>
                <li className="promo_nav_link">Технологии</li>
                <li className="promo_nav_link">Студент</li>
              </ul>
        </section>
    );
}

export default Promo;