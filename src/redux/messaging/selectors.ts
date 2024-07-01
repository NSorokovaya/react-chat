import { RootState } from "../store";

export const selectChatId = (state: RootState) => state.messaging.chatId;
export const selectMessagesList = (state: RootState) =>
  state.messaging.messagesList;

export const selectHasMore = (state: RootState) => state.messaging.hasMore;
