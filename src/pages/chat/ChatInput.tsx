import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { createTextMessage } from "../../api/messages-api";
import { auth } from "../../firebase";

interface ChatInputProps {
  chatId: string;
}

const ChatInput = ({ chatId }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (auth.currentUser && message.trim() !== "") {
      await createTextMessage({
        chatId,
        text: message,
        creator: auth.currentUser.uid,
      });
      setMessage("");
    }
  };

  const onKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      await sendMessage();
    }
  };
  const handleAddFile = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
  };
  return (
    <div className="flex items-center space-x-2">
      <label>
        <span>
          <img src="/clip.svg" alt="Close"></img>
        </span>
        <input
          className="hidden"
          type="file"
          accept="image/jpeg, image/png, image/svg+xml"
          onChange={handleAddFile}
        />
      </label>
      <input
        className="flex-grow p-2 border rounded-full focus:outline-none focus:ring focus:border-blue-300"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <button
        className="p-2 bg-blue-500 text-white rounded-full focus:outline-none hover:bg-blue-600"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
