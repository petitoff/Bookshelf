import React, { useEffect, useState } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import useBookSearch from "../../hooks/dataHooks/booksHooks/useBookSearch";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { toggleLeftSidebar } from "../../store/slices/sidebarSlice";
import styles from "./Navbar.module.scss";

// Routes that should not dislay the navbar
const EXCLUDED_ROUTES = [
  "/welcome/first-step",
  "/welcome/second-step",
  "/welcome/registration-thank-you",
  "/login",
  "/signup",
];

// Routes that should display the search bar in the navbar
const INCLUDED_ROUTES = ["/books"];

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("books");
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isSearchBarActive = INCLUDED_ROUTES.includes(location.pathname);
  const isNavbarActive = !EXCLUDED_ROUTES.includes(location.pathname);

  const isLeftSidebarOpen = useAppSelector(
    (state) => state.sidebar.isLeftSidebarOpen
  );
  const isRightSidebarOpen = useAppSelector(
    (state) => state.sidebar.isRightSidebarOpen
  );
  const { setSearchTerm } = useBookSearch();

  const handleMenuItemClick = (item: string) => {
    setActiveItem(item);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setSearchQuery(value);
    setSearchTerm(value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle search submit here
  };

  const handleToggleLeftSidebar = () => {
    dispatch(toggleLeftSidebar());
  };

  const handleKeyDown = (event: KeyboardEvent) => {
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

  if (!isNavbarActive) {
    return null;
  }

  return (
    <nav
      className={`${styles.navigation} ${
        isRightSidebarOpen && styles["open-right-sidebar"]
      }`}
    >
      <ul className={styles["navigation__menu"]}>
        <li
          className={styles["open-sidebar"]}
          onClick={handleToggleLeftSidebar}
        >
          {isLeftSidebarOpen ? <FaTimes /> : <FaBars />}
        </li>
        <li
          className={`${styles["navigation__menu-item"]} ${
            activeItem === "books" && styles.active
          }`}
          onClick={() => handleMenuItemClick("books")}
        >
          <Link to="/books" className={styles["disable-decorations"]}>
            Books
          </Link>
        </li>
        {/* <li
          className={`${styles["navigation__menu-item"]} ${activeItem === "audiobooks" && styles.active}`}
          onClick={() => handleMenuItemClick("audiobooks")}
        >
          Audiobooks
        </li>
        <li
          className={`${styles["navigation__menu-item"]} ${activeItem === "podcasts" && styles.active}`}
          onClick={() => handleMenuItemClick("podcasts")}
        >
          Podcasts
        </li> */}
      </ul>
      <form
        onSubmit={handleSearchSubmit}
        className={styles["navigation__search"]}
      >
        {isSearchBarActive && (
          <>
            <input
              type="text"
              placeholder="Genre, author or book name"
              value={searchQuery}
              onChange={handleSearchInputChange}
              className={styles["navigation__search-input"]}
            />
            <button
              type="submit"
              className={styles["navigation__search-button"]}
            >
              <FaSearch color="#aaa" size={15} />
            </button>
          </>
        )}
      </form>
    </nav>
  );
};

export default Navbar;
