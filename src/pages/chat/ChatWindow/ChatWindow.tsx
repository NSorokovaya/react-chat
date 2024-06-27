import ChatInput from "../ChatInput";

import ChatMessageList from "./ChatMessagesList";

// The main task is to minimize number of rerenders of the ChatMessage

const ChatWindow = () => {
  return (
    <div className="flex flex-col h-[900px] w-[600px] border-2 border-gray-300 rounded-lg shadow-lg  ">
      <ChatMessageList />

      <div className="p-4 border-t-2 border-gray-200 bg-gray-50">
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatWindow;
