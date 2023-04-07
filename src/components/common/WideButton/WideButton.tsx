import styles from "./WideButton.module.css";

interface Props {
  children: React.ReactNode;
  isActive?: boolean;
}

const WideButton = ({ children, isActive = false }: Props) => {
  return (
    <button
      className={`${styles.button} ${!isActive && styles.disabled}`}
      disabled={!isActive}
    >
      {children}
    </button>
  );
};

export default WideButton;
