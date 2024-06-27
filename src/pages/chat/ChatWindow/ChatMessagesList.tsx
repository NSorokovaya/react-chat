import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/auth/selectors";
import {
  selectChatId,
  selectMessagesList,
} from "../../../redux/messaging/selectors";
import React, { useEffect, useRef } from "react";
import {
  loadMoreMessages,
  subscribeToMessagesList,
} from "../../../redux/messaging/actions";
import { MemoizedChatMessage } from "./ChatMessage";
import EmptyStateMessage from "./EmptyStateMessage";
import { showDateAndTime } from "../../../utils/functions";
import { Timestamp } from "firebase/firestore";

function isDifferentDay(timestamp1: Timestamp, timestamp2: Timestamp) {
  const date1 = timestamp1.toDate(); // Convert Firestore Timestamp to JavaScript Date
  const date2 = timestamp2.toDate(); // Convert Firestore Timestamp to JavaScript Date

  return (
    date1.getFullYear() !== date2.getFullYear() ||
    date1.getMonth() !== date2.getMonth() ||
    date1.getDate() !== date2.getDate()
  );
}

export default function ChatMessageList() {
  const dispatch = useDispatch();

  const chatId = useSelector(selectChatId);
  const currentUser = useSelector(selectCurrentUser);
  const messagesList = useSelector(selectMessagesList);

  useEffect(() => {
    if (chatId) {
      dispatch(subscribeToMessagesList({ chatId }));
    }
  }, [chatId, dispatch]);

  const containerRef = useRef<HTMLDivElement>(null);
  const messagesScrollRef = useRef<HTMLLIElement | null>(null);

  // TODO: do with a CSS (flex-direction: column-reverse;)
  useEffect(() => {
    messagesScrollRef.current?.lastElementChild?.scrollIntoView();
  }, [messagesList]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      if (container.scrollTop === 0) {
        dispatch(loadMoreMessages({ chatId }));
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex-grow overflow-y-auto p-4 bg-white"
      onScroll={handleScroll}
    >
      <div className="space-y-2">
        {messagesList ? (
          messagesList.map((message, index) => {
            console.log(message.createdAt.nanoseconds);
            const showDate =
              index === 0 ||
              isDifferentDay(
                message.createdAt,
                messagesList[index - 1].createdAt
              );

            return (
              <React.Fragment key={message.id}>
                {showDate && (
                  <div className="date-time">
                    {showDateAndTime(message.createdAt)}
                  </div>
                )}
                <li
                  ref={messagesScrollRef}
                  key={message.id}
                  className={`flex relative ${
                    message.creator === currentUser?.uid
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <MemoizedChatMessage message={message} chatId={chatId} />
                </li>
              </React.Fragment>
            );
          })
        ) : (
          <EmptyStateMessage chatId={chatId} />
        )}
      </div>
    </div>
  );
}

//пустые сообщения исправить
//сделать сепараторы
