import { createReducer } from "@reduxjs/toolkit";
import { login, logout } from "./actions";

const initialState = {
  currentUser: null,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login, (state, action) => {
      state.currentUser = action.payload;
    })
    .addCase(logout, (state) => {
      state.currentUser = null;
    });
});

export default authReducer;
