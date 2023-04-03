import BasicInfoSection from "../common/BasicInfoSection/BasicInfoSection";
import WideButton from "../common/WideButton/WideButton";
import styles from "./BookInfo.module.css";

const BookInfo = () => {
  return (
    <div className={`${styles.bookInfo}`}>
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
