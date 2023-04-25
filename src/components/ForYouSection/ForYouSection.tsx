import { useAppSelector } from "../../hooks/hooks";
import WideBookCard from "../common/WideBookCard/WideBookCard";
import "./ForYouSection.css";
import { Book } from "../../types/Book";

const ForYouSection = () => {
  const books = useAppSelector((state) => state.books.books);

  return (
    <section className="foryou-section">
      <h2 className="section-title">For you</h2>
      <div className="books-container">
        {books.map((book: Book) => (
          <WideBookCard key={book?.id} book={book ?? book} />
        ))}
      </div>
    </section>
  );
};

export default ForYouSection;
