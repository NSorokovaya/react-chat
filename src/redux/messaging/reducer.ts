import { createReducer } from "@reduxjs/toolkit";

import { initState } from "./init-state";
import { addMessage, setChatId, setMessagesList } from "./actions";

export const messagingReducer = createReducer(initState, (builder) => {
  builder
    .addCase(setChatId, (state, { payload }) => {
      state.chatId = payload.chatId;
    })
    .addCase(setMessagesList, (state, { payload }) => {
      state.messagesList = payload.messagesList;
    });
});
