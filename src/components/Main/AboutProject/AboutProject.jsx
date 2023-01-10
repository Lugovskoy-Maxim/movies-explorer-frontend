import React from "react";
import "./AboutProject.css";

function AboutProject() {
    return (
        <section className="aboutProject">
          <h1 className="aboutProject__title">О проекте</h1>
            <ul className="aboutProject__stages">
              <li className="aboutProject__stage">
                <h2 className="aboutProject__stage-title">Дипломный проект включал 5 этапов
                </h2>
                <p className="aboutProject__stage-description">
                Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                </p>
              </li>
              <li className="aboutProject__stage">
                <h2 className="aboutProject__stage-title">На выполнение диплома ушло 5 недель
                </h2>
                <p className="aboutProject__stage-description">
                У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                </p>
              </li>
            </ul>
            <ul className="aboutProject__progress">
              <li className="aboutProject__progress-backend">
                <p className="aboutProject__progress-backend-line">1 неделя</p>
                <p className="aboutProject__progress-title">
                Back-end
                </p>
              </li>
              <li className="aboutProject__progress-frontend">
              <p className="aboutProject__progress-frontend-line">4 недели</p>
              < p className="aboutProject__progress-title">
              Front-end
                </p>
              </li>
            </ul>
            <scroll-page className="scroll-page" id="tech"></scroll-page>
        </section>
    );
}

export default AboutProject;