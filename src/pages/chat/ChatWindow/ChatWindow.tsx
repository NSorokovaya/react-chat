import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import ChatInput from "../ChatInput";
import EmptyStateMessage from "./EmptyStateMessage";
import ChatMessage from "./ChatMessage";
import {
  selectChatId,
  selectMessagesList,
} from "../../../redux/messaging/selectors";
import { selectCurrentUser } from "../../../redux/auth/selectors";
import {
  loadMoreMessages,
  subscribeToMessagesList,
} from "../../../redux/messaging/actions";
import { RootState } from "../../../redux/store";

const ChatWindow = () => {
  const chatId = useSelector(selectChatId);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const messagesList = useSelector(selectMessagesList);
  const lastDoc = useSelector((state: RootState) => state.messaging.lastDoc);

  useEffect(() => {
    if (chatId) {
      dispatch(subscribeToMessagesList({ chatId }));
    }
  }, [chatId, dispatch]);

  const handleLoadMore = () => {
    if (lastDoc && messagesList.length > 0) {
      const lastDoc = messagesList[messagesList.length - 1];
      dispatch(loadMoreMessages({ chatId, lastDoc }));
    }
  };

  const messagesScrollRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    messagesScrollRef.current?.lastElementChild?.scrollIntoView();
  }, [messagesList]);

  return (
    <div className="flex flex-col h-[900px] w-[600px] border-2 border-gray-300 rounded-lg shadow-lg">
      <div className="flex-grow overflow-y-auto p-4 bg-white">
        <button onClick={handleLoadMore}>Load More</button>
        <div className="space-y-2">
          {messagesList ? (
            messagesList.map((message) => (
              <li
                ref={messagesScrollRef}
                key={message.id}
                className={`flex relative ${
                  message.creator === currentUser?.uid
                    ? "justify-end"
                    : "justify-start "
                }`}
              >
                <ChatMessage message={message} chatId={chatId} />
              </li>
            ))
          ) : (
            <EmptyStateMessage chatId={chatId} />
          )}
        </div>
      </div>
      <div className="p-4 border-t-2 border-gray-200 bg-gray-50">
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatWindow;
