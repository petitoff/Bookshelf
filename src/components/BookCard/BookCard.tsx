import { FiChevronRight } from "react-icons/fi";
import { Book } from "../../types/Book";
import "./BookCard.css";
import useFirebaseImage from "../../hooks/useFirebaseImage";

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  const { imageUrl } = useFirebaseImage({ imageName: book?.imageUrl });

  return (
    <div className="book-card">
      {imageUrl ? (
        <img src={imageUrl} alt="Okładka książki" />
      ) : (
        <div>Loading...</div>
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
