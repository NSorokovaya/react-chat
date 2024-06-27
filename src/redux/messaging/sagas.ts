import { all, call, put, select, take, takeEvery } from "redux-saga/effects";
import {
  loadMoreMessages,
  sendImageMessage,
  sendTextMessage,
  setChatId,
  setMessagesList,
  setMoreMessages,
  subscribeToMessagesList,
} from "./actions";
import { eventChannel } from "redux-saga";
import {
  CreateImageMessageDto,
  CreateTextMessageDto,
  ImageMessage,
  Message,
  TextMessage,
} from "../../types/messages";
import {
  DocumentData,
  QuerySnapshot,
  Timestamp,
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";

import { db, storage } from "../../firebase";
import { createImageMessage, createTextMessage } from "../../api/messages-api";
import {
  UploadResult,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { selectMessagesList } from "./selectors";
function subscription(chatId: string) {
  return eventChannel((emit) => {
    const q = query(
      collection(db, `chats/${chatId}/messages`),
      orderBy("createdAt", "desc"),
      limit(10)
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

function* handleSetChatId(action: { payload: { chatId: string } }) {
  yield call(console.log, action, "Hello from saga");
}

function* handleSubscribeToMessagesList(action: {
  payload: { chatId: string };
}) {
  const { chatId } = action.payload;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const channel = yield call(subscription, chatId);

  while (true) {
    const messagesData: Message[] = yield take(channel);
    yield put(setMessagesList({ messagesList: messagesData }));
  }
}

function* handleLoadMoreMessages(action: { payload: { chatId: string } }) {
  const { chatId } = action.payload;

  const messagesList: Message[] = yield select(selectMessagesList);
  const lastMessage = messagesList[0];
  if (!lastMessage) {
    return;
  }

  const lastMessageCreatedAt = new Timestamp(
    lastMessage.createdAt.seconds,
    lastMessage.createdAt.nanoseconds
  );

  const q = query(
    collection(db, `chats/${chatId}/messages`),
    orderBy("createdAt", "desc"),
    startAfter(lastMessageCreatedAt),
    limit(10)
  );

  const queryResult: QuerySnapshot<DocumentData> = yield call(getDocs, q);
  const messagesData = queryResult.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      creator: data.creator,
      createdAt: data.createdAt,
      type: data.type,
      chatId: data.chatId,
      ...(data.type === "image" ? { url: data.url } : { text: data.text }),
    };
  });
  yield put(setMoreMessages({ messagesList: messagesData }));
}

function* handleSendTextMessage(action: {
  payload: { message: CreateTextMessageDto };
}) {
  const { message } = action.payload;
  yield call(createTextMessage, message);
}
function* handleSendImageMessage(action: {
  payload: { message: CreateImageMessageDto };
}) {
  const { message } = action.payload;
  console.log(message);
  if (message) {
    const validImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/svg+xml",
    ];

    if (!validImageTypes.includes(message.file.type)) {
      console.error("Invalid file type. Please select an image.");
      return;
    }

    // TODO: add file size check

    const uniqueImageName = `${Date.now()}-${message.file.name}`;

    const chatImagesRef = ref(
      storage,
      `chats/${message.chatId}/${uniqueImageName}`
    );

    const result: UploadResult = yield call(
      uploadBytes,
      chatImagesRef,
      message.file
    );

    const url: string = yield call(getDownloadURL, result.ref);
    yield call(createImageMessage, {
      chatId: message.chatId,
      creator: message.creator,
      url,
    });
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(setChatId, handleSetChatId),
    takeEvery(subscribeToMessagesList, handleSubscribeToMessagesList),
    takeEvery(sendTextMessage, handleSendTextMessage),
    takeEvery(sendImageMessage, handleSendImageMessage),
    takeEvery(loadMoreMessages, handleLoadMoreMessages),
  ]);
}
