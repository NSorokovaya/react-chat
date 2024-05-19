import { useMessagesList } from "./useMessagesList";
import ChatInput from "./ChatInput";

interface ChatWindowProps {
  chatId: string;
}

const ChatWindow = ({ chatId }: ChatWindowProps) => {
  const { messagesList } = useMessagesList(chatId);

  return (
    <div className="flex flex-col h-full border-2 border-gray-300 rounded-lg shadow-lg">
      <div className="flex-grow overflow-y-auto p-4 bg-white">
        <ul className="space-y-2">
          {messagesList.map((message) => (
            <li
              key={message.id}
              className="flex items-start p-2 rounded-lg bg-gray-100"
            >
              <div className="flex-shrink-0 mr-3">
                {/* Кружочек вместо аватара */}
                <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
              </div>
              <div>
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
