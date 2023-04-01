import { FiChevronRight } from "react-icons/fi";
import { Book } from "../../types/Book";
import "./BookCard.css";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import { useState } from "react";
import { Blurhash } from "react-blurhash";

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  const { imageUrl, error } = useFirebaseImage({ imageName: book?.imageUrl });
  const [loaded, setLoaded] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };

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
        <div className="book-info">
          <p className="book-pages">
            <strong>290</strong>
            Pages
          </p>
          <div className="separator" />
          <p className="book-reviews">
            <strong>50</strong>
            Reviews
          </p>
          <div className="separator" />
          <p className="book-ratings">
            <strong>500</strong>
            Ratings
          </p>
        </div>
      </div>
      <div className="book-button-container">
        {/* <a href="#" className="book-button">
          See details
        </a> */}

        <FiChevronRight className="book-button" size={20} />
      </div>
    </div>
  );
};

export default BookCard;
