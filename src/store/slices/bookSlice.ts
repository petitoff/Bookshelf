import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book, BookCollection } from "../../types/Book";

interface BooksState {
  books: Book[];
  activeBook: Book | null;
  loading: boolean;
  error: string | null;
}

const initialState: BooksState = {
  books: [],
  activeBook: null,
  loading: false,
  error: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setActiveBook(state, action: PayloadAction<Book>) {
      state.activeBook = action.payload;
    },
    fetchBooksStart(state) {
      state.loading = true;
    },
    fetchBooksSuccess(state, action: PayloadAction<Book[]>) {
      state.loading = false;
      state.error = null;
      state.books = action.payload;
    },

    fetchBooksFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setActiveBook,
  fetchBooksStart,
  fetchBooksSuccess,
  fetchBooksFailure,
} = booksSlice.actions;

export default booksSlice.reducer;
