import { ImageMessage } from "../../../types/messages";
interface Props {
  message: ImageMessage;
}

export default function ChatImageMessage({ message }: Props) {
  return (
    <img src={message.url} alt="Attached Image" className="max-w-xs max-h-xs" />
  );
}
