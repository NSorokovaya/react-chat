import { createReducer } from "@reduxjs/toolkit";

import { initState } from "./init-state";
import { setChatId, setMessagesList, setMoreMessages } from "./actions";

export const messagingReducer = createReducer(initState, (builder) => {
  builder
    .addCase(setChatId, (state, { payload }) => {
      state.chatId = payload.chatId;
    })
    .addCase(setMessagesList, (state, { payload }) => {
      state.messagesList = payload.messagesList;
    })
    .addCase(setMoreMessages, (state, { payload }) => {
      state.messagesList = [
        ...state.messagesList,
        ...payload.messagesList,
      ].sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);
    });
});
