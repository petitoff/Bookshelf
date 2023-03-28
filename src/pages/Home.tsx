import BookList from "../components/BookList";
import BookForm from "../components/BookForm";

import { useRealtimeBooks } from "../hooks/useRealtimeBooks";

export default function Home() {
  const { books } = useRealtimeBooks();

  return (
    <div className="App">
      {books && <BookList books={books} />}
      <BookForm />
    </div>
  );
}
