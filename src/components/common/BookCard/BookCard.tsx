import { useEffect } from "react";
import useFirebaseImage from "../../../hooks/useFirebaseImage";
import styles from "./BookCard.module.scss";

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
  const { getImageUrl, imageUrl } = useFirebaseImage();

  const handleToggleActiveBook = () => {
    onSetActiveBook(id);
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
