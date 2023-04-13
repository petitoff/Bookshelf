import React from "react";
import styles from "./WideButton.module.css";

interface Props {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

const WideButton = ({
  children,
  isActive = false,
  onClick,
  className,
}: Props) => {
  const buttonClass = `${styles.button} ${
    !isActive && styles.disabled
  } ${className}`;

  return (
    <button className={buttonClass} disabled={!isActive} onClick={onClick}>
      {children}
    </button>
  );
};

export default WideButton;
