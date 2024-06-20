import { Message } from "../../types/messages";

export interface MessagingState {
  chatId: string;
  messagesList: Message[];
  lastDoc: null;
  loading: boolean;
}

export const initState: MessagingState = {
  chatId: "",
  messagesList: [],
  lastDoc: null,
  loading: false,
};
