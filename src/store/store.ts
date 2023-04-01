import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice, { AuthState } from "./slices/authSlice";
import sidebarSlice from "./slices/sidebarSlice";

const persistConfig = {
  key: "root",
  storage,
};

const authReducer = persistReducer<AuthState>(persistConfig, authSlice);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sidebar: sidebarSlice,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
