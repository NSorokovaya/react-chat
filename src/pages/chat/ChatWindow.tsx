import { useMessagesList } from "./useMessagesList";
import ChatInput from "./ChatInput";

interface ChatWindowProps {
  chatId: string;
}

const ChatWindow = ({ chatId }: ChatWindowProps) => {
  const { messagesList } = useMessagesList(chatId);

  return (
    <div className="p-5 border-2 border-black rounded-2xl">
      <ul>
        {messagesList.map((message) => (
          <li key={message.id}>{message.text}</li>
        ))}
      </ul>

      <ChatInput chatId={chatId} />
    </div>
  );
};

export default ChatWindow;
