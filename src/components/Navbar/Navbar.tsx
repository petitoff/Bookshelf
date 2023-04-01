import React, { useState } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { toggleSidebar } from "../../store/slices/sidebarSlice";

const Navigation = () => {
  const [activeItem, setActiveItem] = useState("books");
  const [searchQuery, setSearchQuery] = useState("");
  const isSidebarOpen = useAppSelector((state) => state.sidebar.sidebarOpen);

  const dispatch = useAppDispatch();

  const handleMenuItemClick = (item: any) => {
    setActiveItem(item);
  };

  const handleSearchInputChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: any) => {
    event.preventDefault();
    // Handle search submit here
  };

  const handleToggleSidebar = () => {
    // Handle sidebar toggle here
    dispatch(toggleSidebar());
  };

  return (
    <nav className="navigation">
      <ul className="navigation__menu">
        <li className="open-sidebar" onClick={handleToggleSidebar}>
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </li>
        <li
          className={`navigation__menu-item ${
            activeItem === "books" ? "active" : ""
          }`}
          onClick={() => handleMenuItemClick("books")}
        >
          Books
        </li>
        <li
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
        </li>
      </ul>
      <form onSubmit={handleSearchSubmit} className="navigation__search">
        <input
          type="text"
          placeholder="Genre, author or book name"
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="navigation__search-input"
        />
        <button type="submit" className="navigation__search-button">
          <FaSearch color="#aaa" size={15} />
        </button>
      </form>
    </nav>
  );
};

export default Navigation;
