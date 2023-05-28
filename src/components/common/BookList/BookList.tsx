import { memo } from "react";
import { Book } from "../../../types/Book";
import BookCard from "../BookCard/BookCard";

interface Props {
  books: Book[];
  isAllowedToDelete?: boolean;
  customStyle?: React.CSSProperties;
  customClassName?: string;
  onDeleteBook?: (id?: string) => void;
}

const BookList = ({
  books,
  isAllowedToDelete = false,
  customStyle = {},
  customClassName = "",
  onDeleteBook,
}: Props) => {
  return (
    <div
      className={customClassName}
      style={customStyle}
      data-testid="book-list"
    >
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          isAllowedToDelete={isAllowedToDelete}
          onDeleteBook={onDeleteBook}
        />
      ))}
    </div>
  );
};
export default memo(BookList);
