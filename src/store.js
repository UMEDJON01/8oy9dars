import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./app/userSlice";

export let store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["user/login", "user/logout"],
        ignoredPaths: ["user.user"],
      },
    }),
});
