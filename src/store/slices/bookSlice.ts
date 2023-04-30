import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../../types/Book";

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
    setActiveBook(state, action: PayloadAction<Book>) {
      state.activeBook = action.payload;
    },
    setActiveBookNull(state) {
      state.activeBook = null;
    },
    fetchBooksSuccess(state, action: PayloadAction<Book[]>) {
      state.books = action.payload;
    },
    setBooksSearch(state, action: PayloadAction<Book[] | null>) {
      state.booksSearch = action.payload;
    },
  },
});

export const {
  setActiveBook,
  setActiveBookNull,
  fetchBooksSuccess,
  setBooksSearch,
} = booksSlice.actions;

export default booksSlice.reducer;
