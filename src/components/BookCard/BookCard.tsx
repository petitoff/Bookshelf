import { FiChevronRight } from "react-icons/fi";
import { Book } from "../../types/Book";
import "./BookCard.css";

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  return (
    <div className="book-card">
      <img src="book1.jpg" alt="Book 1" />
      <div className="book-details">
        <h4 className="book-title">Book Title</h4>
        <p className="book-author">Author Name</p>
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
