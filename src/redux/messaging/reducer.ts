import { createReducer } from "@reduxjs/toolkit";

import { initState } from "./init-state";
import {
  setChatId,
  setHasMore,
  setMessagesList,
  setMoreMessages,
} from "./actions";

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
        ...payload.messagesList.reverse(),
        ...state.messagesList,
      ];
    })
    .addCase(setHasMore, (state, { payload }) => {
      state.hasMore = payload.hasMore;
    });
});
