import React from "react";
import "./AboutMe.css";
import AboutMePhoto from "../../../images/aboutMePhoto.jpg";

function AboutMe() {
    return (
        <section className="aboutMe">
          <h1 className="aboutMe__title">Студент</h1>
          <div className="aboutMe__container">
            <div className="aboutMe__info">
            <h2 className="aboutMe__name">Виталий</h2>
            <span className="aboutMe__profession">Фронтенд-разработчик, 30 лет</span>
            <p className="aboutMe__bio">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <a className="aboutMe__info_link aboutMe__link" rel="noopener noreferrer"  target="_blank" href="https://github.com/Lugovskoy-Maxim" >Github</a>
          </div>
          <img className="aboutMe__photo" src={AboutMePhoto} alt="Фотография Виталия" />
          </div>
          <h3 className="aboutMe__partfolio_title">Партфолио</h3>
          <ul className="aboutMe__partfolio_links">
            <li className="aboutMe__partfolio_link aboutMe__link">
              <a className="aboutMe__partfolio_project" rel="noopener noreferrer"  target="_blank" href="https://github.com/Lugovskoy-Maxim/react-mesto-api-full">Страничный сайт</a>
              <p className="aboutMe__partfolio_icon">↗</p>
            </li>
          <li className="aboutMe__partfolio_link aboutMe__link">
              <a className="aboutMe__partfolio_project" rel="noopener noreferrer"  target="_blank" href="https://github.com/Lugovskoy-Maxim/russian-travel">Адаптивный сайт</a>
              <p className="aboutMe__partfolio_icon">↗</p>
            </li>            <li className="aboutMe__partfolio_link aboutMe__link">
              <a className="aboutMe__partfolio_project" rel="noopener noreferrer"  target="_blank" href="https://github.com/Lugovskoy-Maxim/how-to-learn">Одностраничное приложение</a>
              <p className="aboutMe__partfolio_icon">↗</p>
            </li>
          </ul>
        </section>
    );
}

export default AboutMe;
