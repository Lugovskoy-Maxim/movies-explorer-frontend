import React from "react";
import "./Main.css";

function Main(props) {
  return (
      <section className="main">
        {props.children}
      </section>
  );
}

export default Main;
