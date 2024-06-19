import { createAction } from "@reduxjs/toolkit";
import { Message } from "../../types/messages";

export const setChatId = createAction<{ chatId: string }>(
  "messaging/setChatId"
);

export const setMessagesList = createAction<{
  messagesList: Message[];
}>("messaging/setMessagesList");

export const subscribeToMessagesList = createAction<{ chatId: string }>(
  "messaging/subscribeToMessagesList"
);
