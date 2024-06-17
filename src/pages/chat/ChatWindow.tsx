import { useMessagesList } from "./useMessagesList";
import ChatInput from "./ChatInput";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useRef } from "react";

interface ChatWindowProps {
  chatId: string;
}

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
          {messagesList.map((message) => (
            <li
              ref={messagesScrollRef}
              key={message.id}
              className={`flex relative ${
                message.creator === currentUser?.uid
                  ? "justify-end"
                  : "justify-start "
              }`}
            >
              <div className="flex items-center bg-gray-100 rounded-lg p-4 relative group">
                <div className="mr-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                </div>
                <div>
                  <p className="text-gray-600">
                    {message.creator === currentUser?.uid
                      ? currentUser.displayName
                      : "Other Users"}
                  </p>
                  <div className="text-black flex justify-start">
                    {message.text}
                  </div>
                </div>
                <div className="absolute top-[-20px] right-0 mt-2 mr-2">
                  <div className="hidden group-hover:block bg-white border border-gray-300 shadow-lg rounded-lg p-2">
                    X
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 border-t-2 border-gray-200 bg-gray-50">
        <ChatInput chatId={chatId} />
      </div>
    </div>
  );
};

export default ChatWindow;
