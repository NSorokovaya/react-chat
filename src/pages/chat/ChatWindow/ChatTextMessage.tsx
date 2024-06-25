import { TextMessage } from "../../../types/messages";
import { convertTextToLinks, isSingleEmoji } from "../../../utils/functions";

interface Props {
  message: TextMessage;
}

export default function ChatTextMessage({ message }: Props) {
  return (
    <div
      className={`text-black flex flex-wrap justify-start  ${
        isSingleEmoji(message.text) ? "text-7xl" : "text-base"
      } `}
    >
      {convertTextToLinks(message.text)}
    </div>
  );
}
