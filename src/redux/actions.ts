import { createAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

export const login = createAction("LOGIN");
export const logout = createAction("LOGOUT");
export const setCurrentUser = createAction<User | null>("SET_CURRENT_USER");
