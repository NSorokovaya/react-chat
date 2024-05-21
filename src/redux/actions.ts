import { createAction } from "@reduxjs/toolkit";

export const login = createAction("LOGIN", (user) => ({
  payload: {
    uid: user.uid,
    displayName: user.displayName,
  },
}));

export const logout = createAction("LOGOUT");

export const setCurrentUser = createAction("SET_CURRENT_USER", (user) => ({
  payload: user ? { uid: user.uid, displayName: user.displayName } : null,
}));
