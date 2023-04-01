import BookList from "../components/BookList";
import BookForm from "../components/BookForm";

import { useRealtimeBooks } from "../hooks/useRealtimeBooks";
import ForYouSection from "../components/ForYouSection/ForYouSection";

export default function Home() {
  const { books } = useRealtimeBooks();

  return (
    <div className="App">
      {/* {books && <BookList books={books} />} */}
      {/* <BookForm /> */}
      <ForYouSection />
    </div>
  );
}
