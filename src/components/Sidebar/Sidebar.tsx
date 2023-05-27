import { FaHome, FaList, FaCog } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { toggleLeftSidebar } from "../../store/slices/sidebarSlice";
import useLogout from "../../hooks/authHooks/useLogout";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import styles from "./Sidebar.module.scss";
import useFirebaseImage from "../../hooks/firebaseHooks/useFirebaseImage";
import { useEffect, useState } from "react";
import { updateUser } from "../../store/slices/authSlice";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const sidebarOpen = useAppSelector(
    (state) => state.sidebar.isLeftSidebarOpen
  );
  const user = useAppSelector((state) => state.auth.user);
  const [image, setImage] = useState(user?.imageUrl);

  const { logout } = useLogout();
  const { getImageUrl, imageUrl } = useFirebaseImage();

  const handleLogout = () => {
    handleLinkClick();
    logout();
  };

  const handleLinkClick = () => {
    dispatch(toggleLeftSidebar());
  };

  useEffect(() => {
    if (!user) {
      setImage("");
      return;
    }

    if (user?.imageUrl) {
      return;
    }

    if (user?.imageId) {
      getImageUrl(user?.imageId);
    }

    if (imageUrl) {
      dispatch(updateUser({ imageUrl: imageUrl }));
      setImage(imageUrl);
    }
  }, [dispatch, getImageUrl, imageUrl, user]);

  return (
    <div
      className={`${styles.sidebar} ${sidebarOpen ? `${styles.open}` : ""}`}
      data-testid="sidebar"
    >
      <ul className={styles.menu}>
        <li>
          <div className={styles.user}>
            {image ? (
              <img src={image} alt="user" />
            ) : (
              <img src="https://i.imgur.com/6VBx3io.png" alt="user" />
            )}
            {user?.username ? (
              <span>{`${user.username}`}</span>
            ) : (
              <span>Guest</span>
            )}
          </div>
        </li>

        <hr className={styles.separator} />

        <li>
          <Link to="/" onClick={handleLinkClick}>
            <FaHome className={styles.icon} /> Home
          </Link>
        </li>

        {user && (
          <>
            <li>
              <Link
                to={`/${user?.username}/reading-list`}
                onClick={handleLinkClick}
              >
                <FaList className={styles.icon} /> My List
              </Link>
            </li>

            {/* This feature is disabled for now */}
            {/* <li>
              <Link to="/favourites" onClick={handleLinkClick}>
                <FaHeart className={styles.icon} /> Favourites
              </Link>
            </li> */}
          </>
        )}

        {user && user?.role === "admin" && (
          <>
            <hr className={styles.separator} />
            <li>
              <Link to="/add-book" onClick={handleLinkClick}>
                <FaList className={styles.icon} /> Add Book
              </Link>
            </li>
          </>
        )}

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
