import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { db } from "../firebase";

interface CreateTextMessageParams {
  chatId: string;
  text: string;
  creator: string;
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
