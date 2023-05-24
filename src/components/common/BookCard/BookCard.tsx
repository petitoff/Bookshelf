import styles from "./BookCard.module.scss";
import { useAppSelector } from "../../../hooks/hooks";
import { useHistory } from "react-router-dom";
import { Book } from "../../../types/Book";
import WideButton from "../WideButton/WideButton";
import useFirebaseImage from "../../../hooks/useFirebaseImage";
import { useEffect } from "react";

interface Props {
  book: Book;
  isActiveBook?: boolean;
  isAllowedToDelete?: boolean;
  onSetActiveBook?: (id: string) => void;
  onDeleteBook?: (id: string) => void;
}

function BookCard({
  book,
  isActiveBook = false,
  isAllowedToDelete = false,
  onSetActiveBook,
  onDeleteBook,
}: Props) {
  const isRightSidebarOpen = useAppSelector(
    (state) => state.sidebar.isRightSidebarOpen
  );
  const { id, imageId, imageUrl, title, authorName: author } = book;

  const history = useHistory();

  const { getImageUrl, imageUrl: imageUrlFromHook, error } = useFirebaseImage();

  useEffect(() => {
    if (!imageUrl && imageId) {
      getImageUrl(imageId);
    }
  }, [imageId, imageUrl, getImageUrl]);

  const handleToggleActiveBook = () => {
    if (!isRightSidebarOpen) {
      handleOpenDetailsPage();
      return;
    }

    if (!id) return;

    onSetActiveBook && onSetActiveBook(id);
  };

  const handleOpenDetailsPage = () => {
    history.push(`/book/${id}`);
  };

  const handleDeleteBook = () => {
    if (!id) return;

    onDeleteBook && onDeleteBook(id);
  };

  const displayImageUrl = imageUrl ?? imageUrlFromHook ?? "";
  const noImageText = "No image";

  return (
    <div
      className={`${styles.card} ${isActiveBook && styles.active}`}
      data-testid="book-card"
    >
      <div onClick={handleToggleActiveBook}>
        {error ? (
          <div className={styles.noImage}>{noImageText}</div>
        ) : (
          <img
            src={displayImageUrl}
            alt={title}
            className={styles.imageStyle}
          />
        )}

        <div className="cardBody">
          <h5 className={styles.title}>{title}</h5>
          <p className={styles.underTitle}>{author}</p>
        </div>
      </div>
      {isAllowedToDelete && (
        <WideButton colorOfButton="#e74c3c" isActive onClick={handleDeleteBook}>
          <p>Delete from your reading list</p>
        </WideButton>
      )}
    </div>
  );
}

export default BookCard;
