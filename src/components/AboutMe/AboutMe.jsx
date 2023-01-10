import React from "react";
import "./AboutMe.css";
import aboutMePhoto from "../../images/aboutMePhoto.jpg";

function aboutMe() {

  return (
    <section className="about-me">
      <h1 className="about-me__title">Студент</h1>
      <div className="about-me__container">
        <div className="about-me__info">
          <h2 className="about-me__name">Виталий</h2>
          <span className="about-me__profession">
            Фронтенд-разработчик, 30 лет
          </span>
          <p className="about-me__bio">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            className="about-me__info-link about-me__link"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/Lugovskoy-Maxim"
          >
            Github
          </a>
        </div>
        <img
          className="about-me__photo"
          src={aboutMePhoto}
          alt="Фотография Виталия"
        />
      </div>
      <h3 className="about-me__partfolio-title">Партфолио</h3>
      <ul className="about-me__partfolio-links">
        <li className="about-me__partfolio-link about-me__link">
          <a
            className="about-me__partfolio-project"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/Lugovskoy-Maxim/react-mesto-api-full"
          >
            <p className="about-me__partfolio-project-title">
              {" "}
              Страничный сайт
            </p>
            <p className="about-me__partfolio-project-title">&#8599;</p>
          </a>
        </li>
        <li className="about-me__partfolio-link about-me__link">
          <a
            className="about-me__partfolio-project"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/Lugovskoy-Maxim/russian-travel"
          >
            <p className="about-me__partfolio-project-title">Адаптивный сайт</p>
            <p className="about-me__partfolio-project-title">&#8599;</p>
          </a>
        </li>
        <li className="about-me__partfolio-link about-me__link">
          <a
            className="about-me__partfolio-project"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/Lugovskoy-Maxim/how-to-learn"
          >
            <p className="about-me__partfolio-project-title">
              Одностраничное приложение
            </p>
            <p className="about-me__partfolio-project-title">&#8599;</p>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default aboutMe;
