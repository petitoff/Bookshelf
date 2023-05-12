import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";

export interface AuthState {
  user?: User;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: undefined,
  isLoading: false,
  error: null,
};

/**
 * Slice that encapsulates the state and reducers related to the authentication module.
 */
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Sets the authenticated user in the state.
     */
    setUser: (state, action: PayloadAction<User | Partial<User>>) => {
      state.user = action.payload as User;
    },

    /**
     * Updates the user with partial data.
     */
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },

    /**
     * Removes a book from the reading list by its id.
     * @param state The current state.
     * @param action The action containing the id of the book to remove.
     * @returns The new state.
     */
    removeBookFromReadingListById: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.readingListBooks = state.user.readingListBooks?.filter(
          (book) => book.id !== action.payload
        );
      }
    },

    /**
     * Sets the loading state in the state.
     */
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    /**
     * Sets the error state in the state.
     */
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    /**
     * Logs out the current user by setting it to undefined.
     */
    logoutUser: (state) => {
      state.user = undefined;
    },
  },
});

export const {
  setUser,
  updateUser,
  removeBookFromReadingListById,
  setLoading,
  setError,
  logoutUser,
} = authSlice.actions;
export default authSlice.reducer;
