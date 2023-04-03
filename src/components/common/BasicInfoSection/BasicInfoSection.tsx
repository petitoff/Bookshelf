import styles from "./BasicInfoSection.module.css";

interface Props {
  isDarkMode: boolean;
}

const BasicInfoSection = ({ isDarkMode }: Props) => {
  return (
    <div
      className={`${styles.bookCard}`}
      style={{ backgroundColor: `${isDarkMode ? "#1d1f2b" : "#fff"}` }}
    >
      <p>
        <strong>290</strong>
        <span className={`${styles.subtitle}`}>pages</span>
      </p>
      <div className="separator" />
      <p>
        <strong>50</strong>
        <span className={`${styles.subtitle}`}>reviews</span>
      </p>
      <div className="separator" />
      <p>
        <strong>500</strong>
        <span className={`${styles.subtitle}`}>ratings</span>
      </p>
    </div>
  );
};

export default BasicInfoSection;
