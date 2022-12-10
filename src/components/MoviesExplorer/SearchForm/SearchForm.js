import React from "react";
import searchIcon from "../../../images/iconSearch.svg";
import searchLine from "../../../images/input__line.svg";
import "./SearchForm.css"

function SearchForm(){

  return(
    <><form className="search">
      <nav className="search__nav">
        <div className="search__nav_left">
          <img src={searchIcon} alt="Лупа" className="search__icon" />
          <input className="search__input"
            placeholder="Фильм"
            type="text"
          ></input>
        </div>
        <div className="search__nav_right">
          <button className="search__find"></button>
          <img src={searchLine} alt="Линия" className="search__icon_line" />
          <button className="search__togle_active">
            <div className="search__togle_icon"></div>
          </button>
          <p className="search__togle_title">Короткометражки</p>
        </div>
      </nav>
    </form>
    <hr className="search__line" />
    </>
  )
}

export default SearchForm;
