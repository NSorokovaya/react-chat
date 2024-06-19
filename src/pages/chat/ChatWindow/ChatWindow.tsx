import { useMessagesList } from "../useMessagesList";
import ChatInput from "../ChatInput";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useRef } from "react";

import EmptyStateMessage from "./EmptyStateMessage";
import ChatMessage from "./ChatMessage";

interface ChatWindowProps {
  chatId: string;
}

// 1. Scroll into the last message on new message
// 2. Orchestrating message deletion
// 3. Sending a message
// 4. Renders (defines UI for):
// 4.1. Chat Window
// 4.2. TextMessage
// 4.3. ImageMessage

const ChatWindow = ({ chatId }: ChatWindowProps) => {
  const { messagesList } = useMessagesList(chatId);
  const messagesScrollRef = useRef<HTMLLIElement | null>(null);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  useEffect(() => {
    messagesScrollRef.current?.lastElementChild?.scrollIntoView();
  }, [messagesList]);

  return (
    <div className="flex flex-col h-[900px] w-[600px] border-2 border-gray-300 rounded-lg shadow-lg">
      <div className="flex-grow overflow-y-auto p-4 bg-white">
        <ul className="space-y-2">
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
        </ul>
      </div>
      <div className="p-4 border-t-2 border-gray-200 bg-gray-50">
        <ChatInput chatId={chatId} />
      </div>
    </div>
  );
};

export default ChatWindow;
