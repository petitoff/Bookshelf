import { useEffect } from "react";
import BasicInfoSection from "../common/BasicInfoSection/BasicInfoSection";
import WideButton from "../common/WideButton/WideButton";
import styles from "./BookInfo.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  closeRightSidebar,
  openRightSidebar,
} from "../../store/slices/sidebarSlice";

const BookInfo = () => {
  const isOpen = useAppSelector((state) => state.sidebar.isRightSidebarOpen);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(openRightSidebar());

    return () => {
      dispatch(closeRightSidebar());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(isOpen);
  return (
    <div className={`${styles.bookInfo} ${isOpen && styles.show}`}>
      <h2>About the book</h2>
      <div className={`${styles.bookCover}`}></div>
      <h3>Title of the Book</h3>
      <h5>by Author Name</h5>

      <BasicInfoSection isDarkMode={true} />

      <div className={`${styles.plot}`}>
        <h2>Plot</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
          ex. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
          animi mollitia modi ipsum perferendis dolorum at excepturi Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Sed euismod ex. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Officia animi
          mollitia modi ipsum perferendis dolorum at excepturi Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Sed euismod ex. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Officia animi mollitia
          modi ipsum perferendis dolorum at excepturi
        </p>
      </div>

      <WideButton>
        <p style={{ fontSize: "15px", fontWeight: 700 }}>Read</p>
      </WideButton>
    </div>
  );
};

export default BookInfo;
