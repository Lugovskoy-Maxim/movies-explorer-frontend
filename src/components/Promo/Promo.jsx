import React from 'react';
import './Promo.css';

function Promo() {
  const scrollToSection = (top) => {
    window.scrollBy({
      top,
      behavior: 'smooth',
    });
  };

  const handleScrollToProject = () => {
    scrollToSection(600);
  };

  const handleScrollToTech = () => {
    scrollToSection(1100);
  };

  const handleScrollToMe = () => {
    scrollToSection(1850);
  };

  return (
    <section className="promo">
      <h1 className="promo__title">
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <ul className="promo__nav-links">
        <li
          className="promo__nav-link promo__link"
          onClick={handleScrollToProject}
        >
          О проекте
        </li>
        <li
          className="promo__nav-link promo__link"
          onClick={handleScrollToTech}
        >
          Технологии
        </li>
        <li className="promo__nav-link promo__link" onClick={handleScrollToMe}>
          Студент
        </li>
      </ul>
      <scroll-page id="project"></scroll-page>
    </section>
  );
}

export default Promo;
