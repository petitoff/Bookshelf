import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";
import { toast } from "react-toastify";

export interface AuthState {
  user?: User;
  isLoading: boolean;
  error: any;
}

const initialState: AuthState = {
  user: undefined,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      toast.success("Logged in successfully");
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
    logoutUser: (state) => {
      state.user = undefined;
    },
  },
});

export const { setUser, setLoading, setError, logoutUser } = authSlice.actions;
export default authSlice.reducer;
