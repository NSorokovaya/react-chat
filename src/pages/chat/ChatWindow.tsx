import { useMessagesList } from "./useMessagesList";
import ChatInput from "./ChatInput";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";

interface ChatWindowProps {
  chatId: string;
}

const ChatWindow = ({ chatId }: ChatWindowProps) => {
  const { messagesList } = useMessagesList(chatId);
  console.log(messagesList);
  const currentUser = useSelector((state: RootStat) => state.auth.currentUser);

  return (
    <div className="flex flex-col h-[900px] w-[600px] border-2 border-gray-300 rounded-lg shadow-lg">
      <div className="flex-grow overflow-y-auto p-4 bg-white">
        <ul className="space-y-2">
          {messagesList.map((message) => (
            <li
              key={message.id}
              className="flex items-start p-2 rounded-lg bg-gray-100"
            >
              <div className="flex-shrink-0 mr-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
              </div>
              <div>
                <p>
                  {message.creator === currentUser.uid
                    ? "Me"
                    : currentUser.displayName}
                </p>
                <div className="text-gray-900">{message.text}</div>
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
