import { createAction } from "@reduxjs/toolkit";
import {
  CreateImageMessageDto,
  CreateTextMessageDto,
  Message,
} from "../../types/messages";

export const setChatId = createAction<{ chatId: string }>(
  "messaging/setChatId"
);

export const setMessagesList = createAction<{
  messagesList: Message[];
}>("messaging/setMessagesList");

export const subscribeToMessagesList = createAction<{ chatId: string }>(
  "messaging/subscribeToMessagesList"
);

export const addMessage = createAction<{
  messagesList: Message[];
}>("messaging/addMessage");

export const sendTextMessage = createAction<{ message: CreateTextMessageDto }>(
  "messaging/sendTextMessage"
);

export const sendImageMessage = createAction<{
  message: CreateImageMessageDto;
}>("messaging/sendImageMessage");

export const loadMoreMessages = createAction<{
  chatId: string;
}>("messaging/loadMoreMessages");

export const setMoreMessages = createAction<{
  messagesList: Message[];
}>("messaging/setMoreMessages");

export const setHasMore = createAction<{
  hasMore: boolean;
}>("messaging/setHasMore");
