import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import Header from "../../Header";
import ChatWindow from "./ChatWindow/ChatWindow";
import { setChatId } from "../../redux/messaging/actions";

export const ChatPage = () => {
  const dispatch = useDispatch();

  const { chatId } = useParams();

  useEffect(() => {
    dispatch(setChatId({ chatId: chatId || "" }));
  }, [dispatch, chatId]);

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex justify-center items-center bg-gray-100">
        {chatId ? <ChatWindow /> : <div>Select a chat</div>}
      </div>
    </div>
  );
};
