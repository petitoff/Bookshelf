import { FaHome, FaList, FaHeart, FaCog } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { toggleLeftSidebar } from "../../store/slices/sidebarSlice";
import useLogout from "../../hooks/useLogout";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const sidebarOpen = useAppSelector(
    (state) => state.sidebar.isLeftSidebarOpen
  );
  const user = useAppSelector((state) => state.auth.user);
  const { logout } = useLogout();

  const handleLogout = () => {
    handleLinkClick();
    logout();
  };

  const handleLinkClick = () => {
    dispatch(toggleLeftSidebar());
  };

  return (
    <div className={`${styles.sidebar} ${sidebarOpen ? `${styles.open}` : ""}`}>
      <ul className={styles.menu}>
        <li>
          <div className={styles.user}>
            {user?.imageUrl ? (
              <img src={user?.imageUrl} alt="user" />
            ) : (
              <img src="https://i.imgur.com/6VBx3io.png" alt="user" />
            )}
            <span>{`@${user?.name}`}</span>
          </div>
        </li>

        <hr className={styles.separator} />

        <li>
          <Link to="/" onClick={handleLinkClick}>
            <FaHome className={styles.icon} /> Home
          </Link>
        </li>

        {user && (
          <li>
            <Link to="/mylist" onClick={handleLinkClick}>
              <FaList className={styles.icon} /> My List
            </Link>
          </li>
        )}

        <li>
          <Link to="/favourites" onClick={handleLinkClick}>
            <FaHeart className={styles.icon} /> Favourites
          </Link>
        </li>

        <hr />

        {user ? (
          <>
            <li>
              <Link to="/settings" onClick={handleLinkClick}>
                <FaCog className={styles.icon} /> Settings
              </Link>
            </li>
            <li>
              <Link to="/" onClick={handleLogout}>
                <RiLogoutBoxRLine className={styles.icon} /> Logout
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login" onClick={handleLinkClick}>
              Login
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
