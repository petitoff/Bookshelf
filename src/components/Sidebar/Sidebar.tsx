import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { FaHome, FaList, FaHeart, FaCog } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { toggleSidebar } from "../../store/slices/sidebarSlice";
import useUserData from "../../hooks/useUserData";
import useLogout from "../../hooks/useLogout";

const Sidebar = () => {
  const sidebarOpen = useAppSelector((state) => state.sidebar.sidebarOpen);
  const auth = useAppSelector((state) => state.auth.user);
  const { user, imageUrl } = useUserData(auth?.UID);
  const { logout } = useLogout();

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    dispatch(toggleSidebar());
    logout();
  };

  return (
    <div className={sidebarOpen ? "sidebar open" : "sidebar"}>
      {/* <div className="sidebar__header">
        <h2>Sidebar</h2>
      </div> */}
      <ul className="sidebar__menu">
        <li>
          <div className="user">
            {imageUrl ? (
              <img src={imageUrl} alt="user" />
            ) : (
              <img src="https://i.imgur.com/6VBx3io.png" alt="user" />
            )}
            <span>{`@${user?.name}`}</span>
          </div>
        </li>

        <hr />
        <li>
          <a href="/">
            <FaHome className="icon" /> Home
          </a>
        </li>
        <li>
          <a href="/mylist">
            <FaList className="icon" /> My List
          </a>
        </li>
        <li>
          <a href="/favourites">
            <FaHeart className="icon" /> Favourites
          </a>
        </li>

        <hr />
        {user ? (
          <>
            <li>
              <Link to="/settings">
                <FaCog className="icon" /> Settings
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={handleLogout}>
                <RiLogoutBoxRLine className="icon" /> Logout
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login"> Login </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
