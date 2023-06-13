import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book, BookCategory } from "../../types/Book";

interface BooksState {
  books: Book[];
  activeBook: Book | null;
  booksSearch: Book[] | null;
  activeBookCategory: BookCategory;
  booksFilteredByCategory: Book[] | null;
}

const initialState: BooksState = {
  books: [],
  activeBook: null,
  booksSearch: null,
  activeBookCategory: BookCategory.All,
  booksFilteredByCategory: null,
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
    setActiveBookCategory(state, action: PayloadAction<BookCategory>) {
      state.activeBookCategory = action.payload;
    },
    setBooksFilteredByCategory(state, action: PayloadAction<Book[] | null>) {
      state.booksFilteredByCategory = action.payload;
    },
  },
});

export const {
  setActiveBook,
  setBooks,
  setBooksSearch,
  setBookImageUrlById,
  setActiveBookCategory,
  setBooksFilteredByCategory,
} = booksSlice.actions;

export default booksSlice.reducer;
