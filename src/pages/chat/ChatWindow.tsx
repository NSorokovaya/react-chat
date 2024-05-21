import { useMessagesList } from "./useMessagesList";
import ChatInput from "./ChatInput";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface ChatWindowProps {
  chatId: string;
}

const ChatWindow = ({ chatId }: ChatWindowProps) => {
  const { messagesList } = useMessagesList(chatId);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  return (
    <div className="flex flex-col h-[900px] w-[600px] border-2 border-gray-300 rounded-lg shadow-lg">
      <div className="flex-grow overflow-y-auto p-4 bg-white">
        <ul className="space-y-2">
          {messagesList.map((message) => (
            <li
              key={message.id}
              className={`flex  ${
                message.creator === currentUser?.uid
                  ? "justify-end"
                  : "justify-start "
              }`}
            >
              <div className="flex items-center bg-gray-100 rounded-lg p-4">
                <div className=" mr-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                </div>
                <div>
                  <p>
                    {message.creator === currentUser?.uid
                      ? currentUser.displayName
                      : "Other Users"}
                  </p>
                  <div className="text-gray-900">{message.text}</div>
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
