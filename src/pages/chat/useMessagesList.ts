import { useEffect, useState } from "react";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../../firebase";
import { Message } from "../../types/messages";

export const useMessagesList = (chatId: string) => {
  const [messagesList, setMessagesList] = useState<Message[]>([]);

  useEffect(() => {
    if (!chatId) {
      return () => {};
    }

    const q = query(
      collection(db, `chats/${chatId}/messages`),
      orderBy("createdAt", "desc"),
      limit(30)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData: Message[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        text: doc.data().text,
        creator: doc.data().creator,
        createdAt: doc.data().createdAt,
        url: doc.data().url,
        type: doc.data().type,
      }));

      setMessagesList(messagesData.reverse());
    });

    return () => {
      unsubscribe();
    };
  }, [chatId]);

  return { messagesList };
};
