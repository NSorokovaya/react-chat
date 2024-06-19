import { all, call, put, take, takeEvery } from "redux-saga/effects";
import {
  addMessage,
  sendTextMessage,
  setChatId,
  setMessagesList,
  subscribeToMessagesList,
} from "./actions";
import { eventChannel } from "redux-saga";
import { ImageMessage, Message, TextMessage } from "../../types/messages";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../../firebase";
import { createTextMessage } from "../../api/messages-api";
function subscription(chatId: string) {
  return eventChannel((emit) => {
    const q = query(
      collection(db, `chats/${chatId}/messages`),
      orderBy("createdAt", "desc"),
      limit(30)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData: Message[] = querySnapshot.docs.map((doc) => {
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
      emit(messagesData.reverse());
    });

    return () => unsubscribe();
  });
}

function* handleSetChatId(action: any) {
  yield call(console.log, action, "Hello from saga");
}

function* handleSubscribeToMessagesList(action: any) {
  const { chatId } = action.payload;

  const channel = yield call(subscription, chatId);

  while (true) {
    const messagesData: Message[] = yield take(channel);
    yield put(setMessagesList({ messagesList: messagesData }));
  }
}
function* handleSendTextMessage(action: any) {
  const { message } = action.payload;
  yield call(createTextMessage, message);
}

export default function* rootSaga() {
  yield all([
    takeEvery(setChatId, handleSetChatId),
    takeEvery(subscribeToMessagesList, handleSubscribeToMessagesList),
    takeEvery(sendTextMessage, handleSendTextMessage),
  ]);
}
