import { useEffect } from "react";
import { Book, BookCategory } from "../../../types/Book";
import { useDispatch } from "react-redux";
import { setBooksFilteredByCategory } from "../../../store/slices/bookSlice";

const useFilterBooksByCategory = (books: Book[], category: BookCategory) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (category === "All") {
      dispatch(setBooksFilteredByCategory(null));
      return;
    }

    const filteredBooks = books.filter((book) => book.category === category);
    dispatch(setBooksFilteredByCategory(filteredBooks));
  }, [books, category, dispatch]);
};

export default useFilterBooksByCategory;
