import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLeftSidebarOpen: false,
  isRightSidebarOpen: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleLeftSidebar: (state) => {
      state.isLeftSidebarOpen = !state.isLeftSidebarOpen;
    },
    openRightSidebar: (state) => {
      state.isRightSidebarOpen = true;
    },
    closeRightSidebar: (state) => {
      state.isRightSidebarOpen = false;
    },
  },
});

export const { toggleLeftSidebar, openRightSidebar, closeRightSidebar } =
  sidebarSlice.actions;

export default sidebarSlice.reducer;
