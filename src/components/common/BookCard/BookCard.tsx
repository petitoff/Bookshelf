import { useEffect } from "react";
import useFirebaseImage from "../../../hooks/useFirebaseImage";
import styles from "./BookCard.module.scss";
import { useAppSelector } from "../../../hooks/hooks";
import { useHistory } from "react-router-dom";

interface Props {
  id: string;
  title: string;
  author: string;
  imageId: string;
  isActiveBook: boolean;
  onSetActiveBook: (id: string) => void;
}

function BookCard({
  id,
  title,
  author,
  imageId,
  isActiveBook,
  onSetActiveBook,
}: Props) {
  const isRightSidebarOpen = useAppSelector(
    (state) => state.sidebar.isRightSidebarOpen
  );
  const { getImageUrl, imageUrl } = useFirebaseImage();
  const history = useHistory();

  const handleToggleActiveBook = () => {
    if (!isRightSidebarOpen) {
      handleOpenDetailsPage();
      return;
    }

    onSetActiveBook(id);
  };

  const handleOpenDetailsPage = () => {
    history.push(`/book/${id}`);
  };

  useEffect(() => {
    getImageUrl(imageId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageId]);

  return (
    <div
      className={`${styles.card} ${isActiveBook && styles.active}`}
      onClick={handleToggleActiveBook}
    >
      <img src={imageUrl ?? ""} alt={title} className={styles.imageStyle} />
      <div className="cardBody">
        <h5 className={styles.title}>{title}</h5>
        <p className="text">{author}</p>
      </div>
    </div>
  );
}

export default BookCard;
