import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/auth/selectors";
import {
  selectChatId,
  selectMessagesList,
} from "../../../redux/messaging/selectors";
import { useEffect, useRef } from "react";
import {
  loadMoreMessages,
  subscribeToMessagesList,
} from "../../../redux/messaging/actions";
import { MemoizedChatMessage } from "./ChatMessage";
import EmptyStateMessage from "./EmptyStateMessage";

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
          messagesList.map((message) => {
            return (
              <li
                ref={messagesScrollRef}
                key={message.id}
                className={`flex relative ${
                  message.creator === currentUser?.uid
                    ? "justify-end"
                    : "justify-start "
                }`}
              >
                <MemoizedChatMessage message={message} chatId={chatId} />
              </li>
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
