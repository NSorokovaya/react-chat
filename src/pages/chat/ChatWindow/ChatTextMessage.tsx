import { TextMessage } from "../../../types/messages";
import { isSingleEmoji } from "../../../utils/functions";

interface Props {
  message: TextMessage;
}

export default function ChatTextMessage({ message }: Props) {
  return (
    <div
      className={`text-black flex justify-start ${
        isSingleEmoji(message.text) ? "text-7xl" : "text-base"
      }`}
    >
      {message.text}
    </div>
  );
}
