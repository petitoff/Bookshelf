import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book, Review } from "../../types/Book";

interface BooksState {
  books: Book[];
  activeBook: Book | null;
  booksSearch: Book[] | null;
}

const initialState: BooksState = {
  books: [],
  activeBook: null,
  booksSearch: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setActiveBook(state, action: PayloadAction<Book | null>) {
      state.activeBook = action.payload;
    },
    setBooks(state, action: PayloadAction<Book[]>) {
      state.books = action.payload;
    },
    setBooksSearch(state, action: PayloadAction<Book[] | null>) {
      state.booksSearch = action.payload;
    },
    setBookImageUrlById(
      state,
      action: PayloadAction<{ bookId: string; imageUrl: string }>
    ) {
      const { bookId, imageUrl } = action.payload;
      const book = state.books.find((book) => book.id === bookId);
      if (book) {
        book.imageUrl = imageUrl;
      }
    },
    addReviewToBook: (
      state,
      action: PayloadAction<{ review: Review; bookId: string }>
    ) => {
      const { review, bookId } = action.payload;
      const book = state.books.find((book) => book.id === bookId);
      if (book) {
        if (!book.reviews) {
          book.reviews = [];
        }
        book.reviews.push(review);
      }
    },
  },
});

export const {
  setActiveBook,
  setBooks,
  setBooksSearch,
  setBookImageUrlById,
  addReviewToBook,
} = booksSlice.actions;

export default booksSlice.reducer;
