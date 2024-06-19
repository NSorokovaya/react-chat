import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";
import { StorageReference, deleteObject } from "firebase/storage";

// TODO: remove duplication with DTOs in the types/messages.ts
interface CreateTextMessageParams {
  chatId: string;
  text: string;
  creator: string;
}
interface CreateImageMessageParams {
  chatId: string;
  url: string;
  creator: string;
}
interface DeleteTextMessageParams {
  chatId: string;
  messageId: string;
}
interface DeleteImageMessageParams extends DeleteTextMessageParams {
  chatImagesRef: StorageReference;
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

  url,
}: CreateImageMessageParams) => {
  await addDoc(collection(db, `chats/${chatId}/messages`), {
    type: "image",
    chatId,
    creator,

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

export const deleteImage = async ({
  chatId,
  messageId,
  chatImagesRef,
}: DeleteImageMessageParams) => {
  await deleteDoc(doc(db, `chats/${chatId}/messages`, messageId));
  await deleteObject(chatImagesRef);
};
