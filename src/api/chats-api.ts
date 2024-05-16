import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { db } from "../firebase";

export const createChat = async (creator: string) => {
  const newChat = await addDoc(collection(db, "chats"), {
    creator,
    createdAt: serverTimestamp(),
  });

  return newChat.id;
};
