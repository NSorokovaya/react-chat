import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./auth/authReducer";
import { messagingReducer } from "./messaging/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  messaging: messagingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
