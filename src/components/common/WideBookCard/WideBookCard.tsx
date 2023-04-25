import { FiChevronRight } from "react-icons/fi";
import { Book } from "../../../types/Book";
import "./WideBookCard.css";
import useFirebaseImage from "../../../hooks/useFirebaseImage";
import { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";
import { useHistory } from "react-router-dom";

interface WideBookCardProps {
  book: Book;
}

const WideBookCard = ({ book }: WideBookCardProps) => {
  const { getImageUrl, imageUrl, error } = useFirebaseImage();
  const [loaded, setLoaded] = useState(false);

  const history = useHistory();

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleOpenDetails = () => {
    history.push(`/book/${book.id}`);
  };

  useEffect(() => {
    getImageUrl(book?.imageId ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book]);

  return (
    <div className="book-card">
      {error ? (
        <div>Error!</div>
      ) : (
        <>
          {!imageUrl ? (
            <Blurhash
              hash="LKO2?U%2Tw=w]~RBVZRi};RPxuwH"
              width="100px"
              height="100%"
            />
          ) : (
            <img
              src={imageUrl ?? ""}
              alt="Book cover"
              style={{
                maxWidth: "100%",
                height: "auto",
                display: loaded ? "block" : "none",
              }}
              onLoad={handleLoad}
            />
          )}
        </>
      )}
      <div className="book-details">
        <h4 className="book-title">{book?.title}</h4>
        <p className="book-author">{book?.authorName}</p>
        <div className="book-card-info">
          <p className="book-pages">
            <strong>{book.pages}</strong>
            pages
          </p>
          <div className="separator" />
          <p className="book-reviews">
            <strong>{book?.reviews?.length ?? 0}</strong>
            reviews
          </p>
          <div className="separator" />
          <p className="book-ratings">
            <strong>{book?.ratings?.length ?? 0}</strong>
            ratings
          </p>
        </div>
      </div>
      <div className="book-button-container">
        {/* <a href="#" className="book-button">
          See details
        </a> */}

        <FiChevronRight
          onClick={handleOpenDetails}
          className="book-button"
          size={20}
        />
      </div>
    </div>
  );
};

export default WideBookCard;
