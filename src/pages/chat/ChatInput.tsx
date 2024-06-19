import { ChangeEvent, KeyboardEvent, useState } from "react";
import { createImageMessage } from "../../api/messages-api";
import { auth, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, sendTextMessage } from "../../redux/messaging/actions";
import { selectChatId } from "../../redux/messaging/selectors";
import { RootState } from "../../redux/store";
import { selectCurrentUser } from "../../redux/auth/selectors";

const ChatInput = () => {
  const dispatch = useDispatch();

  const chatId = useSelector(selectChatId);
  const currentUser = useSelector(selectCurrentUser);

  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (currentUser?.uid) {
      dispatch(
        sendTextMessage({
          message: {
            chatId: chatId,
            text: message,
            creator: currentUser.uid,
          },
        })
      );

      setMessage("");
    }
  };

  const onKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      await sendMessage();
    }
  };
  const handleAddFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const [firstImg] = e.target.files || [];
    // TODO: make sure that file is valid

    if (firstImg) {
      const validImageTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/svg+xml",
      ];

      if (!validImageTypes.includes(firstImg.type)) {
        console.error("Invalid file type. Please select an image.");
        return;
      }

      // TODO: make sure that file name is unique
      const uniqueImageName = `${Date.now()}-${firstImg.name}`;

      const chatImagesRef = ref(storage, `chats/${chatId}/${uniqueImageName}`);

      const result = await uploadBytes(chatImagesRef, firstImg);
      const url = await getDownloadURL(result.ref);
      console.log(url, result.metadata.fullPath);
      if (auth.currentUser) {
        await createImageMessage({
          chatId,
          text: "There is some image",
          url: url,
          creator: auth.currentUser.uid,
        });
      }
    }
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
