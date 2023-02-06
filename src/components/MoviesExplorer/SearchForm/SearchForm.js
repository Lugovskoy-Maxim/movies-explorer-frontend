import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import searchIcon from "../../../images/iconSearch.svg";
import searchLine from "../../../images/input__line.svg";
import "./SearchForm.css";

function SearchForm({
  onSearch,
  filterStatus,
  toggleFilterstatus,
  setFirstCoutn,
}) {
  // const [filterStatus, setFilterStatus] = useState();
  const [searchValue, setSearchValue] = useState("Фильм");
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname === "/movies" &&
      !localStorage.getItem("search") === undefined
    ) {
      setSearchValue(localStorage.getItem("search"));
    }
  }, []);

  function onChangeSearch(event) {
    setSearchValue(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const locationPath = location.pathname;
    setFirstCoutn(locationPath);
    onSearch(searchValue);
  }

  return (
    <>
      <form className="search" onSubmit={handleSubmit}>
        <nav tabIndex="-1" className="search__nav">
          <div className="search__nav-left">
            <div className="search__input-left">
              <img src={searchIcon} alt="Лупа" className="search__icon" />
              <input
                id="search"
                onChange={onChangeSearch}
                value={searchValue}
                className="search__input"
                placeholder={searchValue}
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
              className={`search__togle  ${
                filterStatus === "true" ? "search__togle-active" : ""
              }`}
            >
              <div
                className={`search__togle-icon  ${
                  filterStatus === "true" ? "search__togle-icon-active" : ""
                }`}
                onClick={() => toggleFilterstatus()}
              ></div>
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
