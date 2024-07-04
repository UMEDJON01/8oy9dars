// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

let dataFromLocalStorage = () => {
  return (
    JSON.parse(localStorage.getItem("user")) || {
      user: null,
      isAuthState: false,
    }
  );
};

let userSlice = createSlice({
  name: "user",
  initialState: dataFromLocalStorage(),
  reducers: {
    login: (state, { payload }) => {
      state.user = payload;
      userSlice.caseReducers.setLocal(state);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthState = false;
      userSlice.caseReducers.setLocal(state);
    },
    isAuthChange: (state, { payload }) => {
      state.isAuthState = payload;
      userSlice.caseReducers.setLocal(state);
    },
    setLocal: (state) => {
      localStorage.setItem("user", JSON.stringify(state));
    },
    errorInputAction: (state, { payload }) => {
      console.error("Input error:", payload);
    },
  },
});

export let { isAuthChange, login, logout, errorInputAction } =
  userSlice.actions;

export default userSlice.reducer;
