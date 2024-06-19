import { useSelector } from "react-redux";
import { createTextMessage } from "../../../api/messages-api";
import { RootState } from "../../../redux/store";
import { ChatWindowProps } from "../../../types/messages";

export default function EmptyStateMessage({ chatId }: ChatWindowProps) {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const sendMessage = async () => {
    if (currentUser) {
      await createTextMessage({
        chatId,
        text: "🦔",
        creator: currentUser.uid,
      });
    }
  };
  return (
    <div className="flex items-center justify-center ">
      <div
        className="flex flex-col items-center top-80 relative p-6 border rounded-lg"
        onClick={() => {
          sendMessage();
        }}
      >
        <p>No messages here yet...</p>
        <p>Send a message or click on the greeting below</p>
        <div className=" text-[100px] cursor-pointer">🦔</div>
      </div>
    </div>
  );
}
