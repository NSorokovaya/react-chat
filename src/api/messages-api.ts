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
    chatId,
    text,
    creator,
    createdAt: serverTimestamp(),
  });
};

export const deleteTextMessage = async ({
  chatId,
  messageId,
}: DeleteTextMessageParams) => {
  await deleteDoc(doc(db, `chats/${chatId}/messages`, messageId));
};
