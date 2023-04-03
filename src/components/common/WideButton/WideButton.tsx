import styles from "./WideButton.module.css";

interface Props {
  children: React.ReactNode;
}

const WideButton = ({ children }: Props) => {
  return <button className={styles.button}>{children}</button>;
};

export default WideButton;
