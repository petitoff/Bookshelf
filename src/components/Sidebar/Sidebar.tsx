import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { FaHome, FaList, FaHeart } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import "./Sidebar.css";
import { logoutUser } from "../../store/slices/authSlice";
import { Link } from "react-router-dom";
import { toggleSidebar } from "../../store/slices/sidebarSlice";

const Sidebar = () => {
  const sidebarOpen = useAppSelector((state) => state.sidebar.sidebarOpen);
  const user = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(toggleSidebar());
    dispatch(logoutUser());
  };

  return (
    <div className={sidebarOpen ? "sidebar open" : "sidebar"}>
      {/* <div className="sidebar__header">
        <h2>Sidebar</h2>
      </div> */}
      <ul className="sidebar__menu">
        <li></li>

        <hr />
        <li>
          <a href="/">
            <FaHome /> Home
          </a>
        </li>
        <li>
          <a href="/mylist">
            <FaList /> My List
          </a>
        </li>
        <li>
          <a href="/favourites">
            <FaHeart /> Favourites
          </a>
        </li>

        <hr />
        {user ? (
          <li>
            <Link to="/login" onClick={handleLogout}>
              <RiLogoutBoxRLine /> Logout
            </Link>
          </li>
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
