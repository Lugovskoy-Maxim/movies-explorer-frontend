import React from "react";
import "./Popup.css";

function Popup(props) {
  return (
    <div className={`popup ${props.popupOpened ? "popup-opened" : "" }`}>
      <div className="popup__container">
        <p className="popup__message">{props.serverMessage}</p>
      </div>
    </div>
  );
}

export default Popup;
