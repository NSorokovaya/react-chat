import { createAction } from "@reduxjs/toolkit";

export const login = createAction("LOGIN", (user) => {
  const { uid, displayName, email } = user;
  return {
    payload: { uid, displayName, email },
  };
});
export const logout = createAction("LOGOUT");
