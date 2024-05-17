import { KeyboardEvent, useState } from "react";

import { createTextMessage } from "../../api/messages-api";
import { auth } from "../../firebase";

interface ChatInputProps {
  chatId: string;
}

const ChatInput = ({ chatId }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const onKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (!auth.currentUser) {
      return;
    }

    if (e.key === "Enter") {
      setMessage("");

      await createTextMessage({
        chatId,
        text: message,
        creator: auth.currentUser.uid,
      });
    }
  };

  return (
    <input
      className="w-full p-2 border rounded-full focus:outline-none focus:ring focus:border-blue-300"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={onKeyDown}
    />
  );
};

export default ChatInput;
