import { useState } from "react";
import { ImageMessage } from "../../../types/messages";
interface Props {
  message: ImageMessage;
}

export default function ChatImageMessage({ message }: Props) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  return (
    <div
      className="image-container"
      style={{ width: "300px", height: "200px", position: "relative" }}
    >
      <img
        src={message.url}
        alt="Attached Image"
        className="max-w-xs max-h-xs"
        onLoad={handleImageLoad}
        style={{
          display: imageLoaded ? "block" : "none",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
}
