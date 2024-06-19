import { ImageMessage, TextMessage } from "../../../types/messages";
import { deleteImage, deleteTextMessage } from "../../../api/messages-api";
import { showDateAndTime } from "../../../utils/functions";
import { ref } from "firebase/storage";
import { storage } from "../../../firebase";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import ChatTextMessage from "./ChatTextMessage";
import ChatImageMessage from "./ChatImageMessage";

interface Props {
  message: Message;
  chatId: string;
}

export default function ChatMessage({ message, chatId }: Props) {
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
    <div className="flex items-center bg-gray-100 rounded-lg p-4 relative group">
      <div className="mr-3">
        <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
      </div>
      <div>
        <p className="text-gray-600">
          {message.creator === currentUser?.uid
            ? currentUser.displayName
            : "Other Users"}
        </p>
        <div className="text-sm text-gray-400">
          {showDateAndTime(message.createdAt)}
        </div>
        {switchMessage()}
      </div>
      {message.creator === currentUser?.uid && (
        <div className="absolute top-[-6px] right-0 mt-2 mr-2">
          <div
            onClick={() => onClickDeleteMessage}
            className="hidden group-hover:block bg-gray-100  border-2 border-blue-300 shadow-lg rounded-lg p-1 cursor-pointer"
          >
            <img src="/close-icon.svg" alt="Close"></img>
          </div>
        </div>
      )}
    </div>
  );
}
