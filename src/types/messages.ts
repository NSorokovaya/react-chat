import { Timestamp } from "firebase/firestore";

interface AbstractMessage {
  id: string;
  creator: string;
  createdAt: Timestamp;
  type: string;
}

export interface TextMessage extends AbstractMessage {
  type: "text";
  text: string;
}

export interface ImageMessage extends AbstractMessage {
  type: "image";
  url: string;
}

export type Message = TextMessage | ImageMessage;

export interface ChatWindowProps {
  chatId: string;
}

export interface CreateTextMessageDto {
  chatId: string;
  text: string;
  creator: string;
}
