import { FaHome, FaList, FaHeart, FaCog } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { toggleLeftSidebar } from "../../store/slices/sidebarSlice";
import useUserData from "../../hooks/useUserData";
import useLogout from "../../hooks/useLogout";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const sidebarOpen = useAppSelector(
    (state) => state.sidebar.isLeftSidebarOpen
  );
  const auth = useAppSelector((state) => state.auth.user);
  const { user, imageUrl } = useUserData();
  const { logout } = useLogout();

  const handleLogout = () => {
    dispatch(toggleLeftSidebar());
    logout();
  };

  return (
    <div className={`${styles.sidebar} ${sidebarOpen ? `${styles.open}` : ""}`}>
      <ul className={styles.menu}>
        <li>
          <div className={styles.user}>
            {imageUrl ? (
              <img src={imageUrl} alt="user" />
            ) : (
              <img src="https://i.imgur.com/6VBx3io.png" alt="user" />
            )}
            <span>{`@${user?.name}`}</span>
          </div>
        </li>

        <hr className={styles.separator} />

        <li>
          <Link to="/">
            <FaHome className={styles.icon} /> Home
          </Link>
        </li>
        <li>
          <Link to="/mylist">
            <FaList className={styles.icon} /> My List
          </Link>
        </li>
        <li>
          <Link to="/favourites">
            <FaHeart className={styles.icon} /> Favourites
          </Link>
        </li>

        <hr />

        {auth ? (
          <>
            <li>
              <Link to="/settings">
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
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
