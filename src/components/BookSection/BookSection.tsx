import BookCard from "../common/BookCard/BookCard";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import styles from "./BookSection.module.css";
import { Book } from "../../types/Book";
import { setActiveBook } from "../../store/slices/bookSlice";

interface Props {
  titleOfSection: string;
  books: Book[];
}

const BookSection = ({ titleOfSection, books }: Props) => {
  const activeBook = useAppSelector((state) => state.books.activeBook);
  const dispatch = useAppDispatch();

  const handleSetActiveBook = (id: string) => {
    if (activeBook?.id === id) {
      dispatch(setActiveBook(null));
    } else {
      const localActiveBook = books.find(
        (book: Book) => book.id === id
      ) as Book;
      dispatch(setActiveBook(localActiveBook));
    }
  };

  return (
    <section>
      <h2 className={styles.titleOfSection}>{titleOfSection}</h2>
      <div className={styles.bookList}>
        {books.map((book) => {
          const {
            id = "",
            title = "No title",
            authorName = "No author",
            imageId = "No image",
          } = book;
          const isActiveBook = activeBook?.id === id;
          return (
            <BookCard
              key={id}
              id={id}
              title={title}
              author={authorName}
              imageId={imageId}
              isActiveBook={isActiveBook}
              onSetActiveBook={handleSetActiveBook}
            />
          );
        })}
      </div>
    </section>
  );
};

export default BookSection;
