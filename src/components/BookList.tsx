import { Book } from "../types/Book";
import useDeleteBook from "../hooks/useDeleteBook";

interface Props {
  books: Book[];
}

export default function BookList({ books }: Props) {
  const { deleteBook } = useDeleteBook();

  const handleClick = async (id: string) => {
    await deleteBook(id);
  };

  return (
    <div className="book-list">
      <ul>
        {books.map((book) => (
          <li
            key={book.id}
            onClick={() => {
              book.authorUid && handleClick(book.authorUid);
            }}
          >
            {book.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
