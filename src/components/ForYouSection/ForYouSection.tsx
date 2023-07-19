import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/hooks";
import WideBookCard from "../common/WideBookCard/WideBookCard";
import "./ForYouSection.css";
import { Book, BookCategory } from "../../types/Book";

const ForYouSection = () => {
  const userListOfFavoriteBookCategories = useAppSelector(
    (state) => state.auth.user?.favouriteCategories
  );
  const books = useAppSelector((state) => state.books.books);
  const [randomBooks, setRandomBooks] = useState<Book[]>([]);

  const getRandomBooks = (books: Book[], count: number) => {
    const shuffled = [...books].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    if (!userListOfFavoriteBookCategories) return;

    const getBooksByCategories = (categories: BookCategory[]) => {
      const booksByCategories: Book[] = [];
      categories.forEach((category) => {
        const booksByCategory = books.filter(
          (book) => book.category === category
        );
        booksByCategories.push(...booksByCategory);
      });
      return booksByCategories;
    };

    setRandomBooks(
      getRandomBooks(getBooksByCategories(userListOfFavoriteBookCategories), 2)
    );
  }, [books, userListOfFavoriteBookCategories]);

  return (
    <section className="foryou-section">
      <h2 className="section-title">For you</h2>
      <div className="books-container">
        {randomBooks.map((book: Book) => (
          <WideBookCard key={book?.id} book={book} />
        ))}
      </div>
    </section>
  );
};

export default ForYouSection;
