import { useAppSelector } from "../../hooks/hooks";
import BookCard from "../common/WideBookCard/WideBookCard";
import "./ForYouSection.css";
import { Book } from "../../types/Book";
import { useRealtimeBooks } from "../../hooks/useRealtimeBooks";

const ForYouSection = () => {
  const books = useAppSelector((state) => state.books.books);

  useRealtimeBooks();

  // Pobieramy dane książek z Redux Store
  // const allBooks = useAppSelector((state) => state.books.books);

  return (
    <section className="foryou-section">
      <h2 className="section-title">For you</h2>
      <div className="books-container">
        {books.map((book: Book) => (
          <BookCard key={book?.id} book={book ?? book} />
        ))}
      </div>
    </section>
  );
};

export default ForYouSection;
