import React from "react";

function notification({ text_message, text_subtitle, status, text_button }) {
  return (
    <div className="notification">
      <div className="notification__content">
        <div className="notification__icon">
        </div>
        <div className="notification__text">
          <div className="notification__text-title">{text_message}</div>
          <div className="notification__text-subtitle">{text_subtitle}</div>
        </div>
      </div>
      <div className="notivication__button">
        <button class="notification__btn" type="button">
          <span class="notification__btn-text">{text_button}</span>
        </button>
      </div>
    </div>
  );
}
