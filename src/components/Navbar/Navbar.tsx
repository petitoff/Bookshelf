import React, { useEffect, useState } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { toggleLeftSidebar } from "../../store/slices/sidebarSlice";
import { Link, useLocation } from "react-router-dom";
import useBookSearch from "../../hooks/useBookSearch";

const RouteToExclude = ["/book/:id", "/login", "/signup"];

const Navigation = () => {
  const [activeItem, setActiveItem] = useState("books");
  const [searchQuery, setSearchQuery] = useState("");
  const isLeftSidebarOpen = useAppSelector(
    (state) => state.sidebar.isLeftSidebarOpen
  );
  const isRightSidebarOpen = useAppSelector(
    (state) => state.sidebar.isRightSidebarOpen
  );
  const { setSearchTerm } = useBookSearch();

  const dispatch = useAppDispatch();
  const location = useLocation();
  const isSearchBarActive = !RouteToExclude.includes(location.pathname);

  const handleMenuItemClick = (item: any) => {
    setActiveItem(item);
  };

  const handleSearchInputChange = (event: any) => {
    setSearchQuery(event.target.value);
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: any) => {
    event.preventDefault();
    // Handle search submit here
  };

  const handleToggleLeftSidebar = () => {
    // Handle sidebar toggle here
    dispatch(toggleLeftSidebar());
  };

  // if press esc key, close the sidebar
  const handleKeyDown = (event: any) => {
    if (event.keyCode === 27) {
      dispatch(toggleLeftSidebar());
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav className={`navigation ${isRightSidebarOpen && "open-right-sidebar"}`}>
      <ul className="navigation__menu">
        <li className="open-sidebar" onClick={handleToggleLeftSidebar}>
          {isLeftSidebarOpen ? <FaTimes /> : <FaBars />}
        </li>
        <li
          className={`navigation__menu-item ${
            activeItem === "books" ? "active" : ""
          }`}
          onClick={() => handleMenuItemClick("books")}
        >
          <Link to="/books" className="disable-decorations ">
            Books
          </Link>
        </li>
        {/* <li
          className={`navigation__menu-item ${
            activeItem === "audiobooks" ? "active" : ""
          }`}
          onClick={() => handleMenuItemClick("audiobooks")}
        >
          Audiobooks
        </li>
        <li
          className={`navigation__menu-item ${
            activeItem === "podcasts" ? "active" : ""
          }`}
          onClick={() => handleMenuItemClick("podcasts")}
        >
          Podcasts
        </li> */}
      </ul>
      <form onSubmit={handleSearchSubmit} className="navigation__search">
        {isSearchBarActive && (
          <>
            <input
              type="text"
              placeholder="Genre, author or book name"
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="navigation__search-input"
              // autoComplete="off"
            />
            <button type="submit" className="navigation__search-button">
              <FaSearch color="#aaa" size={15} />
            </button>
          </>
        )}
      </form>
    </nav>
  );
};

export default Navigation;
