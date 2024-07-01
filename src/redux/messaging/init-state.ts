import { Message } from "../../types/messages";

export interface MessagingState {
  chatId: string;
  messagesList: Message[];
  hasMore: boolean;
}

export const initState: MessagingState = {
  chatId: "",
  messagesList: [],
  hasMore: true,
};
