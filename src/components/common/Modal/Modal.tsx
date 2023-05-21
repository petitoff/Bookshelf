import styles from "./Modal.module.scss";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: Props) => {
  if (!isOpen) return null;

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles["modal-content"]} onClick={handleModalClick}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
