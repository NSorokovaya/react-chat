import { useParams } from "react-router-dom";

import Header from "../../Header";
import ChatWindow from "./ChatWindow";

export const ChatPage = () => {
  const { chatId } = useParams();

  return (
    <div className="h-screen flex flex-col">
      <Header />

      <div className="flex-grow flex justify-center items-center">
        {chatId ? <ChatWindow chatId={chatId} /> : null}
      </div>
    </div>
  );
};
