import styles from "./WideButton.module.css";

interface Props {
  children: React.ReactNode;
  isActive?: boolean;
  onButtonPress?: () => void;
}

const WideButton = ({ children, isActive = false, onButtonPress }: Props) => {
  return (
    <button
      className={`${styles.button} ${!isActive && styles.disabled}`}
      disabled={!isActive}
      onClick={onButtonPress}
    >
      {children}
    </button>
  );
};

export default WideButton;
