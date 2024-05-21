import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
