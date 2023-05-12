import React from "react";
import styles from "./WideButton.module.css";

interface Props {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
  colorOfButton?: string;
}

const WideButton = ({
  children,
  isActive = false,
  onClick,
  className,
  colorOfButton,
}: Props) => {
  const buttonClass = `${styles.button} ${
    !isActive && styles.disabled
  } ${className}`;

  return (
    <button className={buttonClass} style={{backgroundColor: `${colorOfButton}`}} disabled={!isActive} onClick={onClick}>
      {children}
    </button>
  );
};

export default WideButton;
