import React, { useState } from "react";
import searchIcon from "../../../images/iconSearch.svg";
import searchLine from "../../../images/input__line.svg";
import "./SearchForm.css";

function SearchForm() {
  const [filterStatus, setFilterStatus] = useState(false);



  function toggleFilterstatus() {
    filterStatus ? setFilterStatus(false) : setFilterStatus(true);
  }

  return (
    <>
      <form className="search">
        <nav tabIndex="-1" className="search__nav">
          <div  className="search__nav-left">
            <div  className="search__input-left">
              <img src={searchIcon} alt="Лупа" className="search__icon" />
              <input
                id="search"
                className="search__input"
                placeholder=" Фильм"
                type="text"
                required
              ></input>
            </div>
            <button type="submit" className="search__find"></button>
          </div>

          <div className="search__nav-right">
            <img src={searchLine} alt="Линия" className="search__icon-line" />

            <button
              onClick={() => toggleFilterstatus()}
              type="button"
              className={`search__togle  ${filterStatus ? "search__togle-active" : ""}`}
            >
              <div className={`search__togle-icon  ${filterStatus ? "search__togle-icon-active" : ""}`} onClick={() => toggleFilterstatus()} ></div>
            </button>
            <p className="search__togle-title">Короткометражки</p>
          </div>
        </nav>
      </form>
      <hr className="movies__search-line" />
    </>
  );
}

export default SearchForm;
