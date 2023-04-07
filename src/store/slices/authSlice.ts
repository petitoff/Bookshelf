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
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
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

export const { setUser, setLoading, setError, logoutUser } = authSlice.actions;
export default authSlice.reducer;
