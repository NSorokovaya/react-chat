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
import { subscribeToMessagesList } from "../../../redux/messaging/actions";

const ChatWindow = () => {
  const chatId = useSelector(selectChatId);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const messagesList = useSelector(selectMessagesList);
  useEffect(() => {
    if (chatId) {
      dispatch(subscribeToMessagesList({ chatId }));
    }
  }, [chatId, dispatch]);

  const messagesScrollRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    messagesScrollRef.current?.lastElementChild?.scrollIntoView();
  }, [messagesList]);

  return (
    <div className="flex flex-col h-[900px] w-[600px] border-2 border-gray-300 rounded-lg shadow-lg">
      <div className="flex-grow overflow-y-auto p-4 bg-white">
        <div className="space-y-2">
          {messagesList.length ? (
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
