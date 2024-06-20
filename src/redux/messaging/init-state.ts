import { Message } from "../../types/messages";

export interface MessagingState {
  chatId: string;
  messagesList: Message[];
}

export const initState: MessagingState = {
  chatId: "",
  messagesList: [],
};
