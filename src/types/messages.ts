import { Timestamp } from "firebase/firestore";

export interface Message {
  id: string;
  creator: string;
  createdAt: Timestamp;
  type: string;
}

export interface TextMessage extends Message {
  type: "text";
  text: string;
}

export interface ImageMessage extends Message {
  type: "image";
  url: string;
}
