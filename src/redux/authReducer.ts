import { createReducer } from "@reduxjs/toolkit";
import { login, logout, setCurrentUser } from "./actions";
import { User } from "firebase/auth";

interface AuthState {
  currentUser: User | null | undefined;
}

const initialState: AuthState = {
  currentUser: null,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login, (state, action) => {
      state.currentUser = action.payload;
    })
    .addCase(logout, (state) => {
      state.currentUser = null;
    })
    .addCase(setCurrentUser, (state, action) => {
      state.currentUser = action.payload;
    });
});

export default authReducer;
