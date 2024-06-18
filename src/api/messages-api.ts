import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";

interface CreateTextMessageParams {
  chatId: string;
  text: string;
  creator: string;
}
interface CreateImageMessageParams {
  chatId: string;
  url: string;
  creator: string;
  text: string;
}
interface DeleteTextMessageParams {
  chatId: string;
  messageId: string;
}

export const createTextMessage = async ({
  chatId,
  text,
  creator,
}: CreateTextMessageParams) => {
  await addDoc(collection(db, `chats/${chatId}/messages`), {
    type: "text",
    chatId,
    text,
    creator,
    createdAt: serverTimestamp(),
  });
};

export const createImageMessage = async ({
  chatId,
  creator,
  text,
  url,
}: CreateImageMessageParams) => {
  await addDoc(collection(db, `chats/${chatId}/messages`), {
    type: "image",
    chatId,
    creator,
    text,
    url,
    createdAt: serverTimestamp(),
  });
};

export const deleteTextMessage = async ({
  chatId,
  messageId,
}: DeleteTextMessageParams) => {
  await deleteDoc(doc(db, `chats/${chatId}/messages`, messageId));
};
