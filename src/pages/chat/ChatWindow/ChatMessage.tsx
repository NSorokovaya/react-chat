import React from "react";

import { deleteImage, deleteTextMessage } from "../../../api/messages-api";
import { showDateAndTime } from "../../../utils/functions";
import { ref } from "firebase/storage";
import { storage } from "../../../firebase";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import ChatTextMessage from "./ChatTextMessage";
import ChatImageMessage from "./ChatImageMessage";
import { Message } from "../../../types/messages";

interface Props {
  message: Message;
  chatId: string;
}

function ChatMessage({ message, chatId }: Props) {
  const switchMessage = () => {
    switch (message.type) {
      case "text":
        return <ChatTextMessage message={message} />;
      case "image":
        return <ChatImageMessage message={message} />;
      default:
        return null;
    }
  };

  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const onClickDeleteMessage = async (message: Message) => {
    const messageId = message.id;
    console.log("Deleting message with ID:", message.id);
    if (message.type === "image") {
      const chatImagesRef = ref(storage, message.url);
      await deleteImage({ chatId, messageId, chatImagesRef });
    } else await deleteTextMessage({ chatId, messageId });
  };

  return (
    <div className="flex items-start  rounded-lg p-4 relative group max-w-[350px]">
      <div className="mr-3 mt-1">
        <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
      </div>
      <div>
        <div className="flex flex-row items-baseline gap-2 mb-3">
          <p className="text-gray-600">
            {message.creator === currentUser?.uid
              ? currentUser.displayName
              : "Other Users"}
          </p>
          <p className="text-sm text-gray-400">
            {showDateAndTime(message.createdAt)}
          </p>
        </div>
        {switchMessage()}
      </div>
      {message.creator === currentUser?.uid && (
        <div className="absolute top-[-6px] right-0 mt-2 mr-2">
          <div
            onClick={() => onClickDeleteMessage(message)}
            className="hidden group-hover:block bg-gray-100  border-2 border-blue-300 shadow-lg rounded-lg p-1 cursor-pointer"
          >
            <img src="/close-icon.svg" alt="Close"></img>
          </div>
        </div>
      )}
    </div>
  );
}

function arePropsEqual(prev: Props, next: Props) {
  if (prev.message.type !== next.message.type) {
    return false;
  }

  let isContentEqual = false;
  if (prev.message.type === "text" && next.message.type === "text") {
    isContentEqual = prev.message.text === next.message.text;
  } else if (prev.message.type === "image" && next.message.type === "image") {
    isContentEqual = prev.message.url === next.message.url;
  }

  return (
    prev.message.id === next.message.id &&
    prev.message.chatId === next.message.chatId &&
    prev.message.creator === next.message.creator &&
    prev.message.createdAt?.nanoseconds ===
      next.message.createdAt?.nanoseconds &&
    isContentEqual &&
    prev.chatId === next.chatId
  );
}

export const MemoizedChatMessage = React.memo(ChatMessage, arePropsEqual);
