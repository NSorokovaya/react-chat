import { useEffect, useState } from "react";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../../firebase";
import { ImageMessage, TextMessage } from "../../types/messages";

export const useMessagesList = (chatId: string) => {
  const [messagesList, setMessagesList] = useState<
    (TextMessage | ImageMessage)[]
  >([]);

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
      const messagesData: (TextMessage | ImageMessage)[] =
        querySnapshot.docs.map((doc) => {
          const data = doc.data();
          if (data.type === "image") {
            return {
              id: doc.id,
              creator: data.creator,
              createdAt: data.createdAt,
              type: data.type,
              url: data.url,
            } as ImageMessage;
          } else {
            return {
              id: doc.id,
              creator: data.creator,
              createdAt: data.createdAt,
              type: data.type,
              text: data.text,
            } as TextMessage;
          }
        });

      setMessagesList(messagesData.reverse());
    });

    return () => {
      unsubscribe();
    };
  }, [chatId]);

  return { messagesList };
};
