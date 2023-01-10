import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFaundPage.css";

function NotFaundPage(){
  const navigate = useNavigate();

  return(
    <section className="notfaund">
      <h1 className="notfaund__title">404</h1>
      <p className="notfaund__description">Страница не найдена</p>
      <button className="notfaund__button" onClick={() => navigate(-1)}>Назад</button>
    </section>
  )
}

export default NotFaundPage;